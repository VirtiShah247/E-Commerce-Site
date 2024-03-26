import PropTypes from "prop-types";
import cartImage from "../assets/login-page-cart-image.png";
import AuthForm from "./AuthForm";
import { useAuth } from "../hooks/useAuth";


const LoginRegisterComponent = () => {
    const {pageName} = useAuth();
    const pageHeading = pageName === "Login" ? "Welcome Back. Please Log In To Your Account." : "Welcome to EFashionia. Please Register To a New Account.";
    return (
        <>
            <div className={"bg-dull-pink grid justify-center content-center md:mx-[150px] md:my-[20px] rounded-md p-5 text-brown shadow-xl shadow-dull-pink-500/50"}>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center content-center gap-5 md:gap-2">
                    <div className="leftContent bg-white py-24 h-[50px] md:h-full grid content-center">
                        <img src={cartImage} alt="Shopping Cart" className="md:w-full relative -left-5 h-[150px] w-[300px] md:h-full animate-[1s_ease-out_0s_1_slideInFromLeft]"/>
                    </div>
                    <div className="rightContent grid justify-center content-center w-full px-0  md:px-[79px]">
                        <h2>{pageHeading}</h2>
                        <AuthForm></AuthForm>
                    </div>

                </div>
            </div>
        </>
    )
}

LoginRegisterComponent.propTypes = {
    title: PropTypes.node.isRequired,
    componentName: PropTypes.node.isRequired,
    formLinkTitle: PropTypes.node.isRequired,
};

export default LoginRegisterComponent