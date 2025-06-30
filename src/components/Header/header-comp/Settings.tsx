import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { setCategories, setQueries } from "../../../store/preferencesSlice";
import { availableCategories } from "../../../constants/constants";

const Settings = () => {
    const [currSelected, setCurrSelected] = useState<string>("");
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [currQuery, setCurrQuery] = useState("");
    const dispatch = useDispatch();
    const selectedCategories = useSelector(
        (store: RootState) => store.preferences.categories
    );

    const selectedQueries = useSelector(
        (store: RootState) => store.preferences.queries
    );

    const handleSelectCategory = (category: string) => {
        if (selectedCategories.includes(category) === false) {
            const newCategories = [...selectedCategories, category];
            dispatch(setCategories(newCategories));
        }
        setCurrSelected("");
    };
    const handleSelectQueries = (query: string) => {
        if (selectedQueries.includes(query) === false) {
            const newQueries = [...selectedQueries, query];
            dispatch(setQueries(newQueries));
        }
        setCurrQuery("");
    };

    const handleRemoveCategory = (category: string) => {
        const newCategories = selectedCategories.filter(
            (cat) => cat !== category
        );
        dispatch(setCategories(newCategories));
    };

    const handleRemoveQueries = (query: string) => {
        const newQueries = selectedQueries.filter((que) => que !== query);
        dispatch(setQueries(newQueries));
    };

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className="relative max-w-4xl mx-auto my-4">
            {/* Toggle button */}
            <button
                onClick={togglePanel}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition-colors border border-gray-300"
                aria-expanded={isPanelOpen}
                aria-controls="settings-panel"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="transition-transform duration-300"
                    style={{
                        transform: isPanelOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                    }}
                >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.902 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
                <span className="relative ml-1 bg-gray-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {selectedCategories.length}
                </span>
            </button>

            {/* Collapsible panel */}
            <div
                id="settings-panel"
                className={`absolute top-full right-0 mt-2 w-70 transition-all duration-300 origin-top transform bg-white rounded-lg shadow-xl border border-gray-200 z-10 overflow-hidden ${
                    isPanelOpen
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0 pointer-events-none"
                }`}
            >
                {/* Category Panel */}
                <div className="px-6 pt-6">
                    <h2 className="text-lg font-bold text-gray-600 mb-4 flex items-center justify-between">
                        <span>Category Settings</span>
                        <button
                            onClick={togglePanel}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close panel"
                        >
                            ×
                        </button>
                    </h2>

                    {/* Selected categories list */}
                    <div className="flex flex-col mb-6">
                        {selectedCategories.length ? (
                            <div className="flex flex-wrap border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p className="w-full text-gray-500 text-xs mb-2">
                                    Opted categories:
                                </p>
                                {selectedCategories.map((category) => (
                                    <div
                                        key={category}
                                        className="bg-blue-100 text-xs border border-blue-200 text-blue-800 w-fit px-3 py-1 m-1 rounded-full flex items-center shadow-sm transition-all hover:shadow-md"
                                    >
                                        <span className="mr-2">{category}</span>
                                        <button
                                            className="bg-blue-200 hover:bg-red-400 text-blue-800 hover:text-white rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                                            onClick={() =>
                                                handleRemoveCategory(category)
                                            }
                                            aria-label={`Remove ${category}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm italic p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                                No categories selected
                            </p>
                        )}
                    </div>

                    {/* Select options element */}
                    <div className="mb-4">
                        <label
                            htmlFor="category-select"
                            className="block text-sm font-medium text-gray-600 mb-2 text-xs"
                        >
                            Add Category
                        </label>
                        <select
                            id="category-select"
                            className="w-full text-sm py-2 px-3 border-2 border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            value={currSelected}
                            onChange={(e) => {
                                setCurrSelected(e.target.value);
                                handleSelectCategory(e.target.value);
                            }}
                        >
                            <option
                                className="text-sm text-gray-600"
                                value=""
                                disabled
                            >
                                Select category
                            </option>
                            {availableCategories.map((category) => (
                                <option
                                    className="text-sm text-gray-600"
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Queries section */}
                <div className="px-6 pb-6">
                    <h2 className="text-lg font-bold text-gray-600 mb-4 flex items-center justify-between">
                        <span>Queries</span>
                    </h2>

                    {/* // Selected queries list */}
                    <div className="flex flex-col mb-6">
                        {selectedQueries.length ? (
                            <div className="flex flex-wrap border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p className="w-full text-gray-500 text-xs mb-2">
                                    Queries:
                                </p>
                                {selectedQueries.map((query) => (
                                    <div
                                        key={query}
                                        className="bg-blue-100 text-xs border border-blue-200 text-blue-800 w-fit px-3 py-1 m-1 rounded-full flex items-center shadow-sm transition-all hover:shadow-md"
                                    >
                                        <span className="mr-2">{query}</span>
                                        <button
                                            className="bg-blue-200 hover:bg-red-400 text-blue-800 hover:text-white rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                                            onClick={() =>
                                                handleRemoveQueries(query)
                                            }
                                            aria-label={`Remove ${query}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm italic p-2 border-2 border-dashed border-gray-200 rounded-lg text-center">
                                No Queries selected
                            </p>
                        )}
                    </div>
                    <input
                        type="text"
                        value={currQuery}
                        className="w-full text-sm py-2 px-3 border-2 border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search Query..."
                        onChange={(e) => {
                            setCurrQuery(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && currQuery.trim() !== "") {
                                handleSelectQueries(currQuery.trim());
                                setCurrQuery("");
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
