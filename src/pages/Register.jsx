import { Link, Navigate, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../utils/AuthProvider";
import Loader from "../components/Loader";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Register = () => {

  const { createUser, updateUser, user, loginGoogleUser, loading, useBtnLoader } = useContext(AuthContext);
  const { btnLoading, setBtnLoading } = useBtnLoader();

  const { state } = useLocation();

  const [passwordShown, setPasswordShown] = useState(false)
  const passwordRef = useRef()
  const [passwordError, setPasswordError] = useState({
    upperLetter: false,
    lowerLetter: false,
    whitespaces: false,
    length: false
  })

  const handleChange = (e) => {

    let arr = passwordError;

    if (/[a-z]/.test(e.target.value)) {
      arr = { ...arr, lowerLetter: false }
    } else {
      arr = { ...arr, lowerLetter: "Must have a Lowercase letter in the password" }
    }

    if (/[A-Z]/.test(e.target.value)) {
      arr = { ...arr, upperLetter: false }
    } else {
      arr = { ...arr, upperLetter: "Must have an Uppercase letter in the password" }
    }

    if (/^\S*$/.test(e.target.value)) {
      arr = { ...arr, whitespaces: false }
    } else {
      arr = { ...arr, whitespaces: "whitespaces in the password is not allowed" }
    }

    if (/.{6,}/.test(e.target.value)) {
      arr = { ...arr, length: false }
    } else {
      arr = { ...arr, length: "Password Length must be at least 6 character" }
    }

    setPasswordError(arr)

  }

  const handleClick = () => {
    passwordRef.current.type = passwordShown ? "password" : "Text"
    setPasswordShown(!passwordShown);
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    setBtnLoading(true);

    createUser(e.target.email.value, e.target.password.value, () => updateUser({
      displayName: e.target.name.value, photoURL: e.target.photo_url.value, email: e.target.email.value
    })).finally(() => setBtnLoading(false));

  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - register</title>
        </Helmet>
      </HelmetProvider>
      {
        loading ? <h3 className="text-5xl relative left-1/2 -translate-x-1/2 font-bold py-48 inline-flex">Loading{<Loader />}</h3> : <>

          {
            user ? <Navigate to={state || "/"} replace={true} /> : <div className="max-sm:w-[95%] max-w-[500px] mx-auto my-9 bg-base-300 rounded-lg">

              <p className="text-xl font-bold text-center pt-8">Register</p>

              <form className="p-10 space-y-4 " onSubmit={e => handleSubmit(e)}>

                <input type="text" placeholder="Name" className="input input-bordered w-full" name="name" required />

                <input type="text" placeholder="Photo URL" className="input input-bordered w-full" name="photo_url" />

                <input type="email" placeholder="Email" className="input input-bordered w-full" name="email" required />

                <div className="relative">

                  <input type="password" placeholder="Password" className="input input-bordered w-full" name="password" pattern="^(?=.*[A-Z])(?=.*[a-z])\S{6,}$" ref={passwordRef} onChange={e => handleChange(e)} required />

                  <div className="absolute top-3 right-3 text-2xl" onClick={handleClick}>
                    {
                      passwordShown ? <FaRegEyeSlash /> : <FaRegEye />
                    }
                  </div>

                </div>

                {
                  passwordError ? <p className="text-red-500 text-sm">{passwordError[Object.keys(passwordError).find(i => passwordError[i] !== false)]}</p> : null
                }

                <div className="flex w-full flex-col border-opacity-50 pt-4">
                  <button className="card rounded-box grid place-items-center border border-accent h-12 bg-accent" type="submit" disabled={btnLoading ? true : false}>{btnLoading ? <Loader size="loading-sm" /> : "Register"}</button>
                  <div className="divider">OR</div>
                  <button className="card bg-base-100 rounded-box grid place-items-center border h-12" type="button" onClick={
                    () => loginGoogleUser().finally(() => setBtnLoading(false))
                  }>Google</button>
                </div>

              </form>

              <p className="font-semibold text-center pb-8">Already have an account ? <Link className="text-info" to='/login' state={state} replace={true}>Log In</Link></p>
            </div>
          }

        </>
      }
    </>

  )
}

export default Register