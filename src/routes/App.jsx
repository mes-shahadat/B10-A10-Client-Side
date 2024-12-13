import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./UserRouter";

const App = () => {

    const allRoutes = createBrowserRouter([...router]);

    return (
        <RouterProvider router={allRoutes} />
    );
};

export default App;
