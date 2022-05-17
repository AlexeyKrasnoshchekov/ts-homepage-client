import { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { addGoal, selectGoals } from "./goalsSlice";
import { Goal } from "./Goal";
import { useAppDispatch } from "../../hooks/redux";
import { GoalType } from "../../types/types";

import styles from "./goals.module.scss";

export const GoalsList: FC = () => {
  const goals = useAppSelector(selectGoals);
  const dispatch = useAppDispatch();

  const getLocalGoals = () => {
    let localGoals: GoalType[] = [];
    let value = localStorage.getItem("goals");
    if (typeof value === "string") {
      localGoals = JSON.parse(value) || [];
    }
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
    <div className={styles.outerContainer}>
      <h3 className={styles.header}>Текущие задачи</h3>
      <div className={styles.innerContainer}>
        {goals.map(
          (goal) =>
            !goal.isDone && (
              <Goal
                name={goal.name}
                id={goal.id}
                key={goal.id}
                isDone={goal.isDone}
              />
            )
        )}
      </div>
      <h3 className={styles.header}>Сделано</h3>
      <div className={`${styles.innerContainer} ${styles.done}`}>
        {goals.map(
          (goal) =>
            goal.isDone && (
              <Goal
                name={goal.name}
                id={goal.id}
                key={goal.id}
                isDone={goal.isDone}
              />
            )
        )}
      </div>
    </div>
  );
};
