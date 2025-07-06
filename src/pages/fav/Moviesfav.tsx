import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import MovieCard from "../../components/FeedCards/MovieCard";
import type { Movie } from "../../types/index";
import { useContext, useEffect, useState, useCallback } from "react";
import SearchContext from "../../contexts/SearchContext";

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

const Moviesfav = () => {
    const selectedFavMovies = useSelector(
        (store: RootState) => store.fav.favMovies as []
    );
    const [favMovies, setFavMovies] = useState<Movie[]>(selectedFavMovies);
    const { searchQuery } = useContext(SearchContext);

    // Create debounced filter function
    const debouncedFilterMovies = useCallback(
        debounce(
            (
                movies: Movie[],
                setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
                query: string
            ) => {
                filterMovies(movies, setMovies, query);
            },
            300
        ),
        []
    );

    useEffect(() => {
        debouncedFilterMovies(selectedFavMovies, setFavMovies, searchQuery);
    }, [searchQuery, debouncedFilterMovies, selectedFavMovies]);

    return (
        <div className="dark:bg-neutral-900 p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
                Favorite Movies
            </h1>
            {favMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favMovies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="dark:text-gray-300">No favorite movies found.</p>
            )}
        </div>
    );
};

export default Moviesfav;
