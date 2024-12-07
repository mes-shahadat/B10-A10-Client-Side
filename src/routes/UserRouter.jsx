import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AllReviews from "../pages/AllReviews";
import MyReviews from "../pages/MyReviews";
import MyWatchlist from "../pages/MyWatchlist";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddReview from "../pages/AddReview";
import Error from "../components/Error";
import ForgotPassword from "../pages/ForgotPassword";
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <Error/>,
        children: [
            {
                path: "",
                element: <Home />,
                loader: () => fetch("http://localhost:3000/banners"),
            },
            {
                path: "all-reviews",
                element: <AllReviews />
            },
            {
                path: "add-review",
                element: <PrivateRoute> <AddReview /> </PrivateRoute>
            },
            {
                path: "my-reviews",
                element: <PrivateRoute> <MyReviews /> </PrivateRoute>
            },
            {
                path: "my-watchlist",
                element: <PrivateRoute> <MyWatchlist /> </PrivateRoute>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "register",
                element: <Register />
            },
        ]
    },
]);
