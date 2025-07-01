import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import MovieCard from "../../components/FeedCards/MovieCard";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    popularity: number;
}

const Moviesfav = () => {
    const selectedFavMovies = useSelector(
        (store: RootState) => store.fav.favMovies as []
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
            {selectedFavMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedFavMovies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p>No favorite movies found.</p>
            )}
        </div>
    );
};

export default Moviesfav;
