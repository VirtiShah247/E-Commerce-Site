import { useState } from "react"
import { AuthContext } from ".";
import PropTypes from "prop-types";

export const AuthProvide = ({ children }) => {
    // const [formDetails, setFormDetails] = useState({
    //     'phoneNumberOrEmail': "",
    //     'password': ""
    // });
    // const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    // const navigate = useNavigate();
    const [pageName, setPageName] = useState("Login");
    const authToken = sessionStorage.getItem("Auth Token");
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


