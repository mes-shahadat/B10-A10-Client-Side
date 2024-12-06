import { Link } from "react-router-dom"

const Banner = () => {
    return (
        <>
            <div className='-mt-16 relative'>
                <img className='w-full h-[100vh] object-cover' src="https://i.ibb.co.com/q1rxb4f/spider-man.jpg" alt="" />
                <div className='absolute top-0 w-full h-full flex items-center justify-center bg-black/30'>
                    <div className='text-white max-w-[55ch] space-y-6 text-justify p-4'>
                        <p className="text-5xl font-extrabold">Spider man</p>
                        <p className="text-gray-100 font-semibold leading-relaxed">Swing through the streets of New York and embrace your inner superhero in Spider-Man. With exhilarating gameplay and a captivating story, this game gives you the freedom to navigate the city and confront iconic villains.</p>
                        <Link className="btn bg-error text-white border-none font-bold">Explore The Game</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner