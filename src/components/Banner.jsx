import { Bounce } from "react-awesome-reveal";
import { Link } from "react-router-dom"

const Banner = ({img, title, body}) => {
    return (
        <>
            <div className='keen-slider__slide relative'>
                <img className='w-full h-[100vh] object-cover' src={img} alt="" />
                <div className='absolute top-0 w-full h-full flex items-center justify-center bg-black/40'>
                    <div className='text-white max-w-[55ch] space-y-6 text-justify p-4'>
                        <Bounce>
                        <p className="text-5xl font-bold">{title || "Game name"}</p>
                        <p className="text-gray-200 font-semibold leading-relaxed">{body || "Game details"}</p>
                        <Link className="btn bg-error text-white border-none font-bold">Explore The Game</Link>
                        </Bounce>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner