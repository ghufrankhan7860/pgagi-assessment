import React, { useState, useEffect } from "react";
import type { NewsArticle } from "../../types/index";
import { useDispatch, useSelector } from "react-redux";
import { setFavNews } from "../../store/favSlice";
import type { RootState } from "../../store/store";

interface NewsCardProps {
    article: NewsArticle;
    onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onFavoriteToggle }) => {
    const { id, title, description, url, category, imageUrl } = article;
    // Add state to track image load failures
    const [imageError, setImageError] = useState(false);
    // Add state to track favorite status
    const [isFavorite, setIsFavorite] = useState(false);

    const selectedFavNews = useSelector<RootState, NewsArticle[]>(
        (store: RootState) => store.fav.favNews as []
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const isAlreadyFavorite = selectedFavNews.some(
            (favArticle) => favArticle.id === id
        );
        setIsFavorite(isAlreadyFavorite);
    }, [selectedFavNews, id]);

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click events
        e.preventDefault(); // Prevent link navigation

        const newState = !isFavorite;
        setIsFavorite(newState);

        // Update Redux store
        if (newState) {
            // Add to favorites
            const updatedFavorites = [...selectedFavNews, article];
            dispatch(setFavNews(updatedFavorites));
        } else {
            // Remove from favorites
            const updatedFavorites = selectedFavNews.filter(
                (favArticle) => favArticle.id !== id
            );
            dispatch(setFavNews(updatedFavorites));
        }

        // Call the callback if provided
        if (onFavoriteToggle) {
            onFavoriteToggle(id, newState);
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700">
            {/* Image container with consistent aspect ratio */}
            <div className="relative pt-[56.25%] bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {imageUrl && !imageError ? (
                    <img
                        src={imageUrl}
                        alt={title || "News article"}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <span className="text-gray-400 dark:text-gray-500">
                            No image available
                        </span>
                    </div>
                )}

                {/* Heart button for favorites - positioned in top left */}
                <button
                    className="absolute top-2 left-2 p-1.5 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-full hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all duration-200 shadow-sm z-10"
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
                                : "text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
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

                {/* Category badge */}
                {category && (
                    <span className="absolute top-2 right-2 bg-blue-600 dark:bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
                        {category}
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                {/* Article title with truncation */}
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {title || "Untitled"}
                    </a>
                </h3>

                {/* Description with truncation */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {description || "No description available"}
                </p>

                {/* Read more button, pushed to bottom with flex-grow */}
                <div className="mt-auto">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                        Read full article
                        <svg
                            className="w-3 h-3 ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
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
    );
};

export default NewsCard;
