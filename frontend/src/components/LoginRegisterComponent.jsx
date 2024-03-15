// import React from 'react'
import PropTypes from "prop-types";
import Form from "./Form";
import cartImage from "../assets/login-page-cart-image.png";
// import mobileCartImage from "../assets/login-page-image.webp";
// import { Children } from "react";

const LoginRegisterComponent = ({ title, componentName }) => {
    return (
        <>
            <div className={`bg-[--dull-pink] grid justify-center content-center mx-[150px] my-[25px] rounded-md p-5 text-[--brown] shadow-xl shadow-[--dull-pink]-500/50`}>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center content-center ">
                    <div className="leftContent bg-white py-24">
                        <img src={cartImage} alt="Shopping Cart" className="w-72 md:w-full relative -left-5"/>
                    </div>
                    <div className="rightContent grid justify-center content-center w-full px-[80px]">
                        <h2>{title}</h2>
                        <Form componentName = {componentName}/>
                    </div>

                </div>
            </div>
        </>
        // <div>{Children.map(children, child => <div className="bg-red-500">{child}</div>)}</div>
    )
}

LoginRegisterComponent.propTypes = {
    title: PropTypes.node.isRequired,
    componentName: PropTypes.node.isRequired,
};

export default LoginRegisterComponent