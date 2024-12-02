
import React from 'react';
import { useBusiness } from '../components/context/BussinessContext';
import FavBusinessCards from '../components/Bussiness/FavBussinesCards';
import '../Styles/Global.scss';
import UserPlus from '../components/common/UserPlus';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const navigate = useNavigate();
    const { favorites, onLikeClick } = useBusiness();
    console.log("Favorites array on render:", favorites);

    const handleImageClick = (businessId) => {
        navigate(`/card/${businessId}`);
    };

    return (
        <div className="favorites-container">
            <h1>Favorites</h1>
            {favorites.length > 0 ? (
                <div className="favorites-list">
                    {favorites.map((card) => (
                        <FavBusinessCards
                            key={card._id}
                            card={card}
                            onImageClick={() => handleImageClick(card._id)} // Pass the businessId to navigate
                            onLikeClick={onLikeClick}
                            favorites={favorites}
                        />
                    ))}
                </div>
            ) : (
                <p>No favorite business cards yet.</p>
            )}
            <UserPlus />
        </div>
    );
};

export default Favorites;

