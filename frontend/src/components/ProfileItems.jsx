import { Fragment } from "react"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../utils/Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const ProfileItems = () => {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut();
        sessionStorage.removeItem("Auth Token");
        authToken.current = null;
        window.location.reload();
    }
    return (
        <Fragment>
            <div className="text-center grid content-center justify-center py-4 px-6">
                {
                    authToken.current === null ?
                        <div className="grid text-left content-center justify-center">
                            <h3>Welcome</h3>
                            <p>To access account and manage orders</p>
                            <Button color="baseColorButton" className="text-secondary-color font-medium border-grey-500 border-2 p-2 mt-2 rounded-full" onClick={() => navigate("/login")}>LOGIN / SIGNUP</Button>
                        </div>
                        :
                        <Button color="baseColorButton" className="text-secondary-color font-medium" onClick={handleLogout}>Log out</Button>
                }
            </div>
        </Fragment>
    )
}
