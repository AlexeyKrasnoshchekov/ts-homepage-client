import { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { addGoal, selectGoals } from "./goalsSlice";
import { Goal } from "./Goal";
import { useAppDispatch } from "../../hooks/redux";
import { GoalType } from "../../types/types";

import styles from "./goals.module.scss";

export const GoalsList: FC = () => {
  const goals = useAppSelector(selectGoals);
  console.log("goals77777", goals);
  const dispatch = useAppDispatch();

  console.log("33333goals", goals);

  const getLocalGoals = () => {
    let localGoals: GoalType[] = [];
    let value = localStorage.getItem("goals");

    if (typeof value === "string") {
      localGoals = JSON.parse(value) || [];
    }
    // const localGoals = JSON.parse(localStorage.getItem("goals")) || [];
    localGoals.length !== 0 &&
      localGoals.forEach((goal) => {
        dispatch(addGoal(goal));
      });
  };

  // get from Local
  const saveLocalGoals = () => {
    goals && localStorage.setItem("goals", JSON.stringify(goals || []));
    
  };

  useEffect(() => {
    getLocalGoals();
  }, []);
  useEffect(() => {
    saveLocalGoals(); // сохранение в localStorage
  }, [goals]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.goalsCurrentOuterContainer}> */}
        <h4 className={styles.goalHeader}>Текущие задачи</h4>
        <div className={styles.goalContainer}>
          {goals.map(
            (goal) =>
              !goal.isDone && (
                <Goal name={goal.name} id={goal.id} key={goal.id} isDone={goal.isDone} />
              )
          )}
        {/* </div> */}
      </div>
      <h4 className={styles.goalHeader}>Сделано</h4>
      <div className={`${styles.goalContainer} ${styles.done}`}>
        {goals.map(
          (goal) =>
            goal.isDone && (
              <Goal name={goal.name} id={goal.id} key={goal.id} isDone={goal.isDone} />
            )
        )}
      </div>
    </div>
  );
};
