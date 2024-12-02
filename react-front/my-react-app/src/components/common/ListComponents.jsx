
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListComponents = ({ card, onEditClick, handleDeleteClick }) => {
    console.log("Card prop:", card);

    const handleDelete = () => {
        if (!card) {
            console.error("Card is undefined.");
            return; // Exit if card is undefined
        }
        if (window.confirm('Are you sure you want to delete this business card?')) {
            handleDeleteClick(card._id);
        }
    };

    return (
        <div className="list-icons">
            <span className="phone-icon" aria-label="Call">
                <FontAwesomeIcon icon="phone" />
            </span>
            <span className="edit-icon" onClick={() => onEditClick(card._id)} aria-label="Edit">
                <FontAwesomeIcon icon={faEdit} />
            </span>
            <span className="delete-icon" onClick={handleDelete} aria-label="Delete">
                <FontAwesomeIcon icon={faTrash} />
            </span>
            <span className="like-icon" aria-label="Like">
            </span>
        </div>
    );
};
export default ListComponents;