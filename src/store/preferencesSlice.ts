import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
    categories: string[];
    queries: string[];
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

const initialState: PreferencesState = {
    categories: getSavedCategories(),
    queries: getSavedQueries(),
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
    },
});

export const { setCategories, setQueries } = preferencesSlice.actions;
export default preferencesSlice.reducer;
