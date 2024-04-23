import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export const OTPVerify = () => {
    const { otp, authToken } = useAuth();
    
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        toast.success(`OTP Verified.  successful`);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        authToken.current = response._tokenResponse.refreshToken;
      })
      .catch((error) => {
        const errorMessage = error.code.split("/")[1];
        if (errorMessage === 'invalid-verification-code') {
          toast.error(`Invalid OTP. failed`);
        }
        else{
          toast.error(errorMessage);
        }
      });
  }