import { Fragment, useContext, useState } from "react"
import LoadingIcons from "react-loading-icons"
import OtpInput from "otp-input-react";
import { Button } from "../utils/Button";
import { Form } from "../utils/Form";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import PropTypes from "prop-types";

export const OTPForm = ({navigateTo, OTPLength, otpType, disabledStatus, autoFocusStatus}) => {
  const [otp, setOtp] = useState("");
  const {  authToken } =  useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const ref = useRef();

  const onOTPVerify = (event) => {
    event.preventDefault();
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        toast.success("OTP Verified.");
        navigate(navigateTo);
        setLoading(false);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        authToken.current = response._tokenResponse.refreshToken;
      })
      .catch((error) => {
        const errorMessage = error?.code?.split("/")[1];
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
      <Form size={"md"} onSubmit={(e)=>onOTPVerify(e)}>
        <label
          htmlFor="otp"
          className="font-bold text-xl text-center"
        >
          Enter your OTP
        </label>
        <OtpInput
          value={otp}
          onChange={setOtp}
          OTPLength={OTPLength}
          otpType={otpType}
          disabled={disabledStatus}
          autoFocus={autoFocusStatus}
          className="otp-container"
          id="otp"
        ></OtpInput>
        <Button type="submit"
          color={"primaryColorButton"} size={"md"} ref={ref} className="py-3 px-16" disabled={loading}>
          {loading ? (
            <LoadingIcons.Oval />) : "Verify OTP"
          }
        </Button>
      </Form>
    </Fragment>
  )
}
OTPForm.propTypes = {
  navigateTo: PropTypes.node.isRequired,
  OTPLength: PropTypes.node.isRequired,
  otpType: PropTypes.node.isRequired,
  disabledStatus: PropTypes.node.isRequired,
  autoFocusStatus: PropTypes.node.isRequired,
};
