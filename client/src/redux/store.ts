import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from './slice/userSlice/userSlice'
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
}

const persistUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: { user: persistUserReducer }
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;