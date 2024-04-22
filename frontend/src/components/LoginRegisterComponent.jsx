import cartImage from "../assets/login-page-cart-image.png";
import AuthForm from "./AuthForm";
import { useAuth } from "../hooks/useAuth";


const LoginRegisterComponent = () => {
    const {pageName} = useAuth();
    const pageHeading = pageName === "Login" ? "Welcome Back. Please Log In To Your Account." : "Welcome to EFashionia. Please Register To a New Account.";
    return (
        <>
            <div className={"grid justify-center content-center lg:mx-[120px] md:mx-[50px] sm:mx-[25px] md:my-[20px] rounded-md p-5 text-foreground-color"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 justify-center content-center gap-5 md:gap-2">
                    <div className="leftContent py-24 h-[50px]  sm:h-full grid content-center justify-center">
                        <img src={cartImage} alt="Shopping Cart" className="sm:w-full relative -left-5 h-[150px] w-[300px] sm:h-full animate-[1s_ease-out_0s_1_slideInFromLeft]"/>
                    </div>
                    <div className="rightContent grid justify-center content-center w-full px-0 md:px-[79px]">
                        <h2>{pageHeading}</h2>
                        <AuthForm></AuthForm>
                    </div>
                </div>
            </div>
        </>
    )
}



export default LoginRegisterComponent