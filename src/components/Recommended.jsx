import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Loader from "./Loader";

const Recommended = () => {

    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://b10-a10-server-side-nine.vercel.app/recommended?limit=10")
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(() => setError("fetch failed"))
    }, [])


    return (
        <>
            <h2 className="text-center text-4xl font-bold mt-28 mb-16">TRENDING GAMES</h2>
            {
                post ? <div className="flex-container flex flex-wrap gap-4 items-center justify-center">
                    {
                        post?.map(
                            item => <div key={item._id} className="item card card-compact bg-base-100 w-80 shadow-xl border border-base-content/10">
                                <figure className="max-h-80">
                                    <img
                                        className="w-full h-full"
                                        src={item.game_cover} 
                                        loading="lazy"
                                        />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title.length > 27 ? item.title.slice(0, 24) + "..." : item.title}</h2>

                                    <div className="flex items-center justify-between">
                                        <span className="badge badge-neutral h-[36px]">
                                            {item.genre}
                                        </span>

                                        <Link className="bg-primary p-2  rounded-lg font-semibold 
                                        focus:text-info"  to={`/review/${item._id}`}>
                                            Details
                                        </Link>
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

export default Recommended