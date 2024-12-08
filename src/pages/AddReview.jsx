import { useContext } from "react"
import { AuthContext } from "../utils/AuthProvider"
import Loader from "../components/Loader"
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AddReview = () => {
  
  const { useBtnLoader } = useContext(AuthContext)
  const { btnLoading } = useBtnLoader();


  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - add review</title>
        </Helmet>
      </HelmetProvider>
      {btnLoading ? <Loader size="loading-sm" /> : "add review"}
    </>
  )
}

export default AddReview