
import React from 'react';
import MyComponent from '../components/common/MyComponents';
import '../Styles/BusinessCards.scss';
import ListComponents from '../components/common/ListComponents';

const BusinessCard = ({ card, onImageClick, onLikeClick, favorites, isListPage, onEditClick, onDeleteClick }) => {
    return (
        <div className="business-card">
            <img
                src={card.image.url}
                alt={card.image.alt}
                className="card-image"
                onClick={() => onImageClick(card._id)}
            />
            <div className="card-info">
                <h2>{card.title}</h2>
                <h3>{card.subtitle}</h3>
                <p>{card.description}</p>
                <div className="card-icons">
                    <MyComponent
                        onLikeClick={onLikeClick}
                        business={{
                            ...card,
                            likeCount: card.likes.length || 0
                        }}
                        phoneNumber={card.phone}
                        isFavorited={favorites ? favorites.some(fav => fav._id === card._id) : false}
                    />
                    {isListPage && (
                        <ListComponents
                            card={card}
                            onEditClick={onEditClick}
                            handleDeleteClick={onDeleteClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
