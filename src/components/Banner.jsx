import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom"

const Banner = ({ img, title, body }) => {
    return (
        <>
            <div className='keen-slider__slide relative'>
                <img className='w-full h-[100vh] object-cover' src={img} alt="" loading="eager"/>
                <div className='absolute top-0 w-full h-full flex items-center justify-center bg-black/30'>
                    <div className='text-white max-w-[55ch] space-y-6 text-justify p-4'>
                        <Fade cascade>
                            <div className="text-5xl font-bold">
                                {/* <Fade cascade duration={250} className="!whitespace-break-spaces"> */}
                                    {title || "Game name"}
                                {/* </Fade> */}
                            </div>
                            <div className="text-gray-200 font-semibold leading-relaxed">
                                {body || "Game details"}
                            </div>
                            <Link className="btn bg-error text-white border-none font-bold">
                                Explore The Game
                            </Link>
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner