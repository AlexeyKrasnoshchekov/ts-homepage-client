import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  loadQuote,
  selectQuote,
  // isLoadingWeather,
} from "./quoteSlice";

import styles from './quote.module.scss'

export const Quote = () => {
  const dispatch = useAppDispatch();
  // console.log('weather', weather);
  // const commentsAreLoading = useSelector(isLoadingWeather);

  useEffect(() => {
    // console.log('1111');
    dispatch(loadQuote());
  }, [dispatch]);

  const quote = useAppSelector(selectQuote);
  // console.log('quote', quote);

  return (
    <div className={styles.quoteContainer}>
      <h3 className={styles.quoteHeader}>Цитата дня:</h3>
      <h3 className={styles.quoteTitle}>{quote}</h3>
    </div>
  );
};

//   export default Weather;
