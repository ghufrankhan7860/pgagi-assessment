import { Outlet, useLocation } from "react-router-dom";
import Newsfeed from "../pages/feed/Newsfeed";

const Feed = () => {
    const currPath = useLocation().pathname;
    return (
        <>
            {currPath === "/feed" ? (
                
                    <Newsfeed />
               
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default Feed;
