import cartImage from "../assets/login-page-cart-image.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context";
import { ToastContainer } from "react-toastify";
import { OTPForm } from "./OTPForm";
import { AuthForm } from "./AuthForm";
import 'react-toastify/dist/ReactToastify.css';

const LoginRegisterComponent = () => {
    const { pageName } = useContext(AuthContext);
    const [showOTP, setShowOTP] = useState(false);
    const handleShowOTP = (value) => {
        setShowOTP(value);
    }
    const otpSettings = { navigateTo: "/", OTPLength: 6, otpType: "number", disabledStatus: false, autoFocusStatus: true };
    const pageHeading = pageName === "Login" ? "Welcome Back. Please Log In To Your Account." : "Welcome to EFashionia. Please Register To a New Account.";
    return (
        <>
            <div className={"grid justify-center content-center p-5 lg:mx-[120px] md:mx-[50px] sm:mx-[25px] md:my-[20px] rounded-md  text-foreground-color"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 justify-center content-center gap-5 md:gap-2 mx-2">
                    <div className="leftContent py-24 h-[50px]  sm:h-full grid content-center justify-center">
                        <img src={cartImage} alt="Shopping Cart" className="sm:w-full relative -left-5 h-[150px] w-[300px] sm:h-full animate-[1s_ease-out_0s_1_slideInFromLeft]" />
                    </div>
                    <div className="rightContent grid justify-center content-center max-w-full px-0 md:px-[79px]">
                        <h2>{pageHeading}</h2>
                        {
                            showOTP ? (<>
                                <OTPForm {...otpSettings} />
                            </>) : (<>
                                <AuthForm handleShowOTP={handleShowOTP} />
                            </>)
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}



export default LoginRegisterComponent