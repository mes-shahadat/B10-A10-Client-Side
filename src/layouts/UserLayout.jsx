import { Outlet } from "react-router-dom"
import { Tooltip } from 'react-tooltip'
import { ToastContainer } from 'react-toastify';
import Footer from "../components/Footer"
import Nav from "../components/nav"

const UserLayout = () => {

  return (
    <>
      <Nav />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Tooltip id="my-tooltip" 
      style={
        {
          zIndex: "100", 
          backgroundColor: "oklch(var(--b2))", 
          color: "oklch(var(--bc))", 
          outline: "1px solid oklch(var(--b1))", 
          boxShadow: "0px 0px 3px 0px oklch(var(--bc))" 
        }
      } />
      <ToastContainer />
      {/* <div className="h-[100vh]"></div> */}
    </>
  )
}

export default UserLayout