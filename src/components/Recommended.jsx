import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Loader from "./Loader";

const Recommended = () => {

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/recommended?limit=8")
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(() => setError("fetch failed"))
    }, [])


    return (
        <>
            <h2 className="text-center text-4xl font-bold mt-40 mb-16">TRENDING GAMES</h2>
            {
                post ? <div className="flex flex-wrap gap-4 items-center justify-center">
                    {
                        post?.map(
                            item => <div key={item._id} className="card card-compact bg-base-100 w-80 shadow-xl">
                                <figure>
                                    <img
                                        src={item.game_cover} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title.length > 27 ? item.title.slice(0, 24) + "..." : item.title}</h2>

                                    <div className="flex items-center justify-between">
                                        <span className="badge badge-neutral">
                                            {item.genre}
                                        </span>

                                        <Link className="bg-primary px-2  rounded-lg font-semibold" to={`/review/${item._id}`}>
                                            Details
                                        </Link>
                                    </div>


                                </div>
                            </div>
                        )
                    }
                </div> : error ? <p className="text-center text-red-500">fetch failed</p> : <Loader />
            }
        </>
    )
}

export default Recommended