import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import Banner from "../components/Banner"
import { useLoaderData } from "react-router-dom";

const Home = () => {

  const data = useLoaderData();

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  useEffect(() => {

    const navbar = document.querySelector('.navbar');

    navbar.classList.add('bg-transparent');
    navbar.classList.add('text-white');

    function navBackground() {
      if (window.scrollY > 50) {
        navbar.classList.remove('text-white');
        navbar.classList.remove('bg-transparent');
      } else if (window.scrollY <= 50) {
        navbar.classList.add('bg-transparent');
        navbar.classList.add('text-white');
      }
    }

    window.addEventListener('scroll', navBackground);

    return () => {
      navbar.classList.remove('text-white');
      navbar.classList.remove('bg-transparent');
      window.removeEventListener("scroll", navBackground)
    }
  }, [])

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider -mt-16 ">
          {
            data.map(
              banner => <Banner
                key={banner._id}
                img={banner.imageUrl}
                title={banner.title}
                body={banner.body}
              />
            )
          }
        </div>
      </div>

      {loaded && instanceRef.current && (
        <div className="dots -mt-8 relative z-10">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Home