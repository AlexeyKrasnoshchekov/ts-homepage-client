import React, { useRef, useState } from "react";
import uniqid from "uniqid";
import { Box, Button, Input } from "@mui/material";

import { addGoal } from "./goalsSlice";

import { useAppDispatch } from "../../hooks/redux";
import styles from "./goals.module.scss";

export function GoalInput() {
  const dispatch = useAppDispatch();
  const [goal, setGoal] = useState<string>("");
  const [error, setError] = useState<string>("");
  const textValue = useRef<HTMLInputElement>(null);

  const handleSubmitGoal = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let obj = {
      id: uniqid(),
      name: goal,
      isDone: false,
    };

    if (error === '') {
      dispatch(addGoal(obj));
    } else {
      return;
    }

    setGoal("");
    
  };
  const handleSetGoal = () => {
    console.log("eee", textValue.current?.value);
    if (textValue.current) {
      if (textValue.current.value.length <= 11) {
        setGoal(textValue.current.value);
        setError("");
      } else {
        setError('Слишком длинная цель...');
      }
    }
  };
  return (
    <Box className={styles.goalsInputContainer}>
      <form
        onSubmit={(e) => {
          handleSubmitGoal(e);
        }}
        style={{display: 'flex'}}
      >
        <Input
          fullWidth
          placeholder="Какая у вас цель?"
          value={goal}
          inputRef={textValue}
          onChange={handleSetGoal}
        />
        
        <Button type="submit" variant="contained">Добавить</Button>
      </form>
      {error && goal.length >= 11 && <div className={styles.error}>{error}</div>}
    </Box>
  );
}
