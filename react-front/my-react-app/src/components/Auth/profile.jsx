import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Correct import
import authService from '../../Services/AuthServices';

function Profile() {
    const { user, isAuthenticated } = useContext(AuthContext); // Destructure user from context
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }

            try {
                const userData = user || await authService.getUserData(); // Use context user or fetch from API
                console.log('Fetched User Data:', userData); // Debug log
                setProfile(userData); // Set profile data
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('An error occurred while fetching profile data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile(); // Fetch profile data when component mounts
    }, [isAuthenticated, user]); // Re-fetch if isAuthenticated or user changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; // Show error if any
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile</h2>
                <p>Name: {`${profile.name?.first || 'N/A'} ${profile.name?.middle || ''} ${profile.name?.last || 'N/A'}`}</p>
                <p>Email: {profile.email || 'N/A'}</p>
                <p>Phone: {profile.phone || 'N/A'}</p>
                <p>Auth Level: {profile.isBusiness ? 'Business' : 'Regular'}</p>
                <p>Address: {`${profile.address?.houseNumber || ''} ${profile.address?.street || 'N/A'}, ${profile.address?.city || 'N/A'}, ${profile.address?.country || 'N/A'}`}</p>

                <div className="map">
                    <iframe
                        title="user-location"
                        src={`https://www.google.com/maps?q=${profile.address?.city || ''},${profile.address?.country || ''}&output=embed`}
                        width="100%"
                        height="300"
                    />
                </div>
                <button onClick={() => navigate('/edit-profile')}>Edit</button>
            </div>
        </div>
    );
}

export default Profile;
