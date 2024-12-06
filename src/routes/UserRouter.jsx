import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AllReviews from "../pages/AllReviews";
import MyReviews from "../pages/MyReviews";
import MyWatchlist from "../pages/MyWatchlist";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddReview from "../pages/AddReview";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "all-reviews",
                element: <AllReviews/>
            },
            {
                path: "add-review",
                element: <AddReview/>
            },
            {
                path: "my-reviews",
                element: <MyReviews/>
            },
            {
                path: "my-watchlist",
                element: <MyWatchlist/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
        ]
    },
]);