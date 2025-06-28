import type { Recommendation } from "../types";

const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
    if (API_KEY === "YOUR_TMDB_API_KEY") {
        console.warn(
            'Please replace "YOUR_TMDB_API_KEY" with your actual TMDB API key in src/services/recommendationsApi.ts'
        );
        return [];
    }
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        type: "movie",
    }));
};
