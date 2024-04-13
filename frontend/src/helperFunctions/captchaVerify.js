import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase/config";

export const captchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "registerButton",
        {
          size: "invisible",
          callback: (response) => {
            console.log("captcha verify: ", response);
            phonePasswordAuthentication();
          },
          "expired-callback": () => { },
        }
      );
    }
  }