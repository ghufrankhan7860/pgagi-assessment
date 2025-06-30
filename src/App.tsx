import { Provider } from "react-redux";
import Dashboard from "./layouts/Dashboard";
import { Outlet } from "react-router-dom";
import { store } from "./store/store";

const App = () => {
    return (
        <Provider store={store}>
            <div className="p-2">
                <Dashboard />
                <Outlet />
            </div>
        </Provider>
    );
};

export default App;
