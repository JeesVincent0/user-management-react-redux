import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/middleware/logoutUserThunk";

const NavBar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logoutUser());
    }
    return (
        <div className="flex justify-between h-15 w-screen bg-black/20">
            <div className="flex items-center ml-10">
                <p className="text-black font-semibold">My Profile</p>
            </div>
            <div>
                <button onClick={handleLogout} className="h-10 w-30 flex justify-center items-center m-2 cursor-pointer border-2 rounded-md font-bold text-white bg-blue-500">logout</button>
            </div>
        </div>
    )
}

export default NavBar