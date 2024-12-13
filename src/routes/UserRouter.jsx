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
import UpdateReview from "../pages/UpdateReview";

export const router = [
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "",
                element: <Home />,
                loader: () => fetch("https://b10-a10-server-side-nine.vercel.app/banners"),
            },
            {
                path: "all-reviews",
                element: <AllReviews />,
                loader: async ({ request }) => {

                    const url = new URL(request.url)

                    const sort = url.searchParams.get('sort') || "title";
                    const order = url.searchParams.get('order') || "asc";
                    const genre = url.searchParams.get('genre') || "";
                    const limit = url.searchParams.get('limit') || 10;
                    const page = url.searchParams.get('page') || 1;


                    const arr = await Promise.all(
                        [
                            fetch(`https://b10-a10-server-side-nine.vercel.app/reviews?sort=${sort}&order=${order}&genre=${genre}&limit=${limit}&skip=${limit * (page - 1) || 0}`)
                                .then(res => res.json())
                                .catch(() => null),

                            fetch(`https://b10-a10-server-side-nine.vercel.app/reviews-count?sort=${sort}&order=${order}&genre=${genre}&limit=${limit}`)
                                .then(res => res.json())
                                .catch(() => null)
                        ]
                    )

                    return arr;
                }
            },
            {
                path: "/review/:id",
                element: <PrivateRoute> <ReviewDetails /> </PrivateRoute>,
                loader: ({ params }) => fetch(`https://b10-a10-server-side-nine.vercel.app/review/${params.id}`),
            },
            {
                path: "add-review",
                element: <PrivateRoute> <AddReview /> </PrivateRoute>
            },
            {
                path: "my-reviews",
                element: <PrivateRoute> <MyReviews /> </PrivateRoute>,
            },
            {
                path: "update-review/:id",
                element: <PrivateRoute> <UpdateReview /> </PrivateRoute>,
                loader: async ({ params }) => {

                    const arr = await Promise.all([

                        fetch(`https://b10-a10-server-side-nine.vercel.app/update-review/${params.id}`)
                            .then(res => res.json())
                            .catch(() => null),

                        fetch(`https://b10-a10-server-side-nine.vercel.app/genres`)
                            .then(res => res.json())
                            .catch(() => ["fetch failed"]),

                        fetch(`https://b10-a10-server-side-nine.vercel.app/tags`)
                            .then(res => res.json())
                            .catch(() => ["fetch failed"]),

                        fetch(`https://b10-a10-server-side-nine.vercel.app/platforms`)
                            .then(res => res.json())
                            .catch(() => ["fetch failed"])
                    ])

                    return arr
                }
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
                element: <ForgotPassword />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "update-profile",
                element: <PrivateRoute> <UpdateProfile /> </PrivateRoute>
            },
        ]
    },
];
