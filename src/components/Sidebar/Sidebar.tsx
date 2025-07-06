import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
    onToggleCollapse?: (isCollapsed: boolean) => void;
}

const sidebarItems = [
    {
        title: "Feed",
        icon: (
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
            </svg>
        ),
        path: "feed/news",
    },
    {
        title: "Trending",
        icon: (
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
            </svg>
        ),
        path: "trending/news",
    },
    {
        title: "Favourite",
        icon: (
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        ),
        path: "fav/news",
    },
];

const Sidebar = ({ onToggleCollapse }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);

        if (onToggleCollapse) {
            onToggleCollapse(newCollapsedState);
        }
    };
    useEffect(() => {
        if (onToggleCollapse) {
            onToggleCollapse(isCollapsed);
        }
    }, []);
    return (
        <div
            className={`sticky h-screen bg-white transition-all duration-300 border-r border-gray-200 dark:border-neutral-600 ${
                isCollapsed ? "w-20" : "w-64"
            } flex flex-col p-0 m-0 dark:bg-neutral-900 `}
        >
            {/* Header with hamburger button */}
            <div className="border-b border-gray-100 dark:border-neutral-600 p-3 dark:bg-neutral-900">
                <button
                    onClick={toggleSidebar}
                    className={`p-2 rounded-xl border border-gray-200 hover:bg-gray-50 w-full flex justify-center dark:hover:bg-neutral-700 ${
                        isCollapsed ? " text-blue-500" : ""
                    }`}
                    aria-label={
                        isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500 dark:text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Navigation Items */}
            <div className="p-3 space-y-3 flex-grow">
                {sidebarItems.map((item) => (
                    <NavLink
                        to={`/${item.path}`}
                        key={item.path}
                        className={({ isActive }) =>
                            `flex items-center ${
                                isCollapsed ? "justify-center" : "px-4"
                            } py-3 rounded-xl transition-colors ${
                                isActive
                                    ? "bg-blue-50 text-blue-600 dark:bg-neutral-800"
                                    : "text-gray-600 hover:bg-gray-50 dark:hover:bg-neutral-800"
                            } ${
                                isCollapsed
                                    ? ""
                                    : "border border-gray-200 dark:border-neutral-600"
                            }`
                        }
                    >
                        <span className="flex-shrink-0">{item.icon}</span>

                        {!isCollapsed && (
                            <span className="ml-3 font-medium text-sm dark:text-white">
                                {item.title}
                            </span>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Bottom area for future expansion (profile, logout, etc) */}
            {!isCollapsed && (
                <div className="border-t  dark:border-neutral-600 p-3">
                    <div className="flex items-center p-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            U
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">
                                User Name
                            </p>
                            <p className="text-xs text-gray-500">
                                user@example.com
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
