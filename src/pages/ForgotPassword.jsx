import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ForgotPassword = () => {

    const { user } = useContext(AuthContext);
    const { resetUserPassword, logOut } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        resetUserPassword(e.target.email.value);
        logOut();
        window.location.replace('https://mail.google.com/')
    }

    return (
        <>

            <HelmetProvider>
                <Helmet>
                    <title>Chill Gamer - Forgot Password</title>
                </Helmet>
            </HelmetProvider>

            <div className="max-sm:w-[95%] max-w-[500px] mx-auto my-9 bg-base-300 rounded-lg">

                <p className="text-xl font-bold text-center pt-8 pb-4">Forgot Password</p>

                <p className=" text-center max-w-[35ch] mx-auto">Enter your email address below and we'll send reset link to this email.</p>

                <form className="p-10 space-y-4 " onSubmit={e => handleSubmit(e)}>

                    <input type="email" placeholder="Email" className="input input-bordered w-full" name="email" defaultValue={user?.email} required />

                    <button className="w-full py-3 rounded-box border border-accent bg-accent" type="submit">Reset Password</button>

                </form>

                {
                    user === null ? <p className="font-semibold text-center pb-8">Don't have an account ? <Link className="text-info " to="/register">Sign Up</Link></p> : null
                }
            </div>
        </>
    )
}

export default ForgotPassword