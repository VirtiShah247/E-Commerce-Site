import { useAuth } from "./useAuth";

export const useInputChange = () => {
    const { formDetails, setFormDetails } = useAuth();
    const handleChange = ({name, value}) => {
        setFormDetails({
            ...formDetails,
            [name]: value
        })
    }

    return handleChange;
}
