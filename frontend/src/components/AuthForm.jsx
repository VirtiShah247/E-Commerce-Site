import { Fragment, useContext, useRef, useState } from "react"
import { Form } from "../utils/Form"
import { Button } from "../utils/Button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../utils/Input";
import { Links } from "../utils/Links";
import LoadingIcons from "react-loading-icons";
import { isOnlyDigit } from "../helperFunctions/validation/isOnlyDigit";
import { toast } from "react-toastify";
import { GoogleAuthProvider, RecaptchaVerifier, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import { auth, firestoreDb, provider } from "../firebase/config";
import { useInputChange } from "../hooks/useInputChange";
import { formValidationSchema } from "../helperFunctions/validation/formValidationSchema";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PropTypes from "prop-types";
import { collection, getDocs } from "firebase/firestore";

export const AuthForm = ({ handleShowOTP }) => {
    const ref = useRef();
    const { pageName, authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        'phoneNumberOrEmail': "",
        'password': ""
    });
    const formLinkName = pageName === "Login" ? "New User? Register" : "Already Registered? Login";
    const [details, handleChange] = useInputChange({
        'phoneNumberOrEmail': "",
        'password': ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const callingCode = useRef();

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,
                "registerButton",
                {
                    size: "invisible",
                    callback: () => {
                        phonePasswordAuthentication();
                    },
                    "expired-callback": () => { },
                }
            );
        }
    }

    const getCallingCode = async () => {
        const dataCollection = collection(firestoreDb, "country");
        const countryDocs = await getDocs(dataCollection);
        const countryDetails = countryDocs.docs.map((doc) => doc.data());
        const code = countryDetails[0].callingCode;
        console.log("calling code: " + code);
        callingCode.current = code;
        // return callingCode;
    }

    const phonePasswordAuthentication = async () => {
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        await getCallingCode();
        console.log("format ph calling code: " + callingCode.current);
        const formatPh = `+${callingCode.current}` + details.phoneNumberOrEmail;
        console.log("format ph: " + formatPh);
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                handleShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                const errorMessage = error?.code?.split("/")[1];
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
        if (pageName === 'Register') {
            createUserWithEmailAndPassword(auth, details.phoneNumberOrEmail, details.password)
                .then((response) => {
                    toast.success("Register successful");
                    navigate('/');
                    setLoading(false);
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
                    authToken.current = response._tokenResponse.refreshToken;
                })
                .catch((error) => {
                    const errorMessage = error.code.split("/")[1];
                    if (errorMessage === 'email-already-in-use') {
                        toast.error('Email Already in Use');
                        setLoading(false);
                    }
                    else {
                        toast.error(errorMessage);
                        setLoading(false);
                    }
                })
        }
        else if (pageName === "Login") {
            signInWithEmailAndPassword(auth, details?.phoneNumberOrEmail, details?.password)
                .then((response) => {
                    toast.success("Login successful");
                    navigate('/');
                    setLoading(false);
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
                    authToken.current = response._tokenResponse.refreshToken;
                })
                .catch((error) => {
                    const errorMessage = error?.code?.split("/")[1];
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
    const handleInputChange = async ({ name, value }) => {
        handleChange({ name, value });
        console.log("errors: " + errors.phoneNumberOrEmail + " " + errors.password);
        if (errors[name] != "") {
            const detail = { ...details, [name]: value };
            try {
                await formValidationSchema.validate(detail, { abortEarly: false });
            }
            catch (error) {
                const newErrors = {};
                error?.inner.forEach((err) => {
                    newErrors[err?.path] = err?.message;
                });
                setErrors(newErrors);
            }
        }
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await formValidationSchema.validate(details, { abortEarly: false });
            isOnlyDigit(details.phoneNumberOrEmail) ? phonePasswordAuthentication() : emailPasswordAuthentication();
        }
        catch (error) {
            const newErrors = {};
            error?.inner.forEach((err) => {
                newErrors[err?.path] = err?.message;
            });
            setErrors(newErrors);
            setLoading(false);
        }
    }
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((response) => {
                const credential = GoogleAuthProvider.credentialFromResult(response);
                const token = credential.accessToken;
                navigate("/");
                toast.success("Google sign in successful");
                sessionStorage.setItem('Auth Token', token);
                authToken.current = token;
            }).catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    }
    return (
        <Fragment>
            <Form ref={ref} size={"md"} onSubmit={(e) => handleFormSubmit(e)} className="grid justify-center content-center justify-self-center">
                <center>
                    <Button onClick={handleGoogleSignIn} ref={ref} className="mt-[10px] w-[300px] bg-base-color text-foreground-color flex gap-3 p-3 shadow-lg">
                        {<FcGoogle size="30px" />}<span>Sign in with google</span>
                    </Button>
                </center>
                <div className="justify-self-center">
                    OR
                </div>

                <Input type="text"
                    id="phoneNumberOrEmail" values={details.phoneNumberOrEmail}
                    name="phoneNumberOrEmail"
                    onChange={(e) => handleInputChange(e.target)}
                    placeholder=" " labelName="Input phone number or email id"
                    ref={ref}>
                    {
                        errors?.phoneNumberOrEmail && errors?.phoneNumberOrEmail !== "" && (
                            <div className="text-secondary-color">{errors?.phoneNumberOrEmail}</div>
                        )
                    }
                </Input>

                <Input type={showPassword === true ? "text" : "password"}
                    id="password" values={details.password}
                    name="password"
                    onChange={(e) => handleInputChange(e.target)}
                    placeholder=" " labelName="Input password"
                    >
                    <div className="absolute top-5 right-5"
                        ref={ref}>
                        {
                            showPassword === true ? <Button type="button" ref={ref} color={"baseColorButton"} onClick={() => setShowPassword(false)}>
                                <AiFillEye size={20} />
                            </Button> : <Button type="button" ref={ref} color={"baseColorButton"} onClick={() => setShowPassword(true)}>
                                <AiFillEyeInvisible size={20} />
                            </Button>
                        }
                    </div>
                    {
                        errors?.password && errors?.password !== "" && (<div className="text-secondary-color">{
                            errors?.password.split("\n").map((str, index) => {
                                if(index == 1 && /.{8,}/.test(details.password)) {
                                    return <p key={index} className="text-correct-color">{str}</p>
                                }
                                if (index == 2 && /[A-Z]/.test(details.password)) {
                                    return <p key={index} className="text-correct-color">{str}</p>
                                }
                                if (index == 3 && /[a-z]/.test(details.password)) {
                                    return <p key={index} className="text-correct-color">{str}</p>
                                }
                                if (index == 4 && /\d/.test(details.password)) {
                                    return <p key={index} className="text-correct-color">{str}</p>
                                }
                                if(index == 5 && /[@$!%*?&]/.test(details.password)){
                                    return <p key={index} className="text-correct-color">{str}</p>
                                   }
                                else {
                                    return <p key={index}>{str}</p>
                                }
                            })
                        }</div>)
                    }
                </Input>
                <Links to={pageName === 'Login' ? "/register" : "/login"} color={"primaryColorLink"} size={"md"}>{formLinkName}</Links>
                <Button id="registerButton" type="submit" color={"primaryColorButton"} size={"md"} ref={ref} className="py-3 px-16 text-[20px]" disabled={loading}>
                    {loading === true ? <LoadingIcons.Oval /> : pageName}
                </Button>
            </Form>
        </Fragment>
    )
}
AuthForm.propTypes = {
    handleShowOTP: PropTypes.node.isRequired,
};
