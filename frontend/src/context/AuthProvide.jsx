import { useRef, useState } from "react"
import { AuthContext } from ".";
import PropTypes from "prop-types";

export const AuthProvide = ({ children }) => {
    const [pageName, setPageName] = useState("Login");
    const authToken = useRef(sessionStorage.getItem("Auth Token"));
    const value = {
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


