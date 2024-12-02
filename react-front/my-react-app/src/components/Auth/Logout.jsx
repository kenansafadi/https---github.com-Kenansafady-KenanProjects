import React, { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();


        navigate('/login');
    }, [logout, navigate]);

    return (
        <div>
            <h2>Logging out...</h2>

        </div>
    );
};

export default Logout;
