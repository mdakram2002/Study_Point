
const checkValidateData = (email, password) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/.test(password);
    const isName = /^[a-zA-Z\\s]*$/;

    if (!isEmailValid) return "Email Id is not valid.";
    if (!isPasswordValid) return "Password Id is not valid.";
    if (!isName) return "Name is not valid.";

    return null;
}
module.exports = checkValidateData;