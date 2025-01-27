import { useLoaderData } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ReviewDetails = () => {

    const details = useLoaderData();
    const { user, useBtnLoader } = useContext(AuthContext);

    const { btnLoading, setBtnLoading } = useBtnLoader();

    const addToWatchlist = (id) => {

        setBtnLoading(true);
        fetch(`https://b10-a10-server-side-nine.vercel.app/my-watchlist/`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "user_email": user.email,
                    "user_name": user.displayName,
                    "favorites": [
                        {
                            "post_id": id,
                            // "added_date": new Date().toISOString()
                        }
                    ]
                }
            )
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {

                    if (data.insertedId) {

                        toast.success("Saved successfully", {
                            position: "bottom-right"
                        })
                    }
                    else if (data.modifiedCount === 1) {

                        toast.success("Saved successfully", {
                            position: "bottom-right"
                        })
                    }
                    else if (data.modifiedCount === 0) {

                        toast.warn("already exists in database", {
                            position: "bottom-right"
                        })
                    }
                }
            })
            .catch((err) => {
                toast.error(err.message, {
                    position: "bottom-right"
                })
            })
            .finally(() => setBtnLoading(false))

    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Chill Gamer - review details</title>
                </Helmet>
            </HelmetProvider>
            <h2 className="text-center text-4xl font-bold my-16">Review Details</h2>
            <section className="sm:w-11/12 mx-auto mb-16 p-2">
                <div className="card glass max-w-[640px] mx-auto">
                    <figure className="relative">
                        <img
                        className="w-full"
                            src={details.game_cover}
                            alt={details.title + " cover image"} />
                        {
                            details.is_recommended && <p className="absolute bottom-2 left-2 bg-error text-neutral-content px-2 rounded-lg">Recommended</p>
                        }
                    </figure>
                    <div className="card-body p-4 md:p-8">

                        <h2 className="flex gap-2">Titles:
                            <span className="card-title">{details.title}</span>
                        </h2>


                        <p>Genre:
                            <span className="badge badge-neutral border border-base-300 mt-2 ml-2">
                                {details.genre}
                            </span>
                        </p>

                        <div className="inline-flex flex-wrap gap-2 my-2">Tags:
                            {
                                details.tags.map(
                                    (item, index) => <span key={index} className="badge badge-accent mt-1">
                                        {item}
                                    </span>
                                )
                            }
                        </div>


                        <div className="inline-flex flex-wrap gap-2 mt-2">Platforms:
                            {
                                details.platforms.map(
                                    (item, index) => <span key={index} className="badge badge-secondary mt-1">
                                        {item}
                                    </span>
                                )
                            }
                        </div>

                        <p className="mt-2">Released year:
                            <span className="font-semibold"> {details.publishing_year}</span>
                        </p>

                        <div className="flex items-center gap-2">Rating:
                            <ReactStars
                                count={10}
                                value={details.rating}
                                size={24}
                                edit={false}
                                activeColor="oklch(var(--wa))"
                            />
                        </div>

                        <p className="text-xl font-bold mt-4">Info:</p>

                        <p className="mb-2">{details.review_description}</p>

                        <p className="text-sm">Author Name:
                            <span className="font-semibold"> {details.user_name}</span>
                        </p>

                        <div className="flex gap-1 text-sm">
                            <span className="w-max ">Author Email:</span>
                            <span className="font-semibold w-max inline-block"> {details.user_email.split("@")[0]}<wbr />@{details.user_email.split("@")[1]}</span>
                        </div>

                        <div className="card-actions justify-end mt-2">
                            <button className="btn border border-base-300" onClick={
                                () => addToWatchlist(details._id)
                            }>{btnLoading ? <Loader size="loading-sm" /> : "Add to WatchList"}</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReviewDetails