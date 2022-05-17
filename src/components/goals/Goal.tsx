import { FC } from "react";
import { GoalType } from "../../types/types";
import { deleteGoal, setIsDone } from "./goalsSlice";
import { useAppDispatch } from "../../hooks/redux";

import styles from "./goals.module.scss";

export const Goal: FC<GoalType> = (props: GoalType) => {
  const { name } = props;
  const dispatch = useAppDispatch();

  return (
    <div className={styles.goal} onClick={() => dispatch(setIsDone(name))}>
      {name}
      <p onClick={() => dispatch(deleteGoal(name))} className={styles.close}>
        X
      </p>
    </div>
  );
};
