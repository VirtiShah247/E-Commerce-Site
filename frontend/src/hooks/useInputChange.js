import { useState } from "react";
// import { formValidationSchema } from "../helperFunctions/validation/formValidationSchema";
// import { useAuth } from "./useAuth";

export const useInputChange = () => {
    const [ formDetails, setFormDetails ] = useState({
            'phoneNumberOrEmail': "",
            'password': ""
        });
    const handleChange = async({name, value}) => {
        setFormDetails({
            ...formDetails,
            [name]: value
        })
        // try{
        //     // console.log("try");
        //     await formValidationSchema.validate(formDetails, {abortEarly: false});
        // }
        // catch(error){
        //     const newErrors = {};
        //     error.inner.forEach((err) => {
        //         newErrors[err.path] = err.message;
        //     });
        //     // console.log(newErrors);
        //     handleError(newErrors);
        // }
    }
    

    return [formDetails, handleChange];
}
