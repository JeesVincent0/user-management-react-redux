import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/slice/userSlice/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../redux/store";

const Home = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <button onClick={handleLogout} className="h-10 w-30 p-2 cursor-pointer border-2 rounded-md font-semibold bg-red-500">logout</button>
    </div>
  )
}

export default Home
