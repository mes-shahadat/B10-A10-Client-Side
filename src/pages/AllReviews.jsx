import ReactStars from "react-rating-stars-component";
import { Link, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom'
import { useEffect } from "react";
import { useState } from "react"
import Loader from "../components/Loader";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AllReviews = () => {

  const [post, postCount] = useLoaderData();
  const [genres, setGenres] = useState(null);
  const [paginationNumber, setPaginationNumber] = useState([]);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation()

  const { sort, order, genre, limit, page } = {
    sort: searchParams.get("sort") || "title",
    order: searchParams.get("order") || "asc",
    genre: searchParams.get("genre") || "",
    limit: parseInt(searchParams.get("limit")) || 10,
    page: parseInt(searchParams.get("page")) || 1
  }

  const handleChange = e => {

    const obj = { sort, order, genre, limit, page: 1, [e.target.name]: e.target.value };
    setSearchParams(obj)

  }


  useEffect(() => {

    fetch(`https://b10-a10-server-side-nine.vercel.app/genres`)
      .then(res => res.json())
      .then(data => setGenres(data))
      .catch(() => setGenres(["fetch failed"]))

  }, [])

  useEffect(() => {

    if (!post) {
      setError("fetch failed")
    }

    if (!postCount) {
      setError("fetching pagination failed")
    }

  }, [post, postCount])

  useEffect(() => {

    setPaginationNumber(Array(Math.ceil(postCount.count / limit)).fill("dummy"))

  }, [postCount])


  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - all reviews: {genre || "All"}</title>
        </Helmet>
      </HelmetProvider>

      <div className="my-20">

        <div className="w-11/12 mx-auto my-8 flex max-md:flex-col gap-4 items-center justify-around">
          <h2 className="font-bold text-4xl">ALL REVIEWS</h2>

          <div className="flex max-sm:flex-col items-center gap-4">

            <p className="font-semibold">Filter: </p>

            <div className="inline-flex gap-2">
              <select className="select select-bordered w-full max-w-xs" name="genre" onChange={handleChange}>

                <option value="" >Genre</option>
                {
                  genres?.map(
                    (item, index) => <option
                      key={index}
                      value={item}
                      selected={item === genre}
                    >{item}</option>
                  )
                }

              </select>

              <select className="select select-bordered w-full max-w-xs" name="sort" onChange={handleChange}>
                <option value="" disabled>Sort</option>
                <option value="title" selected={sort === "title" ? true : false}>title</option>
                <option value="rating" selected={sort === "rating" ? true : false}>rating</option>
                <option value="year" selected={sort === "year" ? true : false}>year</option>
              </select>

              <select className="select select-bordered w-full max-w-xs" name="order" onChange={handleChange}>
                <option value="" disabled>Order</option>
                <option value="asc" selected={order === "asc" ? true : false}>asc</option>
                <option value="desc" selected={order === "desc" ? true : false}>desc</option>
              </select>
            </div>

          </div>

        </div>

        {
          post ? <>
            <section className="w-11/12 mx-auto flex flex-wrap items-center justify-center gap-4">
              {
                navigation.state === "loading" && navigation.location.pathname === "/all-reviews" ? <Loader /> : post?.map(
                  item => <div className="card lg:card-side bg-base-100 shadow-xl border border-base-content/10" key={item._id}>
                    <figure className="max-md:h-64 md:max-w-96 lg:max-w-60">
                      <img
                        className="w-full h-full object-cover"
                        src={item.game_cover}
                        alt={item.title + " cover image"} />
                    </figure>
                    <div className="card-body p-4">
                      <h2 className="card-title">{item.title}</h2>
                      <p className="hidden max-md:block">{item.review_description.length > 230 ? item.review_description.slice(0, 230) + "..." : item.review_description}</p>
                      <p className="max-w-[35ch] max-md:hidden">{item.review_description.length > 120 ? item.review_description.slice(0, 120) + "..." : item.review_description}</p>

                      <div className="inline-flex items-center gap-1"> Rating:
                        <span>
                          <ReactStars
                            count={10}
                            value={item.rating}
                            size={24}
                            edit={false}
                            activeColor="oklch(var(--wa))"
                          />
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1"> Released Year:
                        <span>
                          {item.publishing_year}
                        </span>
                      </span>


                      <span className="inline-flex items-center gap-1 mt-1"> Genre:
                        <span className="badge badge-neutral">
                          {item.genre}
                        </span>
                      </span>

                      <div className="card-actions justify-center lg:justify-end mt-3">
                        <Link className="btn btn-primary" to={`/review/${item._id}`}>Explore Details</Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </section>

            {
              postCount ? <div className="w-11/12 join my-10 relative left-1/2 -translate-x-1/2 flex-wrap justify-center">

                {
                  paginationNumber?.map(
                    (item, idx) => <input
                      key={idx}
                      className="join-item btn btn-square"
                      type="radio"
                      name="options"
                      aria-label={idx + 1}
                      checked={
                        parseInt(page) === idx + 1 ? true : false
                      }
                      onChange={
                        (e) => {
                          setSearchParams({ sort, order, genre, limit, "page": parseInt(e.target.ariaLabel) })
                        }
                      }
                    />
                  )
                }

              </div> : error && !postCount ? <p className="text-center text-red-500 mt-8">fetching pagination failed</p> : <Loader />
            }

          </> : error ? <p className="text-center text-red-500">fetch failed</p> : <Loader />
        }

      </div>
    </>
  )
}
export default AllReviews