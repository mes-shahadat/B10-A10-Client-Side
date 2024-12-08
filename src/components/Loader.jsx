
const Loader = ({margin, size}) => {
    return (
        <div className={`text-center ${ margin || "my-4"}`}>
            <span className={`loading loading-dots ${size || "loading-lg"}`}></span>
        </div>
    )
}

export default Loader