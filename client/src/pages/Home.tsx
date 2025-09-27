import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../redux/store";
import { logoutUser } from "../redux/middleware/logoutUserThunk";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="flex justify-center h-screen w-screen">
      <NavBar />
      <button onClick={handleLogout} className="h-10 w-30 p-2 cursor-pointer border-2 rounded-md font-semibold bg-red-500">logout</button>
    </div>
  )
}

export default Home