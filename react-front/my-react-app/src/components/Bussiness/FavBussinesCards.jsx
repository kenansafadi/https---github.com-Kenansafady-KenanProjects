// FavBusinessCards.jsx
import React from "react";
// import MyComponent from "../common/MyComponents";
import { useBusiness } from "../context/BussinessContext";
import BusinessCard from "../../pages/MyBusinessCards";

const FavBusinessCards = ({ card, onImageClick }) => {
    const { toggleFavorite, favorites } = useBusiness();

    const handleLikeClick = async () => {
        console.log("Like button clicked for card ID:", card._id);
        await toggleFavorite(card._id); // Toggle favorite status
    };

    return (
        <div className="fav-business-card">
            <BusinessCard
                card={card}
                onImageClick={onImageClick}
                onLikeClick={handleLikeClick}
                favorites={favorites}
            />
        </div>
    );
};

export default FavBusinessCards;
