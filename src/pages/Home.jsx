import { useEffect } from "react";
import Banner from "../components/Banner"

const Home = () => {
  

  useEffect(() => {
    
    const navbar = document.querySelector('.navbar');

    navbar.classList.add('bg-transparent');
    navbar.classList.add('text-white');
    
    function navBackground () {
      if (window.scrollY > 50) {
        // navbar.classList.add('bg-transparent');
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
    <Banner/>
    </>
  )
}

export default Home