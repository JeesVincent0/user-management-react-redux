import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from './slice/userSlice/userSlice'
import adminReducer from './slice/adminSlice/adminSlice'
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
}

const persistUserReducer = persistReducer(persistConfig, userReducer);
const persistAdminReducer = persistReducer(persistConfig, adminReducer);

export const store = configureStore({
    reducer: { user: persistUserReducer, admin: persistAdminReducer }
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;