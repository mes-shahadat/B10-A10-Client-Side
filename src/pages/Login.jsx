import { useContext, useRef, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../utils/AuthProvider";

const Login = () => {

  const { loginUser, user, loginGoogleUser } = useContext(AuthContext)
  const {state} = useLocation();

  const [passwordShown, setPasswordShown] = useState(false)
  const passwordRef = useRef('')

  const handleClick = () => {
    passwordRef.current.type = passwordShown ? "password" : "Text"
    setPasswordShown(!passwordShown);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(e.target.email.value, e.target.password.value)
  }

  return (
    <>
      {user ? <Navigate to={state?.pathname || "/"} replace={true} /> : null}

      <div className="max-w-[500px] mx-auto my-9 bg-base-300 rounded-lg">

        <p className="text-xl font-bold text-center pt-8">Login</p>

        <form className="p-10 space-y-4 " onSubmit={e => handleSubmit(e)}>

          <input type="email" placeholder="Email" className="input input-bordered w-full" name="email" required />

          <div className="relative">

            <input type="password" placeholder="Password" className="input input-bordered w-full" ref={passwordRef} name="password" required />

            <div className="absolute top-3 right-3 text-2xl" onClick={handleClick}>
              {
                passwordShown ? <FaRegEyeSlash /> : <FaRegEye />
              }
            </div>

          </div>

          <Link to='/forgot-password' className="inline-block text-sm hover:underline">Forgot Password ?</Link>

          <div className="flex w-full">
            <button className="card bg-base-100 rounded-box grid flex-grow place-items-center border" type="button" onClick={loginGoogleUser}>Google</button>
            <div className="divider divider-horizontal">OR</div>
            <button className="card bg-base-100 rounded-box grid flex-grow place-items-center border" type="submit">Login</button>
          </div>

        </form>

        <p className="font-semibold text-center pb-8">Don't have an account ? <Link className="text-blue-600" to="/register" >Sign Up</Link></p>
      </div>
    </>
  )
}

export default Login