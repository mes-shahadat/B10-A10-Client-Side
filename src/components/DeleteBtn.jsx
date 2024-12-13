import { useContext } from "react";
import Loader from "./Loader"
import { AuthContext } from "../utils/AuthProvider";

const DeleteBtn = ({ fn }) => {

    const { useBtnLoader } = useContext(AuthContext)
    const { btnLoading, setBtnLoading } = useBtnLoader();

    return (
        <button
            className="btn btn-ghost btn-xs text-error"
            onClick={() => {
                setBtnLoading(true)
                fn(setBtnLoading)
            }}
            disabled={btnLoading ? true : false}
        >
            {btnLoading ? <Loader size="loading-sm" margin="my-0" /> : "Delete"}
        </button>
    )
}

export default DeleteBtn