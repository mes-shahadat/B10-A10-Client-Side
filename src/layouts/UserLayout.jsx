import { Outlet } from "react-router-dom"
import { Tooltip } from 'react-tooltip'
import Footer from "../components/Footer"
import Nav from "../components/nav"

const UserLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <Tooltip id="my-tooltip" style={{ backgroundColor: "oklch(var(--b3))", color: "oklch(var(--bc))" }} />
      <div className="h-[100vh]"></div>
    </>
  )
}

export default UserLayout