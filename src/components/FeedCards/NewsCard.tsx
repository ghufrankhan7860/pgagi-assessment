import React from "react";
import type { NewsArticle } from "../../types/index";

interface NewsCardProps {
    article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    const { title, description, url, category, imageUrl } = article;

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-200">
            {/* Image container with consistent aspect ratio */}
            <div className="relative pt-[56.25%] bg-gray-200 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title || "News article"}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/300x200?text=No+Image+Available";
                        }}
                    />
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">
                            No image available
                        </span>
                    </div>
                )}

                {/* Category badge */}
                {category && (
                    <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
                        {category}
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                {/* Article title with truncation */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600">
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {description || "No description available"}
                </p>

                {/* Read more button, pushed to bottom with flex-grow */}
                <div className="mt-auto">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
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
