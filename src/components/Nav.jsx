import { Link, NavLink, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import { LocalStorageContext } from "../utils/LocalStorageProvider";
import { AuthContext } from "../utils/AuthProvider";
import logo from "../assets/logo.png"
import userImg from "../assets/user.png"

export const Nav = () => {

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate()

  const { radioChecked, setRadioChecked } = useContext(LocalStorageContext);


  useEffect(() => {

    const toggle = document.querySelector('.navbar .theme-controller');
    const update = () => {
      setRadioChecked(prev => !prev)
    }

    toggle.addEventListener("click", update)

    return () => toggle.removeEventListener("click", update)
  }, [])

  useEffect(() => {

    let theme = radioChecked ? "retro" : "dracula";

    if (localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme)
    } else {
      localStorage.setItem("theme", theme)
    }

    const radio = document.querySelector('.navbar .theme-controller');

    if (radioChecked) {
      radio.checked = true
    } else {
      radio.checked = false
    }

  }, [radioChecked])

  const navlinks = <>
    <li><NavLink to="/" className={({ isActive, isPending }) => isPending ? "!animate-pulse duration-75 !text-accent pointer-events-none" : isActive ? "active" : ""}>Home</NavLink></li>
    <li><NavLink to="/all-reviews" className={({ isActive, isPending }) => isPending ? "!animate-pulse duration-75 !text-accent pointer-events-none" : isActive ? "active" : ""}>All Reviews</NavLink></li>
    <li><NavLink to="/add-review">Add Review</NavLink></li>
    <li><NavLink to="/my-reviews">My Reviews</NavLink></li>
    <li><NavLink to="/my-watchlist">Game Watchlist</NavLink></li>
  </>

  return (
    <>
      <div className="nav-container bg-base-100 w-full h-[68px] fixed top-0 z-40 transition-all duration-500 shadow-sm max-w-[2000px]">

        <div className="navbar md:w-11/12 mx-auto">

          <div className="navbar-start">
            <div className="dropdown ml-2">
              <label className="btn btn-circle swap swap-rotate lg:hidden">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512">
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512">
                  <polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-custom-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow  border border-base-content/10 lg:hidden">
                {navlinks}
              </ul>
            </div>
            <Link className="btn btn-ghost text-xl" to="/">
              <img className="h-20 -mt-4" src={logo} alt="" />
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {
                navlinks
              }
            </ul>
          </div>

          <div className="navbar-end space-x-2">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" className="theme-controller" value="retro" />

              {/* sun icon */}
              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {
              user ? <div className="inline-flex space-x-2">
                <Link to="/update-profile">
                  <img
                    className="h-12 w-12 rounded-full object-cover inline-block max-sm:hidden"
                    src={user.photoURL || userImg} alt=""
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={user.displayName || "you"}
                    data-tooltip-place="top"
                  /></Link>
                <NavLink className="btn " onClick={
                  () => {
                    setTimeout(() => navigate("/"), 100)
                    logOut()
                  }
                }>Log Out</NavLink>
              </div> : <div className="inline-flex space-x-2">
                <NavLink className="btn" to="/login">Login</NavLink>
                <NavLink className="btn max-sm:hidden" to="/register">Register</NavLink>
              </div>
            }

          </div>

        </div>

      </div>

      <div className="h-16"></div>
    </>
  )
}

export default Nav