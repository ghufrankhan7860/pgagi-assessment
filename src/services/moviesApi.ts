import { availableMovieGenres } from "../constants/constants";
const getIdFromGenre = (genre: string) => {
    const genreObj = availableMovieGenres.find((g) => g.name === genre);

    return genreObj ? genreObj.id : 0;
};

export const fetchMovies = async (genre?: string) => {
    const url =
        genre === "" || genre === undefined
            ? "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
            : `https://api.themoviedb.org/3/movie/${getIdFromGenre(
                  genre
              )}/similar?language=en-US&page=1`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzA0ZGQ2MWI2YzcxYTQxMDBlZjA0YjIxM2EzNWRmZiIsIm5iZiI6MTc1MTEyMDg1Mi42NTY5OTk4LCJzdWIiOiI2ODVmZmJkNDBjZDc3ODJkMGJkZWJjYmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AihJ75DPMpGdbGf2w71mPiqJL-wi9nvS4so-FqnaYWE",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    return data.results;
};
