import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import weatherReducer from '../features/weather/weatherSlice';
// import quoteReducer from '../features/quote/quoteSlice';
import imageReducer from '../components/image/imageSlice';
// import goalsReducer from '../features/goals/goalsSlice';

const rootReducer = combineReducers({
  // weather: weatherReducer,
  // quote: quoteReducer,
  image: imageReducer,
  // goals: goalsReducer
})

// export const store = () => {
//   return configureStore({
//     reducer: rootReducer
//   });
// }

export const store = configureStore({
  reducer: rootReducer
});

// export type TStore = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;