import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth";
import { LoginRegisterForm } from './LoginRegisterForm';
import { OTPForm } from './OTPForm';

const AuthForm = () => {
  const { showOTP } = useAuth();
  return (
    <>
      {
        showOTP ? (<>
          <OTPForm />
        </>) : (<>
          <LoginRegisterForm />
        </>)
      }
      <ToastContainer />
    </>
  )
}

export default AuthForm