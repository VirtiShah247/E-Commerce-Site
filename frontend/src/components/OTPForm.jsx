import { Fragment } from "react"
import LoadingIcons from "react-loading-icons"
import OtpInput from "otp-input-react";
import { useAuth } from "../hooks/useAuth";
import { OTPVerify } from "./OTPVerify";
import { Button } from "../utils/Button";
import { Form } from "../utils/Form";
import { useRef } from "react";

export const OTPForm = () => {
    const {loading, setLoading, otp, setOtp, navigate} = useAuth();
    const ref = useRef();
    return (
        <Fragment>
            <Form ref={ref} size={"md"}>
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
                    onClick={() => OTPVerify(otp, setLoading, navigate)}
                    color={"darkYellowButton"} size={"md"}>
                    {loading ? (
                        <LoadingIcons.Oval />) : "Verify OTP"
                    }
                </Button>
            </Form>
        </Fragment>
    )
}
