import { Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "./redux/middleware/getUserThunk";

const App = () => {

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Navigate to={'/home'} replace /> : <Intro />} />
        <Route path="/user" element={user ? <Navigate to={'/home'} replace /> : <UserLogin />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to={'/'} replace />} />
      </Routes>
    </>
  );
};

export default App;