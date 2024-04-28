import { useState } from "react";

export const useInputChange = (initialDetails) => {
    const [ details, setDetails ] = useState(initialDetails);
    const handleChange = async({name, value}) => {
        setDetails({
            ...details,
            [name]: value
        })
    }
    

    return [details, handleChange];
}
