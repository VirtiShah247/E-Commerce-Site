import { useState } from "react";

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
    }
    

    return [formDetails, handleChange];
}
