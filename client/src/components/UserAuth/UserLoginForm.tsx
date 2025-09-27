import { useEffect, useReducer, useState } from "react"
import { userLoginFormStyle } from "./userloginform.style";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store";
import { createUser } from "../../redux/middleware/createUserThunk";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/middleware/loginUserThunk";

interface InitialState {
  email: string;
  newPassword: string;
  confirmPassword?: string;
  name?: string;
}

interface Action {
  type: string;
  field?: string;
  value?: string;
}

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_FIELD":
      if (action.field) return { ...state, [action.field]: action.value };
      return { ...state }
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const initialState: InitialState = {
  name: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
}

const UserLoginForm = () => {

  const [formStatus, setFormStatus] = useState("login");

  const [state, dispatchFrom] = useReducer(reducer, initialState);

  const dispatch = useDispatch<AppDispatch>();

  const changeFormStatus = () => {
    if (formStatus === "login") {
      setFormStatus("signup");
      dispatchFrom({ type: 'RESET' })
    } else {
      dispatchFrom({ type: 'RESET' })
      setFormStatus("login")
    }
  }

  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


  const { user, loading } = useSelector((state: RootState) => state.user)

  const navigate = useNavigate();

  const handleSubmit = () => {

    if (!isValidEmail(state.email)) {
      toast.dismiss();
      toast.error('Enter valid email');
      return;
    }

    if (formStatus === 'login') {
      if (!state.newPassword) {
        toast.dismiss();
        toast.error("Enter password...");
        return;
      }

      dispatch(loginUser({
        email: state.email,
        password: state.newPassword,
      }))
    } else {

      if (state.name !== "" && state.newPassword === state.confirmPassword && state.newPassword !== "" && state.confirmPassword !== "") {
        dispatch(createUser({
          name: state.name,
          email: state.email,
          newPassword: state.newPassword,
          confirmPassword: state.confirmPassword
        }));
      }

      if (state.newPassword !== state.confirmPassword) {
        toast.dismiss();
        toast.error('Password not matching...');
        return;
      }

      if (!state.newPassword || !state.confirmPassword || !state.name) {
        toast.dismiss();
        toast.error("Enter credentials")
        return;
      }
    }


  }

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])

  return (
    <div className={`${userLoginFormStyle.mainContainer}`}>
      <form className={`${userLoginFormStyle.formContainer}`}>
        <Link to={'/'}><button className="absolute top-5 left-5 p-1.5 cursor-pointer rounded-sm bg-black/10 text-black/70">back</button></Link>

        <h1 className={`${userLoginFormStyle.heading}`}>{formStatus === "login" ? `User LogIn` : `User SingUp`}</h1>

        {formStatus !== 'login' && (
          <input
            autoComplete="name"
            value={state.name}
            onChange={(e) =>
              dispatchFrom({ type: 'SET_FIELD', field: 'name', value: e.target.value })
            }
            className={`${userLoginFormStyle.inputField}`}
            type="text"
            placeholder="Full name"
          />
        )}

        {/* email */}
        <input
          autoComplete="username"
          value={state.email}
          onChange={(e) => dispatchFrom({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
          className={`${userLoginFormStyle.inputField}`}
          type="email"
          placeholder="Email" />

        {/* password or new password */}
        <input
          autoComplete="new-password"
          value={state.newPassword}
          onChange={(e) => dispatchFrom({ type: 'SET_FIELD', field: 'newPassword', value: e.target.value })}
          className={`${userLoginFormStyle.inputField}`}
          type="password"
          placeholder="Password" />

        {/* confirm password */}
        {formStatus !== 'login' ? (
          <input
            autoComplete=""
            value={state.confirmPassword}
            onChange={(e) => dispatchFrom({ type: 'SET_FIELD', field: 'confirmPassword', value: e.target.value })}
            className={`${userLoginFormStyle.inputField}`}
            type="password"
            placeholder="Confirm password" />)
          : ''}

        {/* submit button  */}

        <button
          onClick={handleSubmit}
          className={`${userLoginFormStyle.buttonStyle} ${loading ? `cursor-not-allowed` : `cursor-pointer`}`}
          disabled={loading}
          type="button">
          {formStatus === 'login' ? 'LogIn' : 'SignUp'}
        </button>

        <p onClick={changeFormStatus} className={`${userLoginFormStyle.formStatus}`}>
          {formStatus === 'login' ? 'Create new account' : 'Already have an account?'}</p>
      </form>
    </div>
  )
}

export default UserLoginForm