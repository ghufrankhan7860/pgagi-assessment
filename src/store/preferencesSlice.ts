import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
    categories: string[];
}

const getSavedCategories = (): string[] => {
    try {
        const savedCategories = localStorage.getItem("categories");
        return savedCategories ? JSON.parse(savedCategories) : [];
    } catch (error) {
        console.error("Error loading categories from localStorage:", error);
        return [];
    }
};

const initialState: PreferencesState = {
    categories: getSavedCategories(),
};

const preferencesSlice = createSlice({
    name: "preferences",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<string[]>) {
            state.categories = action.payload;
            // Save to localStorage whenever categories are updated
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
    },
});

export const { setCategories } = preferencesSlice.actions;
export default preferencesSlice.reducer;
