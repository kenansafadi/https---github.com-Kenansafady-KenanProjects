import React from 'react';
import { useBusiness } from '../context/BussinessContext';

const DeleteBusinessCard = ({ card }) => {
    const { deleteBusiness } = useBusiness();

    const handleDelete = () => {
        if (!card) {
            console.error("Card is undefined.");
            return;
        }
        if (!card._id) {
            console.error("Card is missing _id.");
            return;
        }

        if (window.confirm('Are you sure you want to delete this business card?')) {
            deleteBusiness(card._id);
        }
    };


    return (
        <button onClick={handleDelete} className="delete-btn">
            Delete
        </button>
    );
};

export default DeleteBusinessCard;
