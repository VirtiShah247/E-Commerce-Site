import LoginRegisterComponent from "../components/LoginRegisterComponent"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
    const {setPageName} = useAuth();
    setPageName("Login");
    return (
        <>
           <LoginRegisterComponent />
        </>
    )
}

export default Login