import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/AuthProvider";
import Loader from "./Loader";

function PrivateRoute ({children}) {

    const {loading} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const {pathname} = useLocation();

    if (loading) {
        return <h3 className="text-5xl relative left-1/2 -translate-x-1/2 font-bold py-48 inline-flex">Loading{<Loader/>}</h3>
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={pathname} replace={true}/>
}

export default PrivateRoute