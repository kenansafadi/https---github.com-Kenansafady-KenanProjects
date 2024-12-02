import { jwtDecode } from 'jwt-decode';

const setToken = (tokenKey, token) => {
    localStorage.setItem(tokenKey, token);
};

const getToken = (tokenKey) => {
    const token = localStorage.getItem(tokenKey);
    console.log('Retrieved token from local storage:', token); // Debug log
    return token;
};

const removeToken = (tokenKey) => {
    localStorage.removeItem(tokenKey);
};

const decodeToken = (token) => {
    if (!token) {
        console.error("No token provided for decoding");
        return null;
    }
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    if (!decoded) return true;
    return decoded.exp * 1000 < Date.now();
};

export { setToken, getToken, removeToken, decodeToken, isTokenExpired };
