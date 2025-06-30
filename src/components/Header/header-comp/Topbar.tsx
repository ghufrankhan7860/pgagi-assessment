import { NavLink, useLocation } from "react-router-dom";

const TopBar = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/")[1] || "feed";

    return (
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
            <NavLink
                to={`/${currentPath}/news`}
                className={({ isActive }) =>
                    `px-4 py-2 mr-2 rounded-lg text-sm font-medium ${
                        isActive
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "text-gray-600 hover:bg-gray-50 border border-transparent"
                    }`
                }
            >
                News
            </NavLink>

            <NavLink
                to={`/${currentPath}/movies`}
                className={({ isActive }) =>
                    `px-4 py-2 mr-2 rounded-lg text-sm font-medium ${
                        isActive
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "text-gray-600 hover:bg-gray-50 border border-transparent"
                    }`
                }
            >
                Movies
            </NavLink>

            <NavLink
                to={`/${currentPath}/social`}
                className={({ isActive }) =>
                    `px-4 py-2 mr-2 rounded-lg text-sm font-medium ${
                        isActive
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "text-gray-600 hover:bg-gray-50 border border-transparent"
                    }`
                }
            >
                Social Media Posts
            </NavLink>
        </div>
    );
};

export default TopBar;
