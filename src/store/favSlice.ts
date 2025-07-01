import { createSlice } from "@reduxjs/toolkit";

interface FavState {
    favNews: string[];
    favMovies: string[];
}

const getFavNews = (): string[] => {
    try {
        const savedFavNews = localStorage.getItem("favNews");
        return savedFavNews ? JSON.parse(savedFavNews) : [];
    } catch (error) {
        console.error("Error loading favNews from localStorage:", error);
        return [];
    }
};

const getFavMovies = (): string[] => {
    try {
        const savedFavMovies = localStorage.getItem("favMovies");
        return savedFavMovies ? JSON.parse(savedFavMovies) : [];
    } catch (error) {
        console.error("Error loading favNews from localStorage:", error);
        return [];
    }
};

const initialState: FavState = {
    favNews: getFavNews(),
    favMovies: getFavMovies(),
};

const favSlice = createSlice({
    name: "fav",
    initialState,
    reducers: {
        setFavNews(state, action) {
            state.favNews = action.payload;
            try {
                localStorage.setItem("favNews", JSON.stringify(state.favNews));
            } catch (error) {
                console.error("Error saving favNews to localStorage:", error);
            }
        },
        setFavMovies(state, action) {
            state.favMovies = action.payload;
            try {
                localStorage.setItem(
                    "favMovies",
                    JSON.stringify(state.favMovies)
                );
            } catch (error) {
                console.error("Error saving favMovies to localStorage:", error);
            }
        },
    },
});

export const { setFavNews, setFavMovies } = favSlice.actions;
export default favSlice.reducer;
