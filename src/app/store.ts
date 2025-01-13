import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import createFilter from "redux-persist-transform-filter";

// ...

const saveUserOnlyFilter = createFilter("user", ["user"]);

// persist config
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transform: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice,
  chat: chatSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import chatSlice from "../features/chatSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
