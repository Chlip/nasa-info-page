import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { apodApi } from './services/apodApi'
import { asteroidsApi } from "./services/asteroidsApi";
import { eonetApi } from "./services/eonetApi";
import { epicApi } from "./services/epicApi";
import { marsRoverPhotoApi } from "./services/marsRoverPhotoApi";
import { marsWeatherApi } from "./services/marsWeatherApi";
import { tleApi } from "./services/tleApi";
const rootReducer = combineReducers({
  [apodApi.reducerPath]: apodApi.reducer,
  [marsWeatherApi.reducerPath]: marsWeatherApi.reducer,
  [marsRoverPhotoApi.reducerPath]: marsRoverPhotoApi.reducer,
  [asteroidsApi.reducerPath]: asteroidsApi.reducer,
  [tleApi.reducerPath]: tleApi.reducer,
  [epicApi.reducerPath]: epicApi.reducer,
  [eonetApi.reducerPath]: eonetApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apodApi.middleware, marsWeatherApi.middleware, marsRoverPhotoApi.middleware, asteroidsApi.middleware, tleApi.middleware, epicApi.middleware, eonetApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
