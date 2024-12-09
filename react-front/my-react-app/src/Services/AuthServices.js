
import { BASE_URL, getHeaders } from '../Utils/Api';
import { setToken, getToken, removeToken, isTokenExpired } from '../Utils/jwtHelper';
import { jwtDecode } from 'jwt-decode';

const LOGIN_URL = `${BASE_URL}/users/login`;
const REGISTER_URL = `${BASE_URL}/users`;
const USER_URL = `${BASE_URL}/users`;
const authService = {

    updateUser: async (profileData) => {
        const response = await fetch('/api/users/profile', { // Adjust URL accordingly
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }

        return response.json();
    },
    login: async (credentials) => {
        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials),
            });

            const textResponse = await response.text();
            console.log('Raw response:', textResponse);

            if (response.ok) {
                const token = textResponse;
                console.log('Token stored in local storage:', token);
                setToken('authToken', token);

                const decoded = jwtDecode(token);
                return { token, decoded };
            } else {
                throw new Error(textResponse || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (registrationData) => {
        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(registrationData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    getUserData: async () => {
        const token = getToken('authToken');
        if (!token) {
            console.error("No auth token found");
            throw new Error('No auth token found');
        }

        try {
            console.log('Sending request with token:', token);

            if (isTokenExpired(token)) {
                console.error("Token is expired");
                removeToken('authToken');
                throw new Error('Token expired. Please log in again.');
            }

            const decoded = jwtDecode(token);
            console.log('Decoded Token:', decoded);

            if (!decoded || !decoded._id) {
                console.error("Decoded token is missing _id:", decoded);
                throw new Error('Invalid token structure: missing essential fields');
            }

            const response = await fetch(`${USER_URL}/${decoded._id}`, {
                method: 'GET',
                headers: {
                    ...getHeaders(),
                    'x-auth-token': token,
                },
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error fetching profile data:", response.status, errorText);
                throw new Error(`Error fetching user data: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched User Data:", data);
            return data;
        } catch (error) {
            console.error("Error in getUserData:", error);
            throw error;
        }
    },

    logout: () => {
        removeToken('authToken');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

};

export default authService;
