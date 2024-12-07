import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase_init";
import { toast } from 'react-toastify';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const loginGoogleUser = () => {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(() => {
                toast.success("Log In successfull", {
                    position: "bottom-right"
                })
            }).catch((error) => {
                toast.error(error.message, {
                    position: "bottom-right"
                })
            });
    }

    const createUser = (email, password, callback) => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                callback()
                toast.success("Registration successfull", {
                    position: "bottom-right"
                })
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "bottom-right"
                })
            });
    }

    const updateUser = (obj) => {

        updateProfile(auth.currentUser, obj)
            .then(() => {
                toast.success("Profile update successfull", {
                    position: "bottom-right"
                })
                setUser({ ...user, ...obj })
            }).catch((error) => {
                toast.error(error.message, {
                    position: "bottom-right"
                })
            });
    }

    const loginUser = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {

                toast.success("Login successfull", {
                    position: "bottom-right"
                })

            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "bottom-right"
                })
            });
    }

    const logOut = () => {

        signOut(auth).then(() => {

            toast.success("Log Out successfull", {
                position: "bottom-right"
            })
        }).catch((error) => {

            toast.error(error.message, {
                position: "bottom-right"
            })
        });
    }

    const resetUserPassword = (email) => {

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Email Sent", {
                    position: "bottom-right"
                })
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "bottom-right"
                })
            });
    }

    useEffect(
        () => {
            let unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
                
                setLoading(false);
            })

            return () => { unsubscribe() }

        }, []
    )

    const authData = {

        user,
        loading,
        setUser,
        createUser,
        loginUser,
        logOut,
        updateUser,
        resetUserPassword,
        loginGoogleUser, 
        setLoading
    }
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }