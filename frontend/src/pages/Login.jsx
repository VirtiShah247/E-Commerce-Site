import LoginRegisterComponent from "../components/LoginRegisterComponent"

// import React from 'react'
const Login = () => {
    const title = "Welcome Back. Please Log In To Your Account.";
    const componentName = "Login";
    return (
        <>
           <LoginRegisterComponent title = {title} componentName = {componentName}/>
            {/* <LoginRegisterComponent>
                hello
            </LoginRegisterComponent> */}
        </>
    )
}

export default Login