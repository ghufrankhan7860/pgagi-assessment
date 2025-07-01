import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./preferencesSlice";
import fav from "./favSlice";
export const store = configureStore({
    reducer: {
        preferences: preferencesReducer,
        fav: fav,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
