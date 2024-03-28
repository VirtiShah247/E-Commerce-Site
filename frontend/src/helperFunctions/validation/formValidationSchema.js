import * as Yup from "yup";
import { isValidNumber } from 'libphonenumber-js'

const phoneNumberRegex = /^\+\d{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const formValidationSchema = Yup.object().shape({
    phoneNumberOrEmail: Yup.string()
      .required("Email or phone number is required")
      .test('phoneNumberOrEmail','Please enter a valid email or phone number', (value) => {
        if(!value) return false;
        return emailRegex.test(value) || (phoneNumberRegex.test(value) && isValidNumber(value));
      }),
    password: Yup.string()
      .required("Password is required")
      .matches(passwordRegex, "Password must include at least\na uppercase letter\na lowercase letter\na number\na special character.")
      
  });