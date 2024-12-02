// import React, { createContext, useContext, useState, useEffect } from 'react';
// import authService from '../../Services/AuthServices';

// export const AuthContext = createContext(); // Ensure this is exported

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [authError, setAuthError] = useState(null);

//     useEffect(() => {
//         const checkAuthStatus = () => {
//             const isLoggedIn = authService.isAuthenticated();
//             console.log("Is logged in:", isLoggedIn); // Check the status

//             setIsAuthenticated(isLoggedIn);
//         };
//         checkAuthStatus();
//     }, []);

//     // const login = async (credentials) => {
//     //     try {
//     //         setAuthError(null);
//     //         await authService.login(credentials);

//     //         setIsAuthenticated(true);
//     //     } catch (error) {
//     //         console.error('Login failed:', error);
//     //         setAuthError(error.message || 'Login failed');
//     //     }
//     // };
//     const login = async (credentials) => {
//         try {
//             setAuthError(null);
//             await authService.login(credentials);
//             const isLoggedIn = authService.isAuthenticated();
//             setIsAuthenticated(isLoggedIn); // Manually re-check the login status
//         } catch (error) {
//             console.error('Login failed:', error);
//             setAuthError(error.message || 'Login failed');
//         }
//     };

//     const logout = () => {
//         authService.logout();
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout, authError }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Ensure the useAuth hook is also correctly exported
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };
// AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import authService from '../../Services/AuthServices';

// export const AuthContext = createContext();  // Create the context

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);  // State for authentication

//     // Check if the user is authenticated on initial load
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const loggedIn = token && authService.isAuthenticated();
//         setIsAuthenticated(loggedIn);
//     }, []);

//     // Handle login and logout within the provider
//     const login = async (credentials) => {
//         try {
//             const { token } = await authService.login(credentials);  // Assuming login returns a token
//             console.log('Logged in successfully:', token);
//             localStorage.setItem('token', token);  // Store token in localStorage

//             // Set authentication state
//             setIsAuthenticated(true);  // Set user as authenticated
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');  // Remove token from localStorage
//         setIsAuthenticated(false);  // Set user as logged out
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to access the AuthContext
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import authService from '../../Services/AuthServices';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);  // Start with false

//     // Check if the user is authenticated on initial load
//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             const token = localStorage.getItem('token');
//             if (token && await authService.isAuthenticated()) {
//                 setIsAuthenticated(true);  // Set user as authenticated if token is valid
//             } else {
//                 setIsAuthenticated(false);  // Set user as not authenticated if token doesn't exist or is invalid
//             }
//         };
//         checkAuthStatus();  // Call the async function to check authentication status
//     }, []);  // Only run on component mount
//     console.log("Is Authenticated:", isAuthenticated);

//     // Handle login within the provider
//     const login = async (credentials) => {
//         try {
//             const { token } = await authService.login(credentials);
//             localStorage.setItem('token', token);  // Store token in localStorage
//             setIsAuthenticated(true);  // Set user as authenticated
//         } catch (error) {
//             console.error('Login failed:', error);  // Log the error

//             setIsAuthenticated(false);  // Handle login failure
//         }
//     };

//     // Handle logout within the provider
//     const logout = () => {
//         localStorage.removeItem('token');  // Remove token from localStorage
//         authService.logout();  // Log out in authService (optional, if needed)
//         setIsAuthenticated(false);  // Explicitly set to false
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };import React, { createContext, useContext, useState, useEffect } from 'react';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import authService from '../../Services/AuthServices';
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true); // Add loading state

//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             setLoading(true);
//             try {
//                 const token = localStorage.getItem('authToken');
//                 if (token && await authService.isAuthenticated()) {
//                     const userData = await authService.getUserData();
//                     setUser(userData);
//                     setIsAuthenticated(true);
//                     console.log('User data fetched successfully:', userData); // Debug log
//                 } else {
//                     setIsAuthenticated(false);
//                     setUser(null);
//                 }
//             } catch (error) {
//                 // Do not log errors or show them if not authenticated
//                 if (error.message !== 'No auth token found' && error.message !== 'Token expired. Please log in again.') {
//                     console.error('Error fetching user data:', error);
//                 }
//                 setIsAuthenticated(false);
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuthStatus(); // Run the initial check
//     }, []); // Empty dependency array to run only once when the component mounts

//     const login = async (credentials) => {
//         try {
//             const data = await authService.login(credentials);
//             localStorage.setItem('authToken', data.token);
//             setIsAuthenticated(true);
//             setUser(data.user);
//         } catch (error) {
//             if (error.message.includes('Unauthorized')) {
//                 localStorage.removeItem('authToken');
//                 setIsAuthenticated(false);
//                 setUser(null);
//             }
//             console.error('Login error:', error.message);
//         }
//     };


//     const logout = () => {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('create_card_token'); // Optional: remove any extra tokens
//         authService.logout();
//         setIsAuthenticated(false);
//         setUser(null);
//     };

//     if (loading) return <div>Loading...</div>; // Display loading while checking authentication

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../../Services/AuthServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

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
                // Do not log errors or show them if not authenticated
                if (error.message !== 'No auth token found' && error.message !== 'Token expired. Please log in again.') {
                    console.error('Error fetching user data:', error);
                }
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus(); // Run the initial check
    }, []); // Empty dependency array to run only once when the component mounts

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
    };

    if (loading) return <div>Loading...</div>; // Display loading while checking authentication

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
