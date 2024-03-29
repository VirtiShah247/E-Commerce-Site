import { Fragment, useRef, useState } from "react"
import { Form } from "../utils/Form"
import { Button } from "../utils/Button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../utils/Input";
import { Links } from "../utils/Links";
import LoadingIcons from "react-loading-icons";
import { useAuth } from "../hooks/useAuth";
// import { HandleGoogleSignIn } from "./HandleGoogleSignIn";
import { isOnlyDigit } from "../helperFunctions/validation/isOnlyDigit";
import { toast } from "react-toastify";
import { GoogleAuthProvider, RecaptchaVerifier, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useInputChange } from "../hooks/useInputChange";
// import { Formik } from "formik";
import { formValidationSchema } from "../helperFunctions/validation/formValidationSchema";

export const LoginRegisterForm = () => {
    const ref = useRef();
    const { pageName, loading, setLoading, setShowOTP, navigate } = useAuth();
    const [errors, setErrors] = useState({});
    const formLinkName = pageName === "Login" ? "New User? Register" : "Already Registered? Login";
    const [formDetails, handleChange] = useInputChange();
    
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

    const phonePasswordAuthentication = () => {
        console.log("Phone no");
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+91" + formDetails.phoneNumberOrEmail;
        console.log("app verifier: ", appVerifier);
        console.log("format phone: ", formDetails.phoneNumberOrEmail);

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log("Sign in with phone no error: ", error);
                const errorMessage = error.code.split("/")[1];
                if (errorMessage === 'invalid-phone-number') {
                    toast.error('Please check the Phone Number');
                    setLoading(false);
                }
                else {
                    toast.error(errorMessage);
                    setLoading(false);
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
                    setLoading(false);
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
                })
                .catch((error) => {
                    const errorMessage = error.code.split("/")[1];
                    console.log("Register Error: ", error);
                    if (errorMessage === 'email-already-in-use') {
                        toast.error('Email Already in Use');
                        setLoading(false);
                    }
                    else{
                        toast.error(errorMessage);
                        setLoading(false);
                    }
                })
        }
        else if (pageName === "Login") {
            signInWithEmailAndPassword(auth, formDetails.phoneNumberOrEmail, formDetails.password)
                .then((response) => {
                    toast.success("Login successful");
                    navigate('/');
                    setLoading(false);
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                })
                .catch((error) => {
                    console.log("Login Error: ", error);
                    const errorMessage = error.code.split("/")[1];
                    if (errorMessage === 'invalid-credential') {
                        toast.error('Please check the Credential');
                        setLoading(false);
                    }
                    if (errorMessage === 'wrong-password') {
                        toast.error('Please check the Password');
                        setLoading(false);
                    }
                    if (errorMessage === 'user-not-found') {
                        toast.error('Please check the Email');
                        setLoading(false);
                    }
                    else {
                        toast.error(errorMessage[0].toUpperCase() + errorMessage.substr(1,));
                        setLoading(false);
                    }
                })
        }
    }
    const handleFormSubmit = async(event) => {
        event.preventDefault();
        setLoading(true);
        console.log(formDetails);
        try{
            const response = await formValidationSchema.validate(formDetails, {abortEarly: false});
            console.log(response);
            isOnlyDigit(formDetails.phoneNumberOrEmail) ? phonePasswordAuthentication() : emailPasswordAuthentication();
        }
        catch(error){
            const newErrors = {};
            console.log(error.inner);
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            setLoading(false);
        }
        // firebase authentication
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
        <Fragment>
            <Form ref={ref} size={"md"} onSubmit={(e) => handleFormSubmit(e)}>
                <center>
                    <Button onClick={handleGoogleSignIn} ref={ref} className="mt-[10px] w-[300px] bg-white text-brown flex gap-3">
                        {<FcGoogle size="30px" />}<span>Sign in with google</span>
                    </Button>
                </center>
                <div className="justify-self-center">
                    OR
                </div>
                <Input type="text"
                    id="phoneNumberOrEmail" values={formDetails.phoneNumberOrEmail}
                    name="phoneNumberOrEmail"
                    onChange={(e) => handleChange(e.target)}
                    placeholder=" " labelName="Input phone number or email id">
                    {
                        errors.phoneNumberOrEmail && (
                            <div className="text-red-500">{errors.phoneNumberOrEmail}</div>
                        )
                    }
                </Input>

                <Input type="password"
                    id="password" values={formDetails.password}
                    name="password"
                    onChange={(e) => handleChange(e.target)}
                    placeholder=" " labelName="Input password">
                    {
                        errors.password && (<div className="text-red-500">{errors.password}</div>)
                    }
                </Input>

                <Links to={pageName === 'Login' ? "/register" : "/login"} color={"darkPinkLink"} size={"md"}>{formLinkName}</Links>
                <Button id="registerButton" type="submit" color={"darkYellowButton"} size={"md"} ref={ref} className="justify-self-center" disabled={loading}>
                    {loading === true ? <LoadingIcons.Oval /> : pageName}
                </Button>
            </Form>

        </Fragment>
    )
}
