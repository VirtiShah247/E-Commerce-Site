import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";

export const HandleGoogleSignIn = () => {
  const navigate = useNavigate();
  const { authToken } =  useContext(AuthContext);
    signInWithPopup(auth, provider)
      .then((response) => {
        const credential = GoogleAuthProvider.credentialFromResult(response);
        const token = credential.accessToken;
        navigate("/");
        toast.success("Google sign in successful");
        sessionStorage.setItem('Auth Token', token);
        authToken.current = token;

      }).catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }