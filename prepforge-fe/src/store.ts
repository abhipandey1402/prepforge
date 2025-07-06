import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import type { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "../src/features/user/slices/authSlice";
import configReducer from "../src/features/globalFeatures/slices/configSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

const PersistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(PersistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export { store, persistor };