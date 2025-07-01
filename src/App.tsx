import { Provider } from "react-redux";
import Dashboard from "./layouts/Dashboard";
import { store } from "./store/store";

const App = () => {
    // console.log("Current Path:", currPath);
    return (
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
    );
};

export default App;
