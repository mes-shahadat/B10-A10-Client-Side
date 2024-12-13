import { useContext } from 'react';
import { AuthContext } from '../utils/AuthProvider';
import userImg from "../assets/user.png"
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const UpdateProfile = () => {

    const { user, updateUser, useBtnLoader } = useContext(AuthContext);

    const { btnLoading, setBtnLoading } = useBtnLoader();

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnLoading(true);

        updateUser({
            displayName: e.target.name.value,
            photoURL: e.target.photo_url.value
        }).finally(() => setBtnLoading(false));
    }

    return <section className="my-10 mx-2 flex max-md:flex-col justify-center items-center gap-4">

        <HelmetProvider>
            <Helmet>
                <title>Chill Gamer - update profile</title>
            </Helmet>
        </HelmetProvider>

        <div className="bg-base-300 rounded-lg max-w-[500px]">

            <div className="text-center space-y-4 pt-10">
                <img className="w-28 rounded-full mx-auto border border-base-300" src={user?.photoURL || userImg} alt="" />
                <div className="space-y-2">
                    <p className="text-lg font-bold max-w-96 mx-auto overflow-hidden">{user?.displayName}</p>
                    <p className="font-semibold text-sm">{user?.email}</p>
                </div>
            </div>

            <form className="p-10 space-y-4" onSubmit={e => handleSubmit(e)}>


                <input type="text" placeholder="Name" className="input input-bordered w-full" name="name" defaultValue={user?.displayName} />

                <input type="text" placeholder="Photo URL" className="input input-bordered w-full" name="photo_url" defaultValue={user?.photoURL} />

                <Link className="text-sm inline-block m-1 hover:underline" to='/forgot-password'>Forgot Password ?</Link>

                <button className="w-full py-3 font-semibold rounded-lg border border-accent bg-accent" type="submit" disabled={btnLoading ? true : false}>{btnLoading ? <Loader margin="my-0" size="loading-sm" /> : "Update Information"}</button>
            </form>

        </div>
    </section>
}

export default UpdateProfile