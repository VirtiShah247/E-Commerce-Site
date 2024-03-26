import { Fragment } from "react"
import LoadingIcons from "react-loading-icons"
import OtpInput from "otp-input-react";
import { useAuth } from "../hooks/useAuth";
import { OTPVerify } from "./OTPVerify";

export const OTPForm = () => {
    const {loading, setLoading, otp, setOtp, navigate} = useAuth();
    return (
        <Fragment>
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
                    onClick={() => OTPVerify(otp, setLoading, navigate)}
                    className="p-3 h-[50px] bg-dark-yellow text-off-white rounded-md grid justify-center content-center"
                >
                    {loading ? (
                        <LoadingIcons.Oval />) : "Verify OTP"
                    }
                </button>
            </form>
        </Fragment>
    )
}
