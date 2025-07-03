import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavMovies } from "../../store/favSlice";
import type { RootState } from "../../store/store";
import type { Movie } from "../../types/index";

interface MovieCardProps {
    movie: Movie;
    onFavoriteToggle?: (id: number, isFavorite: boolean) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavoriteToggle }) => {
    const {
        id,
        title,
        overview,
        poster_path,
        vote_average,
        release_date,
        popularity,
    } = movie;

    const [imageError, setImageError] = useState(false);

    const [isFavorite, setIsFavorite] = useState(false);

    const selectedFavMovies = useSelector<RootState, Movie[]>(
        (store: RootState) => store.fav.favMovies as []
    );

    const dispatch = useDispatch();
    useEffect(() => {
        const isAlreadyFavorite = selectedFavMovies.some(
            (favMovie: Movie) => favMovie.id === id
        );
        setIsFavorite(isAlreadyFavorite);
    }, [selectedFavMovies, id]);

    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : null;

    const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    // Handle favorite toggle

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click events
        const newState = !isFavorite;
        setIsFavorite(newState);

        // Update Redux store
        if (newState) {
            // Add to favorites
            const updatedFavorites = [...selectedFavMovies, movie];
            dispatch(setFavMovies(updatedFavorites));
        } else {
            // Remove from favorites
            const updatedFavorites = selectedFavMovies.filter(
                (favMovie) => favMovie.id !== id
            );
            dispatch(setFavMovies(updatedFavorites));
        }

        // Call the callback if provided
        if (onFavoriteToggle) {
            onFavoriteToggle(id, newState);
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-200">
            {/* Image container with consistent aspect ratio */}
            <div className="relative pt-[150%] bg-gray-200 overflow-hidden">
                {imageUrl && !imageError ? (
                    <img
                        src={imageUrl}
                        alt={title || "Movie poster"}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">
                            No image available
                        </span>
                    </div>
                )}

                {/* Heart button for favorites - positioned in top left */}
                <button
                    className="absolute top-2 left-2 p-1.5 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200 shadow-sm z-10"
                    onClick={handleFavoriteToggle}
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    <svg
                        className={`w-5 h-5 ${
                            isFavorite
                                ? "text-red-500 fill-current"
                                : "text-gray-400 hover:text-red-500"
                        }`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={isFavorite ? "0" : "2"}
                        fill={isFavorite ? "currentColor" : "none"}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>

                {/* Rating badge */}
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <svg
                        className="w-3 h-3 mr-1 text-yellow-300 fill-current"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {vote_average !== undefined
                        ? vote_average.toFixed(1)
                        : "N/A"}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                {/* Movie title with truncation */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {title || "Untitled"}
                </h3>

                {/* Release date */}
                <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>

                {/* Description with truncation */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {overview || "No description available"}
                </p>

                {/* Additional metrics */}
                <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                            <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Popularity: {popularity.toFixed(1)}
                        </div>
                        <a
                            href={`https://www.themoviedb.org/movie/${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
                        >
                            Details
                            <svg
                                className="w-3 h-3 ml-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
