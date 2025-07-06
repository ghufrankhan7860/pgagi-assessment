import { Provider } from "react-redux";
import Dashboard from "./layouts/Dashboard";
import { store } from "./store/store";
import SearchProvider from "./contexts/SearchContextProvider";
import { ThemeContextProvider } from "./contexts/ThemeContext";
const App = () => {
    return (
        <ThemeContextProvider>
            <SearchProvider>
                <Provider store={store}>
                    <div
                        className="p-2 "
                        style={{
                            msOverflowStyle: "none", // IE and Edge
                            scrollbarWidth: "none", // Firefox
                            overflow: "auto", // Needed for some browsers
                        }}
                    >
                        <Dashboard />

                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
                        body::-webkit-scrollbar {
                            display: none; /* Chrome, Safari, Opera */
                        }
                    `,
                            }}
                        />
                    </div>
                </Provider>
            </SearchProvider>
        </ThemeContextProvider>
    );
};

export default App;
