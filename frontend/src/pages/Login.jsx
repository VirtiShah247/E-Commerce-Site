import { useContext } from "react";
import LoginRegisterComponent from "../components/LoginRegisterComponent"
import { AuthContext } from "../context";

const Login = () => {
    const {setPageName} =  useContext(AuthContext);
    setPageName("Login");
    return (
        <>
           <LoginRegisterComponent />
        </>
    )
}

export default Login