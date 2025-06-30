import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useState } from "react";
import { setCategories } from "../../../store/preferencesSlice";
import { availableCategories } from "../../../constants/constants";

const Settings = () => {
    const [currSelected, setCurrSelected] = useState<string>("");
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const dispatch = useDispatch();
    const selectedCategories = useSelector(
        (store: RootState) => store.preferences.categories
    );

    const handleSelectCategory = (category: string) => {
        if (selectedCategories.includes(category) === false) {
            const newCategories = [...selectedCategories, category];
            dispatch(setCategories(newCategories));
        }
        setCurrSelected("");
    };

    const handleRemoveCategory = (category: string) => {
        const newCategories = selectedCategories.filter(
            (cat) => cat !== category
        );
        dispatch(setCategories(newCategories));
    };

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className="relative max-w-4xl mx-auto my-4">
            {/* Toggle button */}
            <button
                onClick={togglePanel}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
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
                    <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                </svg>
                <span>Category Settings</span>
                <span className="ml-1 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {selectedCategories.length}
                </span>
            </button>

            {/* Collapsible panel */}
            <div
                id="settings-panel"
                className={`absolute top-full left-0 right-0 mt-2 transition-all duration-300 origin-top transform bg-white rounded-lg shadow-xl border border-gray-200 z-10 overflow-hidden ${
                    isPanelOpen
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0 pointer-events-none"
                }`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-between">
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
                        <label className="text-sm font-medium text-gray-600 mb-2">
                            Selected Categories
                        </label>

                        {selectedCategories.length ? (
                            <div className="flex flex-wrap border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p className="w-full text-gray-500 text-sm mb-2">
                                    Opted categories:
                                </p>
                                {selectedCategories.map((category) => (
                                    <div
                                        key={category}
                                        className="bg-blue-100 border border-blue-200 text-blue-800 w-fit px-3 py-1 m-1 rounded-full flex items-center shadow-sm transition-all hover:shadow-md"
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
                            <p className="text-gray-500 italic p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                                No categories selected
                            </p>
                        )}
                    </div>

                    {/* Select options element */}
                    <div className="mb-4">
                        <label
                            htmlFor="category-select"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Add Category
                        </label>
                        <select
                            id="category-select"
                            className="w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={currSelected}
                            onChange={(e) => {
                                setCurrSelected(e.target.value);
                                handleSelectCategory(e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {availableCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
