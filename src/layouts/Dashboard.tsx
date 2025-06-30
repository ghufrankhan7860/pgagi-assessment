import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleSidebarToggle = (collapsed: boolean) => {
        setIsSidebarCollapsed(collapsed);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - fixed position */}
            <div className="fixed top-0 left-0 h-full z-10">
                <Sidebar onToggleCollapse={handleSidebarToggle} />
            </div>

            <div
                className="fixed flex flex-col flex-grow transition-all duration-300 w-full"
                style={{
                    marginLeft: isSidebarCollapsed ? "5rem" : "16rem",
                    width: `calc(100% - ${
                        isSidebarCollapsed ? "5rem" : "16rem"
                    })`,
                }}
            >
                <Header />
                <main className="flex-grow p-6 bg-gray-50 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
