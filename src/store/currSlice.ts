import { createSlice, current } from "@reduxjs/toolkit";
import type { NewsArticle } from "../types/index";
import type { Movie } from "../types/index";

interface CurrState {
    movies: Movie[];
    news: NewsArticle[];
}

const initialState: CurrState = {
    movies: [],
    news: [],
};

const currSlice = createSlice({
    name: "curr",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },

        setNews: (state, action) => {
            state.news = action.payload;
        },
    },
});

export const { setMovies, setNews } = currSlice.actions;
export default currSlice.reducer;
