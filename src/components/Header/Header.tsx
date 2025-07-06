import Searchbar from "./header-comp/Searchbar";
import TopBar from "./header-comp/Topbar";
import SettingsButton from "./header-comp/Settings";
import ThemeToggle from "./header-comp/ToggleTheme";

const Header = () => {
    return (
        <div className="sticky top-0 z-20 bg-white shadow-sm w-full dark:bg-neutral-900">
            {/* Top header with search, theme toggle and settings */}
            <div className="flex items-center justify-between p-4 border-b-1 border-gray-100 dark:border-neutral-600 w-full">
                <div className="flex-grow max-w-2xl">
                    <Searchbar />
                </div>
                <div className="flex items-center space-x-3 ml-4">
                    <ThemeToggle />
                    <SettingsButton />
                </div>
            </div>

            {/* Navigation tabs */}
            <TopBar />
        </div>
    );
};

export default Header;
