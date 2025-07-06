import React, { useContext, useState } from "react";
import SearchContext from "../../../contexts/SearchContext";

const Searchbar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="w-full max-w-md">
            <div
                className={`flex items-center bg-white dark:bg-neutral-800 border ${
                    isFocused
                        ? "border-blue-400 ring-1 ring-blue-50"
                        : "border-gray-200 dark:border-neutral-600 hover:border-gray-300 dark:hover:border-neutral-900"
                } rounded-xl transition-all duration-200 py-2 px-3`}
            >
                {/* Search Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                        isFocused ? "text-blue-500" : "text-gray-400"
                    } transition-colors duration-200`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-grow outline-none border-none bg-transparent ml-2 text-sm placeholder-gray-500 text-gray-700 dark:text-gray-100"
                />

                {/* Clear Button (only appears when there's text) */}
                {searchQuery && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Searchbar;
