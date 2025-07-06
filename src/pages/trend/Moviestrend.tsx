import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { fetchMovies } from "../../services/moviesApi";
import MovieCard from "../../components/FeedCards/MovieCard";
import type { Movie } from "../../types/index";

import searchContext from "../../contexts/SearchContext";

// Debounce utility function
const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const filterMovies = (
    allMovies: Movie[],
    setFavMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    searchQuery: string
) => {
    if (searchQuery.trim() === "") {
        setFavMovies(allMovies);
    } else {
        const filteredMovies = allMovies.filter((movie: Movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFavMovies(filteredMovies);
    }
};

const Moviestrend = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [displayCount, setDisplayCount] = useState(8);
    const loaderRef = useRef<HTMLDivElement>(null);

    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const { searchQuery } = useContext(searchContext);

    // Create debounced filter function
    const debouncedFilterMovies = useCallback(
        debounce(
            (
                movies: Movie[],
                setFilteredMovies: React.Dispatch<
                    React.SetStateAction<Movie[]>
                >,
                query: string
            ) => {
                filterMovies(movies, setFilteredMovies, query);
            },
            300
        ),
        []
    );

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                const response = await fetchMovies();
                const moviesArr = response;

                setMovies(moviesArr || []);
                setFilteredMovies(moviesArr || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
                setError("Failed to load movies. Please try again later.");
                setLoading(false);
            }
        };

        getMovies();
    }, []);

    // Set up intersection observer for infinite scrolling
    useEffect(() => {
        if (loading || movies.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (
                    entry.isIntersecting &&
                    !loading &&
                    displayCount < movies.length
                ) {
                    setDisplayCount((prevCount) => prevCount + 8);
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [displayCount, loading, movies.length]);

    useEffect(() => {
        debouncedFilterMovies(movies, setFilteredMovies, searchQuery);
    }, [searchQuery, movies, debouncedFilterMovies]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-neutral-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-neutral-900">
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // Get only the movies we want to display currently
    const visibleMovies = filteredMovies.slice(0, displayCount);
    const hasMore = displayCount < movies.length;

    return (
        <div className="container mx-auto px-4 py-8 dark:bg-neutral-900">
            <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
                Trending Movies
            </h1>

            {filterMovies.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center">
                    No movies found.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {visibleMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    {hasMore && (
                        <div
                            ref={loaderRef}
                            className="flex justify-center items-center mt-8 py-4"
                        >
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Moviestrend;
