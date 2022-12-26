import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { apodApi } from './services/apodApi'
import { asteroidsApi } from "./services/asteroidsApi";
import { marsRoverPhotoApi } from "./services/marsRoverPhotoApi";
import { marsWeatherApi } from "./services/marsWeatherApi";
const rootReducer = combineReducers({
  [apodApi.reducerPath]: apodApi.reducer,
  [marsWeatherApi.reducerPath]: marsWeatherApi.reducer,
  [marsRoverPhotoApi.reducerPath]: marsRoverPhotoApi.reducer,
  [asteroidsApi.reducerPath]: asteroidsApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apodApi.middleware, marsWeatherApi.middleware, marsRoverPhotoApi.middleware, asteroidsApi.middleware]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
