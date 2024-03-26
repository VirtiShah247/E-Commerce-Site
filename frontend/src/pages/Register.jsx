// import React from 'react'

import LoginRegisterComponent from "../components/LoginRegisterComponent"
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const {setPageName} = useAuth();
    setPageName("Register");
  return (
    <>
      <LoginRegisterComponent />
    </>
  )
}

export default Register