import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import authService from '../../Services/AuthServices';

function EditProfile() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(user || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [invalidFields, setInvalidFields] = useState({});

    // Redirect if not authenticated
    if (!isAuthenticated) {
        navigate('/login');
        return null; // Return null to prevent further rendering
    }

    // Validation function
    const validateProfile = (profile) => {
        const requiredFields = [
            { name: 'First Name', value: profile.name?.first },
            { name: 'Last Name', value: profile.name?.last },
            { name: 'Phone', value: profile.phone },
            { name: 'Profile Image URL', value: profile.image?.url },
            { name: 'Street', value: profile.address?.street },
            { name: 'City', value: profile.address?.city },
            { name: 'Country', value: profile.address?.country },
            { name: 'House Number', value: profile.address?.houseNumber },
            { name: 'Zip Code', value: profile.address?.zip }
        ];

        const newInvalidFields = {};

        requiredFields.forEach(field => {
            if (!field.value || typeof field.value !== 'string' || field.value.trim().length === 0) {
                newInvalidFields[field.name] = true;
            }
        });

        setInvalidFields(newInvalidFields);

        // Return false if there are any invalid fields
        return Object.keys(newInvalidFields).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateProfile(profile)) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            await authService.updateUser(profile);
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('An error occurred while updating your profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={profile.name?.first || ''}
                        onChange={(e) => setProfile({ ...profile, name: { ...profile.name, first: e.target.value } })}
                        className={invalidFields['First Name'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>Middle Name:</label>
                    <input
                        type="text"
                        value={profile.name?.middle || ''}
                        onChange={(e) => setProfile({ ...profile, name: { ...profile.name, middle: e.target.value } })}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={profile.name?.last || ''}
                        onChange={(e) => setProfile({ ...profile, name: { ...profile.name, last: e.target.value } })}
                        className={invalidFields['Last Name'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={profile.phone || ''}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className={invalidFields['Phone'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>Profile Image URL:</label>
                    <input
                        type="text"
                        value={profile.image?.url || ''}
                        onChange={(e) => setProfile({ ...profile, image: { ...profile.image, url: e.target.value } })}
                        className={invalidFields['Profile Image URL'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>Image Alt Text:</label>
                    <input
                        type="text"
                        value={profile.image?.alt || ''}
                        onChange={(e) => setProfile({ ...profile, image: { ...profile.image, alt: e.target.value } })}
                    />
                </div>
                <div>
                    <label>Street Address:</label>
                    <input
                        type="text"
                        value={profile.address?.street || ''}
                        onChange={(e) => setProfile({ ...profile, address: { ...profile.address, street: e.target.value } })}
                        className={invalidFields['Street'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>House Number:</label>
                    <input
                        type="text"
                        value={profile.address?.houseNumber || ''}
                        onChange={(e) => setProfile({ ...profile, address: { ...profile.address, houseNumber: e.target.value } })}
                        className={invalidFields['House Number'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        value={profile.address?.city || ''}
                        onChange={(e) => setProfile({ ...profile, address: { ...profile.address, city: e.target.value } })}
                        className={invalidFields['City'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        value={profile.address?.state || ''}
                        onChange={(e) => setProfile({ ...profile, address: { ...profile.address, state: e.target.value } })}
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        value={profile.address?.country || ''}
                        onChange={(e) => setProfile({ ...profile, address: { ...profile.address, country: e.target.value } })}
                        className={invalidFields['Country'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        value={profile.address?.zip || ''}
                        onChange={(e) => setProfile({ ...profile, address: { ...profile.address, zip: e.target.value } })}
                        className={invalidFields['Zip Code'] ? 'field-error' : ''}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProfile;
