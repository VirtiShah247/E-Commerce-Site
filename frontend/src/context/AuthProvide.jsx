import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from ".";
import PropTypes from "prop-types";


export const AuthProvide = ({ children }) => {
    const [formDetails, setFormDetails] = useState({
        'phoneNumberOrEmail': "",
        'password': ""
    });
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const navigate = useNavigate();
    const [pageName, setPageName] = useState("Login");
    const value = {
        formDetails,
        setFormDetails,
        loading,
        setLoading,
        otp,
        setOtp,
        showOTP,
        setShowOTP,
        navigate,
        pageName,
        setPageName,
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


