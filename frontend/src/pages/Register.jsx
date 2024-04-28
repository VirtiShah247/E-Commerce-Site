import { useContext } from "react";
import LoginRegisterComponent from "../components/LoginRegisterComponent"
import { AuthContext } from "../context";

const Register = () => {
  const {setPageName} =  useContext(AuthContext);
    setPageName("Register");
  return (
    <>
      <LoginRegisterComponent />
    </>
  )
}

export default Register