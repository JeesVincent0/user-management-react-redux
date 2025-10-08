import { useEffect, useReducer } from "react"
import { userLoginFormStyle } from "../UserAuth/userloginform.style";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { loginAdmin } from "../../redux/middleware/loginAdminThunk";

interface InitialState {
    email: string;
    newPassword: string;
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
    email: "",
    newPassword: "",
}

const AdminLoginForm = () => {

    const [state, dispatchFrom] = useReducer(reducer, initialState);

    const dispatch = useDispatch<AppDispatch>();

    function isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const { admin, loading } = useSelector((state: RootState) => state.admin);

    const navigate = useNavigate();

    const handleSubmit = () => {

        if (!isValidEmail(state.email)) {
            toast.error('Enter valid email');
            return;
        }

        if (!state.newPassword) {
            toast.error("Enter password...");
            return;
        }

        dispatch(loginAdmin({
            email: state.email,
            password: state.newPassword,
        }))

    }

    useEffect(() => {
        if (admin) {
            navigate('/dashboard')
        }
    }, [admin, navigate])

    return (
        <div className={`${userLoginFormStyle.mainContainer}`}>
            <form className={`${userLoginFormStyle.formContainer}`}>

                <Link to={'/'}><button className="absolute top-5 left-5 p-1.5 cursor-pointer rounded-sm bg-black/10 text-black/70">back</button></Link>

                <h1 className={`${userLoginFormStyle.heading}`}>Admin Login</h1>

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

                {/* submit button  */}
                <button
                    onClick={handleSubmit}
                    className={`${userLoginFormStyle.buttonStyle} ${loading ? `cursor-not-allowed` : `cursor-pointer`}`}
                    disabled={loading}
                    type="button">
                    LogIn
                </button>

            </form>
        </div>
    )
}

export default AdminLoginForm