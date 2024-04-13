// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom"

import { Fragment } from "react"
import { LandingPage } from "../components/LandingPage"

export const Home = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   let authToken = sessionStorage.getItem('Auth Token');

  //   if (authToken) {
  //     navigate("/");
  //   }
  //   else{
  //     navigate('/login');
  //   }
  // }, [navigate]);
  return (
    <Fragment>
      <LandingPage />
      <div>Home</div>
    </Fragment>
  )
}
