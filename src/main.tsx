import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Newsfeed from "./pages/feed/Newsfeed";
import Moviesfeed from "./pages/feed/Moviesfeed";
import Socialfeed from "./pages/feed/Socialfeed";
import Newstrend from "./pages/trend/Newstrend";
import Moviestrend from "./pages/trend/Moviestrend";
import Socialtrend from "./pages/trend/Socialtrend";
import Feed from "./layouts/Feed";
import Trend from "./layouts/Trend";
import Fav from "./layouts/Fav";
import Newsfav from "./pages/fav/Newsfav";
import Socialfav from "./pages/fav/Socialfav";
import Moviesfav from "./pages/fav/Moviesfav";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Feed />,
            },
            {
                path: "feed",
                element: <Feed />,
                children: [
                    {
                        path: "news",
                        element: <Newsfeed />,
                    },
                    {
                        path: "movies",
                        element: <Moviesfeed />,
                    },
                    {
                        path: "social",
                        element: <Socialfeed />,
                    },
                ],
            },
            {
                path: "trending",
                element: <Trend />,
                children: [
                    {
                        path: "news",
                        element: <Newstrend />,
                    },
                    {
                        path: "movies",
                        element: <Moviestrend />,
                    },
                    {
                        path: "social",
                        element: <Socialtrend />,
                    },
                ],
            },
            {
                path: "fav",
                element: <Fav />,
                children: [
                    {
                        path: "news",
                        element: <Newsfav />,
                    },
                    {
                        path: "movies",
                        element: <Moviesfav />,
                    },
                    {
                        path: "social",
                        element: <Socialfav />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={appRouter} />
);
