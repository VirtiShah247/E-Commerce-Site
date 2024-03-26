import LoginRegisterComponent from "../components/LoginRegisterComponent"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
    const {pageName, setPageName} = useAuth();
    console.log("page name ...........",pageName);
    setPageName("Login");
    return (
        <>
           <LoginRegisterComponent />
        </>
    )
}

export default Login