import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
    categories: string[];
    queries: string[];
    genres: string[];
    mQueries: string[];
}
// fetch saved categories and queries from localStorage
const getSavedCategories = (): string[] => {
    try {
        const savedCategories = localStorage.getItem("categories");
        return savedCategories ? JSON.parse(savedCategories) : [];
    } catch (error) {
        console.error("Error loading categories from localStorage:", error);
        return [];
    }
};
const getSavedQueries = (): string[] => {
    try {
        const savedQueries = localStorage.getItem("queries");
        return savedQueries ? JSON.parse(savedQueries) : [];
    } catch (error) {
        console.error("Error loading queries from localStorage:", error);
        return [];
    }
};

// fetch saved genres and mQueries from localStorage
const getSavedGenres = (): string[] => {
    try {
        const savedGenres = localStorage.getItem("genres");
        return savedGenres ? JSON.parse(savedGenres) : [];
    } catch (error) {
        console.error("Error loading genres from localStorage:", error);
        return [];
    }
};
const getSavedmQueries = (): string[] => {
    try {
        const savedmQueries = localStorage.getItem("mQueries");
        return savedmQueries ? JSON.parse(savedmQueries) : [];
    } catch (error) {
        console.error("Error loading mQueries from localStorage:", error);
        return [];
    }
};
const initialState: PreferencesState = {
    categories: getSavedCategories(),
    queries: getSavedQueries(),
    genres: getSavedGenres(),
    mQueries: getSavedmQueries(),
};

const preferencesSlice = createSlice({
    name: "preferences",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<string[]>) {
            state.categories = action.payload;

            try {
                localStorage.setItem(
                    "categories",
                    JSON.stringify(action.payload)
                );
            } catch (error) {
                console.error(
                    "Error saving categories to localStorage:",
                    error
                );
            }
        },
        setQueries(state, action: PayloadAction<string[]>) {
            state.queries = action.payload;

            try {
                localStorage.setItem("queries", JSON.stringify(action.payload));
            } catch (error) {
                console.error("Error saving queries to localStorage:", error);
            }
        },
        setGenres(state, action: PayloadAction<string[]>) {
            state.genres = action.payload;

            try {
                localStorage.setItem("genres", JSON.stringify(action.payload));
            } catch (error) {
                console.error("Error saving genres to localStorage:", error);
            }
        },
        setmQueries(state, action: PayloadAction<string[]>) {
            state.mQueries = action.payload;

            try {
                localStorage.setItem(
                    "mQueries",
                    JSON.stringify(action.payload)
                );
            } catch (error) {
                console.error("Error saving mQueries to localStorage:", error);
            }
        },
    },
});

export const { setCategories, setQueries, setGenres, setmQueries } =
    preferencesSlice.actions;
export default preferencesSlice.reducer;
