import React, { FC } from "react";
import { GoalType } from "../../types/types";
import { deleteGoal, setIsDone } from "./goalsSlice";
import { useAppDispatch } from "../../hooks/redux";

import styles from "./goals.module.scss";

export const Goal: FC<GoalType> = (props: GoalType) => {
  const { name, id } = props;
  console.log("props", props);
  const dispatch = useAppDispatch();

  // const generateColor = () => {
  //   return Math.floor(Math.random() * 255);
  // };

  return (
    <div
      className={styles.goal}
      onClick={() => dispatch(setIsDone(name))}
    >
      {name}
      <p
        onClick={() => dispatch(deleteGoal(name))}
        className={styles.close}
      >
        X
      </p>
    </div>
  );
};
