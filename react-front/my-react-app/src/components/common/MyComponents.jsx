

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart, faPhone as fasPhone } from '@fortawesome/free-solid-svg-icons';

import { useBusiness } from '../context/BussinessContext';

const MyComponent = ({ business, phoneNumber }) => {
    const [isCalled, setIsCalled] = useState(false);
    const { toggleFavorite, favorites } = useBusiness();
    const [isFavorited, setIsFavorited] = useState(favorites.some(card => card._id === business._id));



    const handleLikeClick = async () => {


        const newLikeCount = await toggleFavorite(business._id);
        console.log("Updated like count:", newLikeCount);


        setIsFavorited(prev => !prev);
    };


    const handlePhoneClick = () => {
        window.location.href = `tel:${phoneNumber}`;
        setIsCalled(!isCalled);
    };


    return (
        <div className="card-icons">
            <span className="like-icon" onClick={handleLikeClick} aria-label="Like">
                <FontAwesomeIcon
                    icon={isFavorited ? fasHeart : farHeart}
                    style={{ color: isFavorited ? 'red' : '#1a1818' }}
                />
            </span>
            <span className="phone-icon" onClick={handlePhoneClick} aria-label="Call" style={{ color: isCalled ? '#90ee90' : 'black' }}>
                <FontAwesomeIcon icon={fasPhone} />

            </span>


        </div>

    );
};

export default MyComponent;

