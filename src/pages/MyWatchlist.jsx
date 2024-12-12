import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { toast } from 'react-toastify';
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import DeleteBtn from "../components/DeleteBtn";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MyWatchlist = () => {

  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [noData, setNoData] = useState(false)
  const [error, setError] = useState(null);

  const removeFromWatchlist = (id, setLoader) => {

    return fetch(`https://b10-a10-server-side-nine.vercel.app/my-watchlist/${id}/`, {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "editor_email": user.email
        }
      )
    })
      .then(res => res.json())
      .then(data => {

        setNoData(!noData)

        if (data.acknowledged) {

          if (data.modifiedCount === 1) {

            toast.success("Deleted successfully", {
              position: "bottom-right"
            })
          }
        }
      })
      .catch((err) => {
        setLoader(false)
        toast.error(err.message, {
          position: "bottom-right"
        })
      })

  }

  useEffect(() => {

    fetch(`https://b10-a10-server-side-nine.vercel.app/my-saved-watchlist/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "user_email": user.email
        }
      )
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(() => setError("fetch failed"))

  }, [noData])

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - my watch list</title>
        </Helmet>
      </HelmetProvider>

      <h2 className="text-center text-4xl font-bold my-16">Game Watchlist</h2>
      <section className="sm:w-11/12 mx-auto mb-16 p-2">
        {
          data ? <div className="overflow-x-auto max-w-[1700px] mx-auto">

            {
              data.length === 0 ? <p className="text-center">watchlist is empty</p> : <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th className="max-sm:hidden"></th>
                    <th>Name</th>
                    <th className="max-sm:hidden">Genre</th>
                    <th>Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    data?.map(
                      (item, idx) => <tr key={item._id}>
                        <th className="max-sm:hidden">{idx + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-14 w-14">
                                <img
                                  src={item.game_cover}
                                  alt="" />
                              </div>
                            </div>
                            <div className="font-bold">
                              <Link to={`/review/${item._id}`}>
                                {item.title}
                              </Link>
                              <br />
                              <span className="badge badge-ghost badge-sm border border-base-content mt-1">
                                {item.publishing_year}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="max-sm:hidden">
                          {item.genre}
                        </td>
                        <td>
                          <div className="hidden md:block">
                            <ReactStars
                              count={10}
                              value={item.rating}
                              size={24}
                              edit={false}
                              activeColor="oklch(var(--wa))"
                            />
                          </div>

                          <div className="hidden max-md:flex gap-1 items-center">
                            {item.rating}
                            <ReactStars
                              count={1}
                              value={item.rating}
                              size={24}
                              edit={false}
                              activeColor="oklch(var(--wa))"
                            />
                          </div>
                        </td>
                        <th>
                          <DeleteBtn fn={(setLoader) => removeFromWatchlist(item._id, setLoader)} />
                        </th>
                      </tr>
                    )
                  }

                </tbody>

              </table>
            }

          </div> : error ? <p className="text-center text-red-500">{error}</p> : <Loader />
        }

      </section>
    </>
  )
}

export default MyWatchlist