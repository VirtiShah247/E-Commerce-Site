import { Fragment } from "react"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../utils/Button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const ProfileItems = () => {
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("session storage: " + authToken);
        auth.signOut();
        sessionStorage.removeItem("Auth Token");
        window.location.reload();
    }
    return (
        <Fragment>
            <div className=" text-center grid content-center justify-center ">
                {
                    authToken === null ?
                        <div className="grid text-left content-center justify-center">
                            <h3>Welcome</h3>
                            <p>To access account and manage orders</p>
                            <Button color="whiteButton" className="text-pink font-medium border-grey-500 border-2 p-2 mt-2" onClick={() => navigate("/login")}>LOGIN / SIGNUP</Button>
                        </div>
                        :
                        <Button color="whiteButton" className="text-pink font-medium py-2 px-16" onClick={handleLogout}>Log out</Button>
                }
            </div>
        </Fragment>
    )
}
