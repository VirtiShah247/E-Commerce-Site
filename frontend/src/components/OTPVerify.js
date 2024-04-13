import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export const OTPVerify = () => {
    const {setLoading, otp } = useAuth();
    console.log(otp);
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        console.log("otp verify response: ", response);
        toast.success(`OTP Verified.  successful`);
        // navigate('/');
        setLoading(false);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.code.split("/")[1];
        if (errorMessage === 'invalid-verification-code') {
          toast.error(`Invalid OTP. failed`);
          setLoading(false);
        }
        else{
          toast.error(errorMessage);
          setLoading(false);
        }
      });
  }