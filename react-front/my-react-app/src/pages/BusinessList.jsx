
import React, { useEffect, useState } from 'react';
import BusinessCard from './MyBusinessCards';
import { useBusiness } from '../components/context/BussinessContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/BusinessCards.scss';
import { getToken } from '../Utils/jwtHelper';
import { jwtDecode } from 'jwt-decode';
import EditBusinessCard from '../components/Bussiness/EditBusinessCard';
import '../Styles/Global.scss';

const BusinessList = () => {
    const navigate = useNavigate();
    const { businesses, deleteBusiness } = useBusiness();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = getToken('authToken');
                if (!token) throw new Error('No token found');

                const decodedToken = jwtDecode(token);
                setCurrentUserId(decodedToken._id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserId();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const myBusinesses = businesses.filter(business => String(business.user_id) === String(currentUserId));

    const handleEditClick = (businessId) => {
        const business = myBusinesses.find((b) => b._id === businessId);
        setSelectedBusiness(business);
        setModalOpen(true);
    };

    const handleDeleteClick = async (businessId) => {
        try {
            await deleteBusiness(businessId);
        } catch (error) {
            console.error('Failed to delete business:', error);
        }
    };

    const handleImageClick = (businessId) => {
        navigate(`/card/${businessId}`);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedBusiness(null);
    };

    return (
        <div>
            <h2>Your Business Cards</h2>
            <div className="home-container">
                {myBusinesses.length > 0 ? (
                    myBusinesses.map((business) => (
                        <div key={business._id} className="business-card-container">
                            <BusinessCard
                                card={business}
                                onImageClick={() => handleImageClick(business._id)}
                                onLikeClick={(id) => console.log(`Liked business ${id}`)}
                                favorites={[]}
                                isListPage={true}
                                onEditClick={() => handleEditClick(business._id)}
                                onDeleteClick={handleDeleteClick}
                            />
                        </div>
                    ))
                ) : (
                    <p>No businesses created yet.</p>
                )}
            </div>
            {isModalOpen && selectedBusiness && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={closeModal}>Close</button>
                        <EditBusinessCard business={selectedBusiness} onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusinessList;
