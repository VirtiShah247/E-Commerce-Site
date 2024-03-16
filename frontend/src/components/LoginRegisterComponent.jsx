import PropTypes from "prop-types";
import Form from "./Form";
import cartImage from "../assets/login-page-cart-image.png";


const LoginRegisterComponent = ({ title, componentName }) => {
    return (
        <>
            <div className={`bg-[--dull-pink] grid justify-center content-center md:mx-[150px] md:my-[20px] rounded-md p-5 text-[--brown] shadow-xl shadow-[--dull-pink]-500/50`}>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center content-center gap-5 md:gap-2">
                    <div className="leftContent bg-white py-24 h-[50px] md:h-full grid content-center animate-[1s_ease-out_0s_1_slideInFromLeft]">
                        <img src={cartImage} alt="Shopping Cart" className="md:w-full relative -left-5 h-[150px] w-[300px] md:h-full"/>
                    </div>
                    <div className="rightContent grid justify-center content-center w-full px-0  md:px-[80px]">
                        <h2>{title}</h2>
                        <Form componentName = {componentName}/>
                    </div>

                </div>
            </div>
        </>
    )
}

LoginRegisterComponent.propTypes = {
    title: PropTypes.node.isRequired,
    componentName: PropTypes.node.isRequired,
};

export default LoginRegisterComponent