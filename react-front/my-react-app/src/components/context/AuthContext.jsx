import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../../Services/AuthServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null); // New state for user profile
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                if (token && await authService.isAuthenticated()) {
                    const userData = await authService.getUserData();
                    setUser(userData);
                    setIsAuthenticated(true);
                    console.log('User data fetched successfully:', userData); // Debug log
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                if (error.message !== 'No auth token found' && error.message !== 'Token expired. Please log in again.') {
                    console.error('Error fetching user data:', error);
                }
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const userData = await authService.getUserData(); // Assuming this fetches user profile
                setProfile(userData); // Set profile state
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('An error occurred while fetching profile data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated && user) {
            fetchProfile(); // Fetch data only if authenticated
        }
    }, [isAuthenticated, user]);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            localStorage.setItem('authToken', data.token);
            setIsAuthenticated(true);
            setUser(data.user);
        } catch (error) {
            if (error.message.includes('Unauthorized')) {
                localStorage.removeItem('authToken');
                setIsAuthenticated(false);
                setUser(null);
            }
            console.error('Login error:', error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('create_card_token'); // Optional: remove any extra tokens
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        setProfile(null); // Clear profile data
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, profile, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
