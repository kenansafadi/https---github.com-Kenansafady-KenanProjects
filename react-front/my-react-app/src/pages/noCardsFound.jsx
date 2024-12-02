import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import { NavLink } from 'react-router-dom';
import '../Styles/Global.scss'
const NoCardsFound = () => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated !== null) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="no-cards-found">
            <h2>No Cards Found</h2>
            <p>It seems there are no business cards available. Register to create one.</p>
            <NavLink to="/register">Go to Registration</NavLink>
        </div>
    );
};

export default NoCardsFound;
