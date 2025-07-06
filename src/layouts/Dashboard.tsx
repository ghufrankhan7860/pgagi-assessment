import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    const currPath = useLocation().pathname;

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleSidebarToggle = (collapsed: boolean) => {
        setIsSidebarCollapsed(collapsed);
    };

    return (
        <div className="flex h-screen overflow-hidden dark:bg-neutral-900">
            {/* Sidebar - fixed position */}
            <div className="fixed top-0 left-0 h-full z-10">
                <Sidebar onToggleCollapse={handleSidebarToggle} />
            </div>

            <div
                className=" flex flex-col flex-grow transition-all duration-300 w-full"
                style={{
                    marginLeft: isSidebarCollapsed ? "5rem" : "16rem",
                    width: `calc(100% - ${
                        isSidebarCollapsed ? "5rem" : "16rem"
                    })`,
                }}
            >
                <Header />
                {currPath === "/" ? (
                    <div className="flex flex-col justify-center items-center h-screen overflow-y-auto p-20 bg-gray-50 ">
                        <div className="max-w-2xl w-full mt-20 bg-white rounded-lg shadow-md p-8 text-center">
                            <h1 className="text-3xl font-bold text-blue-600 mb-6">
                                Welcome to Your Personal Dashboard
                            </h1>

                            <div className="space-y-6 text-left">
                                <div className="border-b pb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        Getting Started
                                    </h2>
                                    <p className="text-gray-600">
                                        This dashboard allows you to browse news
                                        articles and movies, and save your
                                        favorites for later viewing.
                                    </p>
                                </div>

                                <div className="border-b pb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                        Feed
                                    </h2>
                                    <p className="text-gray-600">
                                        Click on <strong>Feed</strong> in the
                                        sidebar to browse the latest news
                                        articles and Movies based on the user
                                        preferences &nbsp;
                                        <strong>
                                            set by the setting icon.
                                        </strong>
                                        Use the heart icon to save articles and
                                        movies to your favourites and these you
                                        can view further later by going to the
                                        favourite panel using the sidebar menu.
                                    </p>
                                </div>

                                <div className="border-b pb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                        Trending
                                    </h2>
                                    <p className="text-gray-600">
                                        Browse Trending movies in the{" "}
                                        <strong>Movies</strong> section. Add
                                        movies to your favorites by clicking the
                                        heart icon. Also get trending News by
                                        adding query for which topic you want
                                        trending news and u can set query from
                                        the settings icon in the top right
                                        corner and their use Query settings.
                                    </p>
                                </div>

                                <div className="border-b pb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                        Favorites
                                    </h2>
                                    <p className="text-gray-600">
                                        View all your favorite news articles and
                                        movies in the <strong>Favorites</strong>{" "}
                                        section.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        Personalize Your Feed
                                    </h2>
                                    <p className="text-gray-600">
                                        Click the <strong>settings icon</strong>{" "}
                                        in the top right corner to customize
                                        your news categories and preferences.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <main className="flex-grow p-6 bg-gray-50 overflow-y-auto w-full">
                        <Outlet />
                    </main>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
