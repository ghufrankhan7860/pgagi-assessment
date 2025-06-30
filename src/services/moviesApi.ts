import type { Recommendation } from "../types";

const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzA0ZGQ2MWI2YzcxYTQxMDBlZjA0YjIxM2EzNWRmZiIsIm5iZiI6MTc1MTEyMDg1Mi42NTY5OTk4LCJzdWIiOiI2ODVmZmJkNDBjZDc3ODJkMGJkZWJjYmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AihJ75DPMpGdbGf2w71mPiqJL-wi9nvS4so-FqnaYWE",
    },
};

// export const fetchMovies = async (): Promise<Recommendation[]> => {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log("Recommendations data:", data);
//     return data.results.map((movie: any) => ({
//         id: movie.id,
//         title: movie.title,
//         description: movie.overview,
//         imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//         url: `https://www.themoviedb.org/movie/${movie.id}`,
//         type: "movie",
//     }));
// };
export const fetchMovies = async () => {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Recommendations data:", data);
    return data.results.map((movie: any) => ({
        data,
    }));
};
