import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Loader from "./Loader";

const NewReleases = () => {

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://b10-a10-server-side-nine.vercel.app/new-release?limit=10")
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(() => setError("fetch failed"))
    }, [])

    return (
        <>
            <h2 className="text-center text-4xl font-bold mb-16 mt-28">NEW RELEASED GAMES</h2>
            {
                post ? <div className="flex-container flex flex-wrap gap-4 items-center justify-center ">
                    {
                        post?.map(
                            item => <Link
                                to={`/review/${item._id}`}
                                key={item._id}
                                className="item focus:opacity-70 focus:animate-pulse"
                            >
                                <div className="card bg-base-100 image-full max-w-80 max-h-80 shadow-xl overflow-hidden border border-base-content/10">

                                    <figure>
                                        <img
                                            className="z-20 w-full"
                                            src={item.game_cover}
                                            alt=""
                                            loading="lazy" />
                                    </figure>

                                    <div className="card-body self-end gap-1 p-4 bg-black/30 backdrop-blur-sm">
                                        <h2 className="card-title">{item.title.length > 27 ? item.title.slice(0, 24) + "..." : item.title}</h2>
                                        <span>Released Date:
                                            <span className="font-semibold"> {item.publishing_year}</span>
                                        </span>
                                        <div className="inline-flex flex-wrap gap-2 mt-2">
                                            {
                                                item.platforms.length > 3 ? <>
                                                    {
                                                        item.platforms.slice(0, 2).map(
                                                            (item, index) => <span key={index} className="badge badge-secondary">
                                                                {item}
                                                            </span>
                                                        )
                                                    }
                                                    <div className="badge badge-secondary">
                                                        <span className="-mt-2">...</span>
                                                    </div>
                                                </> : <>
                                                    {
                                                        item.platforms.map(
                                                            (item, index) => <span key={index} className="badge badge-secondary">
                                                                {item}
                                                            </span>
                                                        )
                                                    }
                                                </>
                                            }
                                        </div>

                                    </div>

                                </div>
                            </Link>

                        )
                    }

                </div> : error ? <p className="text-center text-red-500">{error}</p> : <Loader />

            }

        </>
    )
}

export default NewReleases