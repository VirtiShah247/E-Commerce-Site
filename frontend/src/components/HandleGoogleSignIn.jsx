import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HandleGoogleSignIn = () => {
  const navigate = useNavigate();
  const {authToken} = useAuth();
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