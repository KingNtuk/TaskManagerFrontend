import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import taskReducer from "../slices/taskSlice";

const authPersistConfig = { key: "auth", storage };
const taskPersistConfig = { key: "tasks", storage };

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tasks: persistReducer(taskPersistConfig, taskReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

// Persist the store
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;