import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export const HandleGoogleSignIn = () => {
    const {navigate} = useAuth();
    signInWithPopup(auth, provider)
      .then((response) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(response);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = response.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("user: ", user);
        navigate("/");
        toast.success("Google sign in successful");
        sessionStorage.setItem('Auth Token', token);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
        toast.error(errorMessage);
      });
  }