// utils/validation.js

const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const isPasswordStrong = (password) => {
    return password.length >= 8;
};

const isRequired = (value) => {
    return value && value.trim() !== '';
};

export { isEmailValid, isPasswordStrong, isRequired };
