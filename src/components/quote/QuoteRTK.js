import { useGetQuotesQuery } from './quotesRTKquery';

import styles from './quote.module.scss'

export const QuoteRTK = () => {
  const {data, isLoading} = useGetQuotesQuery();

  return (
    isLoading ? <h2>Quote is Loading...</h2> :
    <div className={styles.container}>
      <h3 className={styles.header}>Цитата дня (RTK):</h3>
      <h3 className={styles.title}>{data.contents.quotes[0].quote}</h3>
    </div>
  );
};
