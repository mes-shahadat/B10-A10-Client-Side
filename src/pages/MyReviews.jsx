import { Helmet, HelmetProvider } from 'react-helmet-async';

const MyReviews = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Chill Gamer - my reviews</title>
        </Helmet>
      </HelmetProvider>
      <div>MyReviews</div>
    </>
  )
}

export default MyReviews