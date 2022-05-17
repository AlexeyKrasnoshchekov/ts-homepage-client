import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  loadQuote,
  selectQuote,
} from "./quoteSlice";

import styles from './quote.module.scss'

export const Quote = () => {
  const dispatch = useAppDispatch();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    dispatch(loadQuote());
  }, [dispatch]);

  const quote = useAppSelector(selectQuote);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Цитата дня:</h3>
      <h3 className={styles.title}>{quote}</h3>
    </div>
  );
};
