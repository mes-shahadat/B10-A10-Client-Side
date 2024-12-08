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
import UpdateProfile from "../pages/UpdateProfile";
import ReviewDetails from "../pages/ReviewDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <Error/>,
        children: [
            {
                path: "",
                element: <Home />,
                loader: () => fetch("https://b10-a10-server-side-nine.vercel.app/banners"),
            },
            {
                path: "all-reviews",
                element: <AllReviews />,
            },
            {
                path: "/review/:id",
                element: <PrivateRoute> <ReviewDetails/> </PrivateRoute>,
                loader: ({params}) => fetch(`https://b10-a10-server-side-nine.vercel.app/review/${params.id}`),
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
            {
                path: "update-profile",
                element: <PrivateRoute> <UpdateProfile/> </PrivateRoute>
            },
        ]
    },
]);
