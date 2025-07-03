import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./preferencesSlice";
import fav from "./favSlice";
import curr from "./currSlice";
export const store = configureStore({
    reducer: {
        preferences: preferencesReducer,
        fav: fav,
        curr: curr,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
