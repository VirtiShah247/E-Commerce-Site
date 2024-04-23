import { useRef, useState } from "react"
import { AuthContext } from ".";
import PropTypes from "prop-types";

export const AuthProvide = ({ children }) => {
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [pageName, setPageName] = useState("Login");
    const authToken = useRef(sessionStorage.getItem("Auth Token"));
    const value = {
        otp,
        setOtp,
        showOTP,
        setShowOTP,
        pageName,
        setPageName,
        authToken
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
AuthProvide.propTypes = {
    children: PropTypes.node.isRequired,
};


