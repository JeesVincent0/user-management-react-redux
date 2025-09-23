import { useEffect, useReducer, useState } from "react"
import { userLoginFormStyle } from "./userloginform.style";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store, type AppDispatch, type RootState } from "../../redux/store";
import { createUser } from "../../redux/middleware/createUserThunk";

interface InitialState {
  email: string;
  newPassword: string;
  confirmPassword?: string;
}

interface Action {
  type: string;
  field: string;
  value: string;
}

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const initialState: InitialState = {
  email: "",
  newPassword: "",
  confirmPassword: "",
}

const UserLoginForm = () => {

  const [formStatus, setFormStatus] = useState("login");

  const [state, dispatchFrom] = useReducer(reducer, initialState);

  const dispatch = useDispatch<AppDispatch>();

  const changeFormStatus = () => formStatus === "login" ? setFormStatus("signup") : setFormStatus("login");

  const { user } = useSelector((state: RootState) => state.user)

  console.log(store.getState())

  const navigate = useNavigate();

  const handleSubmit = () => {

    if (formStatus !== 'login' && state.newPassword === state.confirmPassword) {
      dispatch(createUser({
        email: state.email,
        newPassword: state.newPassword,
        confirmPassword: state.confirmPassword
      }));
    }

    if (formStatus !== "login" && state.newPassword !== state.confirmPassword) {
      alert("Password not matching");
      return;
    }

    if (formStatus !== "login") {
      if (!state.newPassword || !state.confirmPassword || !state.email) {
        alert("Fill the form");
        return;
      }
    }

    if (formStatus === 'login') {
      if (!state.newPassword || !state.email) {
        alert("Enter details")
        return
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
      <div className={`${userLoginFormStyle.formContainer}`}>
        <Link to={'/'}><button className="absolute top-5 left-5 p-1.5 cursor-pointer rounded-sm bg-black/10 text-black/70">back</button></Link>

        <h1 className={`${userLoginFormStyle.heading}`}>{formStatus === "login" ? `User LogIn` : `User SingUp`}</h1>

        {/* email */}
        <input
          onChange={(e) => dispatchFrom({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
          className={`${userLoginFormStyle.inputField}`}
          type="email"
          placeholder="Email" />

        {/* password or new password */}
        <input
          onChange={(e) => dispatchFrom({ type: 'SET_FIELD', field: 'newPassword', value: e.target.value })}
          className={`${userLoginFormStyle.inputField}`}
          type="password"
          placeholder="Password" />

        {/* confirm password */}
        {formStatus !== 'login' ? (
          <input
            onChange={(e) => dispatchFrom({ type: 'SET_FIELD', field: 'confirmPassword', value: e.target.value })}
            className={`${userLoginFormStyle.inputField}`}
            type="password"
            placeholder="Confirm password" />)
          : ''}

        {/* submit button  */}
        <button
          onClick={handleSubmit}
          className={`${userLoginFormStyle.buttonStyle}`}
          type="button">
          {formStatus === 'login' ? 'LogIn' : 'SignUp'}
        </button>

        <p onClick={changeFormStatus} className={`${userLoginFormStyle.formStatus}`}>
          {formStatus === 'login' ? 'Create new account' : 'Already have an account?'}</p>
      </div>
    </div>
  )
}

export default UserLoginForm