import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/moviesApi";
import MovieCard from "../../components/FeedCards/MovieCard";
import { useSelector } from "react-redux";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
    popularity: number;
    [key: string]: any;
}

const Moviesfeed = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get selected genres from Redux store
    const selectedGenres = useSelector(
        (store: any) => store.preferences.genres
    );

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                setMovies([]);
                const fetchPromises = selectedGenres.map(
                    async (genre: string) => {
                        const movies = await fetchMovies(genre);

                        return movies || [];
                    }
                );
                const moviesArray = await Promise.all(fetchPromises);

                const allMovies = moviesArray.flat();

                setMovies(allMovies);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError("Failed to load movies. Please try again later.");
                setLoading(false);
            }
        };

        getMovies();
    }, [selectedGenres]); // Re-fetch when selected genres change

    // Rest of your component stays the same
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Error state rendering
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
                {selectedGenres.length > 0
                    ? `Movies by Genre: ${selectedGenres.join(", ")}`
                    : "All Movies"}
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

export default Moviesfeed;
