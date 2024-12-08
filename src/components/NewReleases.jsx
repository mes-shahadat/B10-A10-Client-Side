import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Loader from "./Loader";

const NewReleases = () => {

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/new-release?limit=8")
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(() => setError("fetch failed"))
    }, [])

    return (
        <>
            <h2 className="text-center text-4xl font-bold my-16">NEW RELEASED GAMES</h2>
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
                                    <p>Released Date:
                                        <span className="font-semibold"> {item.publishing_year}</span>
                                    </p>

                                    <div className="inline-flex flex-wrap gap-2 mt-2">
                                        {
                                            item.platforms.map(
                                                (item, index) => <span key={index} className="badge badge-secondary">
                                                    {item}
                                                </span>
                                            )
                                        }
                                    </div>

                                    <div className="card-actions justify-end">
                                        <Link
                                            className="btn btn-primary"
                                            to={`/review/${item._id}`}
                                        >Details</Link>
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

export default NewReleases