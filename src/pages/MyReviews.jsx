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

const MyReviews = () => {

  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [noData, setNoData] = useState(false)
  const [error, setError] = useState(null);

  const removeFromWatchlist = (id) => {

    return fetch(`https://b10-a10-server-side-nine.vercel.app/review/${id}/`, {

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

        if (data?.acknowledged) {

          if (data.deletedCount === 1) {

            toast.success("Deleted successfully", {
              position: "bottom-right"
            })
          }
        } else {
          toast.error("Data doesn't exists", {
            position: "bottom-right"
          })
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-right"
        })
      })

  }

  useEffect(() => {

    fetch(`https://b10-a10-server-side-nine.vercel.app/my-reviews/${user.email}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(() => setError("fetch failed"))

  }, [noData])

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - my reviews</title>
        </Helmet>
      </HelmetProvider>

      <h2 className="text-center text-4xl font-bold my-16">My Reviews</h2>
      <section className="sm:w-11/12 mx-auto mb-16 p-2">
        {
          data ? <div className="overflow-x-auto max-w-[1700px] mx-auto">

            {
              data.length === 0 ? <p className="text-center">currently empty</p> : <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th className="max-lg:hidden"></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th className="max-sm:hidden">Tags</th>
                    <th className="max-sm:hidden">Platforms</th>
                    <th className="max-md:hidden">Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    data?.map(
                      (item, idx) => <tr key={item._id}>
                        <th className="max-lg:hidden">{idx + 1}</th>
                        <td>
                          <div className="flex max-lg:flex-col md:items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-14 w-14">
                                <img
                                  src={item.game_cover}
                                  alt="" />
                              </div>
                            </div>
                            <div className="font-bold lg:min-w-[12ch]">
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
                        <td className="max-w-[55ch] lg:min-w-[20ch]">
                          <span>
                            {item.review_description.length > 110 ? item.review_description.slice(0, 110) + "..." : item.review_description}
                          </span>
                        </td>
                        <td className="max-sm:hidden max-w-[55ch]">
                          <div className="lg:hidden xl:block">
                            {
                              item?.tags.length > 6 ? <>
                                {
                                  item.tags.slice(0, 5).map(
                                    (item, index) => <span className="badge badge-accent ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                                <div className="badge badge-accent ml-2 mt-2 h-max py-1 border">
                                  <span className="-translate-y-1">...</span>
                                </div>
                              </> : <>
                                {
                                  item.tags?.map(
                                    (item, index) => <span className="badge badge-accent ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                              </>
                            }
                          </div>

                          <div className="hidden lg:block xl:hidden">
                            {
                              item?.tags.length > 3 ? <>
                                {
                                  item.tags.slice(0, 2).map(
                                    (item, index) => <span className="badge badge-accent ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                                <div className="badge badge-accent ml-2 mt-2 h-max py-1 border">
                                  <span className="-translate-y-1">...</span>
                                </div>
                              </> : <>
                                {
                                  item.tags?.map(
                                    (item, index) => <span className="badge badge-accent ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                              </>
                            }
                          </div>
                        </td>
                        <td className="max-sm:hidden max-w-[55ch]">
                          <div className="lg:hidden xl:block">
                            {
                              item?.platforms.length > 6 ? <>
                                {
                                  item.platforms.slice(0, 5).map(
                                    (item, index) => <span className="badge badge-secondary ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                                <div className="badge badge-secondary ml-2 mt-2 h-max py-1 border">
                                  <span className="-translate-y-1">...</span>
                                </div>
                              </> : <>
                                {
                                  item.platforms?.map(
                                    (item, index) => <span className="badge badge-secondary ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                              </>
                            }
                          </div>

                          <div className="hidden lg:block xl:hidden">
                            {
                              item?.platforms.length > 3 ? <>
                                {
                                  item.platforms.slice(0, 2).map(
                                    (item, index) => <span className="badge badge-secondary ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                                <div className="badge badge-secondary ml-2 mt-2 h-max py-1 border">
                                  <span className="-translate-y-1">...</span>
                                </div>
                              </> : <>
                                {
                                  item.platforms?.map(
                                    (item, index) => <span className="badge badge-secondary ml-2 mt-2 h-max py-1" key={index}>{item}</span>
                                  )
                                }
                              </>
                            }
                          </div>

                        </td>
                        <td className="max-md:hidden">
                          <div className="flex gap-1 items-center">
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
                        <th className="max-sm:text-center">
                          <Link to={`/update-review/${item._id}`} className="btn btn-ghost btn-xs focus:text-info">Edit</Link> <br />
                          <DeleteBtn fn={() => removeFromWatchlist(item._id)} />
                        </th>
                      </tr>
                    )
                  }

                </tbody>

              </table>
            }

          </div> : error ? <p className="text-center text-red-500">{error}</p> : <Loader />
        }

      </section >
    </>
  )
}

export default MyReviews