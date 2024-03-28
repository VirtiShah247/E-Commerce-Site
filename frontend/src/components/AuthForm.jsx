// import React from 'react'
import { auth, provider } from "../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcons from 'react-loading-icons';
import { FcGoogle } from "react-icons/fc";
import { useInputChange } from "../hooks/useInputChange";
import { Input } from "../utils/Input";
// import { OTPForm } from "./OTPForm";
import OtpInput from "otp-input-react";
// import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { OTPVerify } from "./OTPVerify";
import PropTypes from "prop-types";
import { Button } from "../utils/Button";
import { useRef } from "react";
import { Form } from "../utils/Form";
import { Links } from "../utils/Links";
import { isOnlyDigit } from "../helperFunctions/validation/isOnlyDigit";
// import { captchaVerify } from "../helperFunctions/captchaVerify";

const AuthForm = ({ children }) => {
  const { formDetails, loading, setLoading, otp, setOtp, showOTP, setShowOTP, navigate, pageName } = useAuth();
  const handleChange = useInputChange();
  const formLinkName = pageName === "Login" ? "New User? Register" : "Already Registered? Login";
  const ref = useRef(null);
  // const [formDetails, setFormDetails] = useState({
  //   'phoneNumberOrEmail': "",
  //   'password': ""
  // })
  // const [loading, setLoading] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [showOTP, setShowOTP] = useState(false);
  // const navigate = useNavigate();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "registerButton",
        {
          size: "invisible",
          callback: (response) => {
            console.log("captcha verify: ", response);
            phonePasswordAuthentication();
          },
          "expired-callback": () => { },
        }
      );
    }
  }

  // const onOTPVerify = () => {
  //   setLoading("true");
  //   window.confirmationResult
  //     .confirm(otp)
  //     .then(async (response) => {
  //       console.log("otp verify response: ", response);
  //       toast.success("OTP Verified. Register successful");
  //       navigate('/');
  //       setLoading("false");
  //       sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.code === 'auth/invalid-verification-code') {
  //         toast.error('Invalid OTP');
  //         setLoading("false");
  //       }
  //     });
  // }
  const phonePasswordAuthentication = () => {
    console.log("Phone no");
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + formDetails.phoneNumberOrEmail;
    console.log("app verifier: ", appVerifier);
    console.log("format phone: ", formatPh);

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log("Sign in with phone no error: ", error);
        if (error.code === 'auth/invalid-phone-number') {
          toast.error('Please check the Phone Number');
          setLoading("false");
        }

      });
  }

  const emailPasswordAuthentication = () => {
    console.log("email");
    if (pageName === 'Register') {
      createUserWithEmailAndPassword(auth, formDetails.phoneNumberOrEmail, formDetails.password)
        .then((response) => {
          console.log("Resp: ", response);
          toast.success("Register successful");
          navigate('/');
          setLoading("false");
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        })
        .catch((error) => {
          console.log("Register Error: ", error);
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
            setLoading("false");
          }
        })
    }
    else if (pageName === "Login") {
      signInWithEmailAndPassword(auth, formDetails.phoneNumberOrEmail, formDetails.password)
        .then((response) => {
          toast.success("Login successful");
          navigate('/');
          setLoading("false");
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log("Login Error: ", error);
          if (error.code === 'auth/invalid-credential') {
            toast.error('Please check the Credential');
            setLoading("false");
          }
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
            setLoading("false");
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
            setLoading("false");
          }
        })
    }
  }

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormDetails({
  //     ...formDetails,
  //     [name]: value
  //   })
  // }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading("true");
    console.log(formDetails);

    // firebase authentication
    isOnlyDigit ? phonePasswordAuthentication() : emailPasswordAuthentication();
  }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(response);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = response.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("user: ", user);
        navigate("/");
        toast.success("Google sign in successful");
        sessionStorage.setItem('Auth Token', token);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
        toast.error(errorMessage);
      });
  }
  return (
    <>
      {
        showOTP ? (<>
          <Form size={"md"}>
            <label
              htmlFor="otp"
              className="font-bold text-xl text-center"
            >
              Enter your OTP
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container"
              id="otp"
            ></OtpInput>
            <Button
              onClick={() => OTPVerify(pageName)}
              color={"darkYellowButton"} size={"md"} ref={ref}>
              {loading ? (
                <LoadingIcons.Oval />) : "Verify OTP"
              }
            </Button>
          </Form>

        </>) : (<>
          <Form ref={ref} size={"md"}>
            <center>
              {/* <button className="mt-[10px] bg-white py-1.5 px-12 flex justify-center content-center gap-3"
                onClick={handleGoogleSignIn}>
                  {<FcGoogle size="30px" />}<span>Sign in with google</span>
              </button> */}
              <Button onClick={handleGoogleSignIn} ref={ref} className="mt-[10px] w-[300px] bg-white text-brown flex gap-3">
                {<FcGoogle size="30px" />}<span>Sign in with google</span>
              </Button>
            </center>
            <div className="justify-self-center">
              OR
            </div>
            <Input type="text" required
              name="phoneNumberOrEmail" value={formDetails.phoneNumberOrEmail}
              onChange={(e) => handleChange(e.target)} placeholder=" " labelName="Input phone number or email id">{children}</Input>
            <Input type="password" required
              name="password" value={formDetails.password}
              onChange={(e) => handleChange(e.target)} placeholder=" " labelName="Input password">{children}</Input>
            <Links to={pageName === 'Login' ? "/register" : "/login"} color={"darkPinkLink"} size={"md"}>{formLinkName}</Links>
            {/* <button id="registerButton" className={Button({color: "darkYellowButton", size: "md"})}
              onClick={(e) => handleFormSubmit(e)}>
              {loading === "true" ? <LoadingIcons.Oval /> : pageName}
            </button> */}
            <Button id="registerButton" onClick={(e) => handleFormSubmit(e)} color={"darkYellowButton"} size={"md"} ref={ref} className="justify-self-center">
              {loading === "true" ? <LoadingIcons.Oval /> : pageName}
            </Button>
          </Form>
        </>)
      }
      <ToastContainer />

    </>
  )
}
AuthForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthForm