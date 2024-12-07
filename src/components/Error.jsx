import { Link } from "react-router-dom"
import img from '../assets/error.jpg'

const Error = () => {
  return (
    <>
    <Link className="text-blue-300 text-lg text-center underline absolute top-2/3 left-1/2 -translate-x-1/2" to="/">Back to Home</Link>
    <img className="h-[100vh] w-full object-cover" src={img} alt="" />
    </>
  )
}

export default Error