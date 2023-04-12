import { configureStore, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import weatherSlice from 'features/weather/weatherSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import coordinateSlice from 'features/weather/coordinateSlice';
import temperatureSlice from 'features/weather/temperatureSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    coordinate : coordinateSlice,
    temperature: temperatureSlice,
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
