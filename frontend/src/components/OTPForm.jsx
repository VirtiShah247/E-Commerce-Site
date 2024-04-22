import { Fragment, useState } from "react"
import LoadingIcons from "react-loading-icons"
import OtpInput from "otp-input-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../utils/Button";
import { Form } from "../utils/Form";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const OTPForm = () => {
  const { otp, setOtp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const ref = useRef();

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        console.log("otp verify response: ", response);
        toast.success("OTP Verified. Register successful");
        navigate('/');
        setLoading(false);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.code.split("/")[1];
        if (errorMessage === 'invalid-verification-code') {
          toast.error('Invalid OTP');

          setLoading(false);
        }
        else {
          toast.error(errorMessage);
          setLoading(false);
        }
      });
  }
  return (
    <Fragment>
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
        <Button onClick={onOTPVerify}
          color={"darkYellowButton"} size={"md"} ref={ref} className="justify-self-center py-3 px-16" disabled={loading}>
          {loading ? (
            <LoadingIcons.Oval />) : "Verify OTP"
          }
        </Button>
      </Form>
    </Fragment>
  )
}
