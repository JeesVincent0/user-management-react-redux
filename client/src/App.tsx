import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { setLoading } from "./redux/slice/userSlice/userSlice";

const Intro = lazy(() => import("./pages/Intro"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const Home = lazy(() => import("./pages/Home"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashBoard = lazy(() => import("./pages/AdminDashBoard"));
const EditAdminUser = lazy(() => import("./pages/EditAdminUser"));

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { admin } = useSelector((state: RootState) => state.admin);

  console.log("This is admin data from redux store: ", admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading())
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route
            path="/user"
            element={user ? <Navigate to={"/home"} replace /> : <UserLogin />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to={"/"} replace />}
          />
          <Route
            path="/admin"
            element={!admin ? <AdminLogin /> : <Navigate to={"/dashboard"} replace />}
          />
          <Route
            path="/dashboard"
            element={admin ? <AdminDashBoard /> : <Navigate to={"/"} replace />}
          />
          <Route
            path="/edit-user/:id"
            element={admin ? <EditAdminUser /> : <Navigate to={"/"} replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
