// import React from 'react'
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcons from 'react-loading-icons';
import { FcGoogle } from "react-icons/fc";
import OtpInput from "otp-input-react";

const Form = ({ componentName, formLinkTitle }) => {
  const [formDetails, setFormDetails] = useState({
    'phoneNumberOrEmail': '',
    'password': ''
  });
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

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
  const onOTPVerify = () => {
    setLoading("true");
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        console.log("otp verify response: ", response);
        toast.success("OTP Verified. Register successful");
        navigate('/');
        setLoading("false");
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-verification-code') {
          toast.error('Invalid OTP');
          setLoading("false");
        }
      });
  }

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
    if (componentName === 'Register') {
      createUserWithEmailAndPassword(auth, formDetails.phoneNumberOrEmail, formDetails.password)
        .then((response) => {
          console.log("Resp: ", response);
          toast.success("Register successful");
          navigate('/');
          setLoading("false");
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log("Register Error: ", error);
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
            setLoading("false");
          }
        })
    }
    else if (componentName === "Login") {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDetails({
      ...formDetails,
      [name]: value
    })
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading("true");
    console.log(formDetails);

    // firebase authentication
    const regexOnlyDigit = /^\d+\.?\d*$/;
    if (regexOnlyDigit.test(formDetails.phoneNumberOrEmail)) {
      phonePasswordAuthentication();
    }
    else {
      emailPasswordAuthentication();
    }

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
          <form className="grid gap-6 mt-[50px] justify-center">
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
            <button
              onClick={onOTPVerify}
              className="p-3  h-[50px] bg-dark-yellow text-off-white rounded-md grid justify-center content-center"
            >
              {loading ? (
                <LoadingIcons.Oval />) : "Verify OTP"
              }
            </button>
          </form>

        </>) : (<>
          <form className="grid gap-6 mt-[50px] justify-center">
            <center>
              <button className="mt-[10px] bg-white py-1.5 px-12 flex justify-center content-center gap-3"
                onClick={handleGoogleSignIn}>{<FcGoogle size="30px" />}<span>Sign in with google</span></button>
            </center>
            <div className="justify-self-center">
              OR
            </div>
            <div className="relative">
              <input type="text" required
                name="phoneNumberOrEmail" value={formDetails.phoneNumberOrEmail}
                onChange={(e) => handleInputChange(e)}
                className="peer bg-transparent outline outline-0 focus:outline-0 disabled:bg-pink 
                  disabled:border-0 transition-all placeholder-shown:border-2 
                  placeholder-shown:border-dark-yellow border-2 focus:border-2 border-t-transparent 
                  focus:border-t-transparent border-brown focus:border-dark-yellow p-4 rounded-md w-[270px] md:w-[350px]"
                placeholder=" " />
              <label
                className="flex w-[270px] md:w-[350px] select-none pointer-events-none absolute left-0 font-normal
                    !overflow-visible truncate leading-tight peer-focus:leading-tight 
                    peer-disabled:text-transparent  transition-all -top-1.5  before:content[' '] before:block
                    before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 
                    peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t 
                    peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 
                    before:pointer-events-none before:transition-all peer-disabled:before:border-transparent 
                    after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 
                    after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent 
                    after:rounded-tr-md after:border-t-2 peer-focus:after:border-t-2 after:border-r 
                    peer-focus:after:border-r-2 after:pointer-events-none after:transition-all 
                    peer-disabled:after:border-transparent peer-placeholder-shown:leading-[5] 
                    peer-focus:text-brown text-sm 
                    peer-focus:before:!border-dark-yellow after:border-1 after:border-brown 
                    peer-focus:after:!border-dark-yellow  before:border-brown">
                Input phone number or email id
              </label>
            </div>
            <div className="relative">
              <input type="password" required
                name="password" value={formDetails.password}
                onChange={(e) => handleInputChange(e)}
                className="peer bg-transparent outline outline-0 focus:outline-0 disabled:bg-pink 
                  disabled:border-0 transition-all placeholder-shown:border-2 
                  placeholder-shown:border-dark-yellow border-2 focus:border-2 border-t-transparent 
                  focus:border-t-transparent border-brown focus:border-dark-yellow p-4 rounded-md w-[270px] md:w-[350px]"
                placeholder=" " />
              <label
                className="flex w-[270px] md:w-[350px] select-none pointer-events-none absolute left-0 font-normal
                    !overflow-visible truncate leading-tight peer-focus:leading-tight 
                    peer-disabled:text-transparent  transition-all -top-1.5  before:content[' '] before:block
                    before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 
                    peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t 
                    peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 
                    before:pointer-events-none before:transition-all peer-disabled:before:border-transparent 
                    after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 
                    after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent 
                    after:rounded-tr-md after:border-t-2 peer-focus:after:border-t-2 after:border-r 
                    peer-focus:after:border-r-2 after:pointer-events-none after:transition-all 
                    peer-disabled:after:border-transparent peer-placeholder-shown:leading-[5] 
                      peer-focus:text-brown text-sm 
                    peer-focus:before:!border-dark-yellow after:border-1 after:border-brown 
                    peer-focus:after:!border-dark-yellow  before:border-brown">
                Input password
              </label>
            </div>
            <Link to={componentName === 'Login' ? "/register" : "/login"} className="text-dark-pink underline">{formLinkTitle}</Link>
            <button id="registerButton" className="p-3 w-[200px] h-[50px] bg-dark-yellow text-off-white rounded-md grid justify-center content-center justify-self-center"
              onClick={(e) => handleFormSubmit(e)}
            >{loading === "true" ? <LoadingIcons.Oval /> : componentName}</button>
          </form>
        </>)
      }

      <ToastContainer />

    </>
  )
}

Form.propTypes = {
  componentName: PropTypes.node.isRequired,
  formLinkTitle: PropTypes.node.isRequired,
};

export default Form