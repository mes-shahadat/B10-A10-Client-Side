import { createContext, useState } from "react"

const LocalStorageContext = createContext()

const LocalStorageProvider = ({ children }) => {

    const [radioChecked, setRadioChecked] = useState(localStorage.getItem("theme") === "retro" ? true : false);



    const localData = {
        radioChecked,
        setRadioChecked
    }

    return (
        <LocalStorageContext.Provider value={localData}>
            {children}
        </LocalStorageContext.Provider>
    )
}

export { LocalStorageProvider, LocalStorageContext }