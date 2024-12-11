import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Loader from "./Loader";

const HighestRated = () => {

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://b10-a10-server-side-nine.vercel.app/highest-rated?limit=8")
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(() => setError("fetch failed"))
    }, [])


    return (
        <>
            <h2 className="text-center text-4xl font-bold mt-28 mb-16">HIGHEST RATED GAMES</h2>
            {
                post ? <div className="flex flex-wrap gap-4 items-center justify-center">
                    {
                        post?.map(
                            item => <div key={item._id} className="card card-compact bg-base-100 max-w-80 shadow-xl border border-base-content/10">
                                <figure className="max-h-80">
                                    <img
                                    className="w-full"
                                        src={item.game_cover}
                                        loading="lazy"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{item.title.length > 27 ? item.title.slice(0, 24) + "..." : item.title}</h2>

                                    <div className="inline-flex flex-wrap gap-2 my-2">
                                        {
                                            item.tags.length > 3 ? <>
                                                {
                                                    item.tags.slice(0, 2).map(
                                                        (item, index) => <span key={index} className="badge badge-accent">
                                                            {item}
                                                        </span>
                                                    )
                                                }
                                                <div className="badge badge-accent">
                                                    <span className="-mt-2">...</span>
                                                </div>
                                            </> : <>
                                                {
                                                    item.tags.map(
                                                        (item, index) => <span key={index} className="badge badge-accent">
                                                            {item}
                                                        </span>
                                                    )
                                                }
                                            </>
                                        }
                                    </div>

                                    <ReactStars
                                        count={10}
                                        value={item.rating}
                                        size={24}
                                        edit={false}
                                        activeColor="oklch(var(--wa))"
                                    />

                                    <div className="my-2">
                                        <Link
                                            className="btn btn-primary focus:text-info"
                                            to={`/review/${item._id}`}
                                        >Details</Link>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </div> : error ? <p className="text-center text-red-500">{error}</p> : <Loader />
            }
        </>
    )
}

export default HighestRated