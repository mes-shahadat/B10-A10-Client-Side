import { useContext, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import Banner from "../components/Banner"
import { useLoaderData } from "react-router-dom";
import NewReleases from "../components/NewReleases";
import Recommended from "../components/Recommended";
import HighestRated from "../components/HighestRated";
import { LocalStorageContext } from "../utils/LocalStorageProvider";

const Home = () => {

  const data = useLoaderData();

  const {radioChecked} = useContext(LocalStorageContext);

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

    const navbar = document.querySelector('.nav-container');
    const dropdown = document.querySelector('.navbar .menu');
    const radio = document.querySelector('.navbar .theme-controller');

    const textColor = radio.checked ? 'text-black' : 'text-white';

    if (window.scrollY <= 50) {

      navbar.classList.add('bg-transparent');
      navbar.classList.add('text-white');
      dropdown.classList.add(textColor);
    }

    function navBackground() {
      if (window.scrollY > 50) {
        navbar.classList.remove('text-white');
        navbar.classList.remove('bg-transparent');
        dropdown.classList.remove(textColor);
      } else if (window.scrollY <= 50) {
        navbar.classList.add('bg-transparent');
        navbar.classList.add('text-white');
        dropdown.classList.add(textColor);
      }
    }

    window.addEventListener('scroll', navBackground);

    return () => {
      navbar.classList.remove('bg-transparent');
      navbar.classList.remove('text-white');
      dropdown.classList.remove(textColor);
      window.removeEventListener("scroll", navBackground)
    }
  }, [radioChecked])


  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider -mt-16 ">
          {
            data?.map(
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
            ...Array(instanceRef.current.track.details?.slides.length).keys(),
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

      <div className="w-11/12 mx-auto my-20">
        <NewReleases />
        <HighestRated />
        <Recommended />
      </div>
    </>
  )
}

export default Home