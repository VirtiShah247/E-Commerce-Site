export const useInputChange = (details, setDetails) => {
    
    const handleChange = ({name, value}) => {
        setDetails({
            ...details,
            [name]: value
        })
    }

    return handleChange;
}
