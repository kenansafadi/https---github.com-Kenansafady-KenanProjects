
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const useAuth = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);

    return { isAuthenticated, user, logout };
};

export default useAuth;
