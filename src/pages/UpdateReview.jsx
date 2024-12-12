import { useContext } from "react"
import { AuthContext } from "../utils/AuthProvider"
import Loader from "../components/Loader"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

const UpdateReview = () => {

  const { loading, useBtnLoader, user } = useContext(AuthContext)
  const { btnLoading, setBtnLoading } = useBtnLoader();
  const [data, genres, tags, platforms] = useLoaderData();


  const handleSubmit = (e) => {

    e.preventDefault();

    function isAtLeastOneChecked(name) {
      let checkboxes = Array.from(document.getElementsByName(name));
      return checkboxes.some(e => e.checked);
    }

    const tags = isAtLeastOneChecked("tags");
    const platforms = isAtLeastOneChecked("platforms");

    if (!tags) {
      toast.warn("No tags selected !", {
        position: "bottom-right"
      })
      return
    }

    if (!platforms) {
      toast.warn("No platforms selected !", {
        position: "bottom-right"
      })
      return
    }

    let formData = new FormData(e.target)

    let object = {};

    formData.forEach(

      (value, key) => {

        if (key === "tags" || key === "platforms") {

          if (Object.hasOwn(object, key)) {
            object[key].push(value)
          } else {
            object[key] = [value]
          }

        }
        else if (key === "rating" || key === "publishing_year") {
          object[key] = parseInt(value)
        }
        else if (key === "is_recommended") {
          object[key] = Boolean(value)
        }
        else {
          object[key] = value
        }
      }
    );

    object.editor_email = user.email;

    let json = JSON.stringify(object);

    setBtnLoading(true);

    fetch(`https://b10-a10-server-side-nine.vercel.app/update-review/${data._id}`, {

      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: json
    })
      .then(res => res.json())
      .then(data => {

        if (data.acknowledged) {

          if (data.modifiedCount === 1) {

            toast.success("Review updated successfully", {
              position: "bottom-right"
            })

          }

        }
        else if (data.error === "this is not your post") {
          toast.error("Failed to update someone else's review \u{1F972}", {
            position: "bottom-right"
          })
        }
      })
      .catch(() => {
        toast.error("Failed 404 not found", {
          position: "bottom-right"
        })
      })
      .finally(() => setBtnLoading(false));

  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - update review</title>
        </Helmet>
      </HelmetProvider>
      {
        loading ? <h3 className="text-5xl relative left-1/2 -translate-x-1/2 font-bold py-48 inline-flex">Loading{<Loader />}</h3> : <>

          <div className="w-[95%] max-w-[1200px] mx-auto my-9 bg-base-300 rounded-lg">

            <p className="text-xl font-bold text-center pt-8">Update Review</p>

            <form className="p-2 md:p-10 space-y-4 " onSubmit={e => handleSubmit(e)}>

              <fieldset className="flex max-sm:flex-col gap-8 mx-auto">

                <div className="flex-1">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">User Name <small>(read only)</small>:</span>
                    </div>
                    <input type="text" placeholder="Your name !" name="user_name"
                      className="input input-bordered w-full placeholder:text-red-500/50 placeholder:text-sm" defaultValue={data?.user_name} readOnly required />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">User Email <small>(read only)</small>:</span>
                    </div>
                    <input type="email" placeholder="Your email !" name="user_email"
                      className="input input-bordered w-full placeholder:text-red-500/50 placeholder:text-sm" defaultValue={data?.user_email} readOnly required />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Game Cover Image URL:</span>
                    </div>
                    <input type="url" placeholder="https://www.example.com/square_img.jpg" name="game_cover"
                      className="input input-bordered w-full" defaultValue={data?.game_cover} required />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Game Name:</span>
                    </div>
                    <input type="text" placeholder="Game title" name="title"
                      className="input input-bordered w-full" defaultValue={data?.title} required />
                  </label>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Game Description:</span>
                    </div>
                    <textarea className="textarea textarea-bordered h-24"
                      placeholder="Review description" name="review_description" defaultValue={data?.review_description} required></textarea>
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Game Released Year:</span>
                    </div>
                    <input type="number" placeholder={new Date().getFullYear()} name="publishing_year"
                      className="input input-bordered w-full" min={1950} max={new Date().getFullYear()} defaultValue={data?.publishing_year} required />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Game Genre: </span>
                    </div>
                    <select className={genres?.[0] === "fetch failed" ? "select select-bordered bg-red-300" : "select select-bordered"} name="genre" required>
                      <option value=""></option>
                      {
                        genres?.[0] === "fetch failed" ? null : genres?.map(
                          (item, index) => <option
                            key={index}
                            value={item}
                            selected={data?.genre === item}
                          >{item}</option>
                        )
                      }
                    </select>
                  </label>


                </div>


                <div className="flex-[1.1_1_0]">

                  <details className="collapse collapse-arrow" open>

                    <summary className="collapse-title label-text inline-block">Tags:</summary>

                    <div className="collapse-content">

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[230px] overflow-y-scroll select-none">
                        {
                          tags?.[0] === "fetch failed" ? <p className="text-center text-red-500">fetch failed</p> : tags?.map(
                            (item, index) => <label className="cursor-pointer inline-flex items-center gap-4" key={index}>
                              <input type="checkbox" className="checkbox checkbox-accent" name="tags" value={item} defaultChecked={
                                data?.tags.find(
                                  str => str === item
                                ) && true
                              } />
                              <span className="label-text">{item}</span>
                            </label>
                          )
                        }
                      </div>
                    </div>
                  </details>

                  <details className="collapse collapse-arrow mt-4" open>

                    <summary className="collapse-title label-text inline-block">Platforms:</summary>

                    <div className="collapse-content">

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:max-h-[132px] overflow-y-scroll select-none">
                        {
                          platforms?.[0] === "fetch failed" ? <p className="text-center text-red-500">fetch failed</p> : platforms?.map(
                            (item, index) => <label className="cursor-pointer inline-flex items-center gap-4" key={index}>
                              <input type="checkbox" className="checkbox checkbox-accent" name="platforms" value={item}
                                defaultChecked={
                                  data?.platforms.find(
                                    str => str === item
                                  ) && true
                                }
                              />
                              <span className="label-text">{item}</span>
                            </label>
                          )
                        }
                      </div>
                    </div>
                  </details>

                  <div className="rating flex items-center mt-4 ml-4">
                    <span className="label-text mr-3">Rating: </span>

                    <div>
                      <input type="radio" name="rating" value={1}
                        className="mask mask-star-2 bg-orange-400 max-sm:w-5"
                        data-tooltip-id="my-tooltip" data-tooltip-content={1}
                        defaultChecked={data?.rating === 1} required />

                      {
                        Array.from({ length: 9 }, (i, idx) => <input type="radio" name="rating" value={idx + 2} key={idx}
                          className="mask mask-star-2 bg-orange-400  max-sm:w-5"
                          data-tooltip-id="my-tooltip" data-tooltip-content={idx + 2} defaultChecked={data?.rating === idx + 2} />)
                      }

                    </div>

                  </div>

                  <div className="inline-flex items-center gap-4 ml-4 mt-10 text-sm">

                    <span>Recommended:</span>
                    <label className="cursor-pointer px-3 rounded-full border border-accent has-[:checked]:bg-accent relative">
                      <input type="radio" name="is_recommended" value={true} className="invisible absolute "
                        defaultChecked={data?.is_recommended}
                      />
                      Yes
                    </label>

                    <label className="cursor-pointer px-3 rounded-full border border-accent has-[:checked]:bg-accent relative">
                      <input type="radio" name="is_recommended" value="" className="invisible absolute" defaultChecked={!data?.is_recommended} />
                      No
                    </label>
                  </div>


                </div>

              </fieldset>


              <button className="card rounded-box grid place-items-center mx-auto !mt-10 max-sm:!mb-8 border border-accent p-3 bg-accent" type="submit">{btnLoading ? <Loader size="loading-xs" margin="my-0" /> : "Update Review"}</button>

            </form>

          </div>

        </>
      }
    </>
  )
}

export default UpdateReview