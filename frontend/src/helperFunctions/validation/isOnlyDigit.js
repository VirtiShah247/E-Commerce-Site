export const isOnlyDigit = (value) => {
    const regexOnlyDigit = /^\d+\.?\d*$/;
    return regexOnlyDigit.test(value);
}