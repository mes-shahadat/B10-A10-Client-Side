import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { useState } from "react"
import Loader from "../components/Loader";

const AllReviews = () => {

  const [post, setPost] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [genre, setGenre] = useState(null);
  const [paginationNumber, setPaginationNumber] = useState([]);
  const [fetchObj, setFetchObj] = useState({
    sort: "title",
    order: "asc",
    genre: "",
    limit: 10,
    skip: 0
  })
  const [error, setError] = useState(null);


  const handleChange = e => {

    if (e.target.name === "genre") {
      setFetchObj(prev => {
        return { ...prev, genre: e.target.value }
      })
    }
    else if (e.target.name === "sort") {
      setFetchObj(prev => {
        return { ...prev, sort: e.target.value }
      })
    }
    else if (e.target.name === "order") {
      setFetchObj(prev => {
        return { ...prev, order: e.target.value }
      })
    }

  }

  useEffect(() => {
    fetch(`https://b10-a10-server-side-nine.vercel.app/genres`)
      .then(res => res.json())
      .then(data => setGenre(data))
      .catch(() => setGenre(["fetch failed"]))
  }, [])

  useEffect(() => {

    fetch(`https://b10-a10-server-side-nine.vercel.app/reviews?sort=${fetchObj.sort}&order=${fetchObj.order}&genre=${fetchObj.genre}&limit=${fetchObj.limit}&skip=${fetchObj.skip}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(() => setError("fetch failed"))

    fetch(`https://b10-a10-server-side-nine.vercel.app/reviews-count?sort=${fetchObj.sort}&order=${fetchObj.order}&genre=${fetchObj.genre}&limit=${fetchObj.limit}&skip=${fetchObj.skip}`)
      .then(res => res.json())
      .then(data => setPostCount(data))
      .catch(() => setError("fetching pagination failed"))

  }, [fetchObj])

  useEffect(() => {

    let arr = [];

    if (postCount) {
      for (let i = 0; i < Math.ceil(postCount.count / 10); i++) {
        arr.push(i + 1)
      }
    }
    setPaginationNumber(arr)

  }, [postCount])


  return (
    <>
      <div className="my-20">

        <div className="w-11/12 mx-auto my-8 flex max-md:flex-col gap-4 items-center justify-around">
          <h2 className="font-bold text-4xl">ALL REVIEWS</h2>

          <div className="flex max-sm:flex-col items-center gap-4">

            <p className="font-semibold">Filter: </p>

            <div className="inline-flex gap-2">
              <select className="select select-bordered w-full max-w-xs" name="genre" onChange={handleChange}>

                <option value="" disabled selected>Genre</option>
                {
                  genre?.map(
                    (item, index) => <option key={index} value={item}>{item}</option>
                  )
                }

              </select>

              <select className="select select-bordered w-full max-w-xs" name="sort" onChange={handleChange}>
                <option value="" disabled selected>Sort</option>
                <option value="title">title</option>
                <option value="rating">rating</option>
                <option value="year">year</option>
              </select>

              <select className="select select-bordered w-full max-w-xs" name="order" onChange={handleChange}>
                <option value="" disabled selected>Order</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>

          </div>

        </div>

        {
          post ? <>
            <section className="w-11/12 mx-auto flex flex-wrap items-center justify-center gap-4">
              {
                post?.map(
                  item => <div className="card lg:card-side bg-base-100 shadow-xl" key={item._id}>
                    <figure className="max-md:h-64 md:max-w-96 lg:max-w-60">
                      <img
                        className="w-full h-full object-cover"
                        src={item.game_cover}
                        alt="Album" />
                    </figure>
                    <div className="card-body p-4">
                      <h2 className="card-title">{item.title}</h2>
                      <p className="hidden max-md:block">{item.review_description.length > 230 ? item.review_description.slice(0, 230) + "..." : item.review_description}</p>
                      <p className="max-w-[35ch] max-md:hidden">{item.review_description.length > 120 ? item.review_description.slice(0, 120) + "..." : item.review_description}</p>

                      <p className="inline-flex items-center gap-1"> Rating:
                        <span>
                          <ReactStars
                            count={10}
                            value={item.rating}
                            size={24}
                            edit={false}
                            activeColor="oklch(var(--wa))"
                          />
                        </span>
                      </p>

                      <p className="inline-flex items-center gap-1"> Released Year:
                        <span>
                          {item.publishing_year}
                        </span>
                      </p>


                      <p className="inline-flex items-center gap-1 mt-1"> Genre:
                        <span className="badge badge-neutral">
                          {item.genre}
                        </span>
                      </p>

                      <div className="card-actions justify-end">
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
                    (item) => <input
                      key={item}
                      className="join-item btn btn-square"
                      type="radio"
                      name="options"
                      aria-label={item}
                      defaultChecked={
                        fetchObj.skip === 0 && item === 1 ? true :
                          fetchObj.skip / fetchObj.limit === item ? true : false
                      }
                      onClick={
                        () => setFetchObj(prev => {
                          return { ...prev, skip: (item - 1) * prev.limit }
                        })
                      }
                    />
                  )
                }

              </div> : error ? <p className="text-center text-red-500 mt-8">{error}</p> : <Loader />
            }

          </> : error ? <p className="text-center text-red-500">{error}</p> : <Loader />
        }

      </div>
    </>
  )
}
export default AllReviews