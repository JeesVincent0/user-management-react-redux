import { introStyle } from "./introcards.style";
import react_icon from "../../assets/react.svg";
import redux_icon from "../../assets/redux.svg";
import { Link } from "react-router-dom";

const IntroCards = () => {

    return (
        <div className={introStyle.mainCard}>
            <div className={introStyle.headingDiv}>
                {/* <div className="absolute inset-0 rounded-lg blur-lg bg-gradient-to-r from-[#7248B6] to-[#61DBFB] -z-10"></div> */}
                <h1 className={introStyle.heading}>User Management System</h1>
                <div className={introStyle.reactReduxCard}>
                    <div className="flex gap-1.5 items-center">
                        <img className={introStyle.icon} src={react_icon} alt="" />
                        <h2 className={introStyle.reactText}>React</h2>
                    </div>
                    <h2 className={introStyle.andText}>&</h2>
                    <div className="flex gap-1.5 items-center">
                        <img className={introStyle.icon} src={redux_icon} alt="" />
                        <h2 className={introStyle.reduxText}>Redux</h2>
                    </div>
                </div>
            </div>

            <div className={introStyle.buttonMainContainer}>
                <Link to={'/admin'}><div className={introStyle.buttonAdmin}>Admin Panel</div></Link>
                <Link to={'/user'}><div className={introStyle.buttonUser}>User Panel</div></Link>
            </div>
        </div>
    )
}

export default IntroCards
