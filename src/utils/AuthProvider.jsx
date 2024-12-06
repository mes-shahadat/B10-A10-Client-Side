import { createContext } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const authData = {
        name: "mohammad yasin"
    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }