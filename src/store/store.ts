import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import weatherReducer from '../components/weather/weatherSlice';
import quoteReducer from '../components/quote/quoteSlice';
import imageReducer from '../components/image/imageSlice';
import goalsReducer from '../components/goals/goalsSlice';

import { quotesApi } from '../components/quote/quotesRTKquery';

const rootReducer = combineReducers({
  weather: weatherReducer,
  quote: quoteReducer,
  image: imageReducer,
  goals: goalsReducer,
  [quotesApi.reducerPath]: quotesApi.reducer
})

// export const store = () => {
//   return configureStore({
//     reducer: rootReducer
//   });
// }

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(quotesApi.middleware)

});

// export type TStore = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;