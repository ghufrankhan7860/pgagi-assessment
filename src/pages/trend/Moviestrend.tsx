import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/moviesApi";
import MovieCard from "../../components/FeedCards/MovieCard";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
    [key: string]: any;
}

const Moviestrend = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                const response = await fetchMovies();
                const moviesArr = response[0]?.data?.results;
                console.log("Fetched movies:", moviesArr);
                setMovies(moviesArr || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
                setError("Failed to load movies. Please try again later.");
                setLoading(false);
            }
        };

        getMovies();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Trending Movies
            </h1>

            {movies.length === 0 ? (
                <p className="text-gray-600 text-center">No movies found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Moviestrend;
