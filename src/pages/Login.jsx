import { useContext, useRef, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../utils/AuthProvider";
import Loader from "../components/Loader";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Login = () => {

  const { loginUser, user, loginGoogleUser, loading, useBtnLoader } = useContext(AuthContext)

  const { btnLoading, setBtnLoading } = useBtnLoader();

  const { state } = useLocation();

  const [passwordShown, setPasswordShown] = useState(false)
  const passwordRef = useRef('')

  const handleClick = () => {
    passwordRef.current.type = passwordShown ? "password" : "Text"
    setPasswordShown(!passwordShown);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);

    loginUser(e.target.email.value, e.target.password.value).finally(() => setBtnLoading(false))
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - login</title>
        </Helmet>
      </HelmetProvider>

      {
        loading ? <h3 className="text-5xl relative left-1/2 -translate-x-1/2 font-bold py-48 inline-flex">Loading{<Loader />}</h3> : <>

          {
            user ? <Navigate to={state || "/"} replace={true} /> : <>

              {state ? <p
                className="text-center text-red-500 my-8 uppercase">
                you need to login for accessing {state.split("/")[1]} page
              </p> : null}

              <div className="max-sm:w-[95%] max-w-[500px] mx-auto my-9 bg-base-300 rounded-lg">

                <p className="text-xl font-bold text-center pt-8">Login</p>

                <form className="p-10 space-y-4 " onSubmit={e => handleSubmit(e)}>

                  <input type="email" placeholder="Email" className="input input-bordered w-full" name="email" required />

                  <div className="relative">

                    <input type="password" placeholder="Password" className="input input-bordered w-full" name="password" ref={passwordRef} required />

                    <div className="absolute top-3 right-3 text-2xl" onClick={handleClick}>
                      {
                        passwordShown ? <FaRegEyeSlash /> : <FaRegEye />
                      }
                    </div>

                  </div>

                  <Link to='/forgot-password' className="inline-block text-sm hover:underline">Forgot Password ?</Link>

                  <div className="flex w-full">
                    <button className="card bg-base-100 rounded-box grid flex-grow place-items-center border" type="button" onClick={
                      () => loginGoogleUser().finally(() => setBtnLoading(false))
                    }>Google</button>

                    <div className="divider divider-horizontal">OR</div>

                    <button className="card rounded-box grid flex-grow place-items-center border border-accent bg-accent" type="submit" disabled={btnLoading ? true : false}>{btnLoading ? <Loader size="loading-sm" /> : "Login"}</button>
                  </div>

                </form>

                <p className="font-semibold text-center pb-8">Don't have an account ? <Link className="text-info" to="/register" state={state} replace={true}>Sign Up</Link></p>
              </div>
            </>
          }

        </>
      }

    </>
  )
}

export default Login