import * as Yup from "yup";

const phoneNumberRegex = /^(\+?\d{1,4}?)?(\d{6,14})$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const formValidationSchema = Yup.object().shape({
    phoneNumberOrEmail: Yup.string()
      // .required("Email or phone number is required")
      .test('phoneNumberOrEmail', (value) => {
        if(!value) {
          return new Yup.ValidationError(
            'Email or phone number is required',
            value,
            'phoneNumberOrEmail'
          );
        }
        if(!(emailRegex.test(value) || (phoneNumberRegex.test(value)))){
          return new Yup.ValidationError(
            'Please enter a valid email or phone number',
            value,
            'phoneNumberOrEmail'
          );
        }
        return true;
      }),
    password: Yup.string()
      // .required("Password is required")
      .test(passwordRegex, (value) => {
        if(!value) {
          return new Yup.ValidationError(
            'Password is required',
            value,
            'password'
          );
        }
        if(!passwordRegex.test(value)){
          return new Yup.ValidationError(
            'Password must be at least\n8 characters long\na uppercase letter\na lowercase letter\na number\na special character.',
            value,
            'password'
          );
        }
        return true;
      }),
    });