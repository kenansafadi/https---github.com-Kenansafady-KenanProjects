import React, { createContext, useContext, useState, useEffect } from 'react';
import businessService from '../../Services/BusinessServices';

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [businesses, setBusinesses] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const fetchBusinesses = async () => {
        setIsLoading(true);
        setFetchError(null);

        try {
            const data = await businessService.getAllCards();
            const updatedData = data.map((card) => ({
                ...card,
                likeCount: card.likeCount || 0,
            }));
            setBusinesses(updatedData);
            console.log('Fetched businesses:', updatedData);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinesses();

        // Load the favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (storedFavorites) {
            setFavorites(storedFavorites);
        }
    }, []);

    useEffect(() => {
        // Store the updated favorites in localStorage whenever it changes
        if (favorites.length > 0) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    const findCardById = (cardId) => businesses.find((card) => card._id === cardId);

    const toggleFavorite = async (cardId) => {
        const isFavorited = favorites.some((card) => card._id === cardId);
        const newLikeCount = await businessService.likeCard(cardId);

        setFavorites((prevFavorites) =>
            isFavorited
                ? prevFavorites.filter((card) => card._id !== cardId)
                : [...prevFavorites, findCardById(cardId)]
        );

        setBusinesses((prevBusinesses) =>
            prevBusinesses.map((business) =>
                business._id === cardId
                    ? { ...business, likeCount: newLikeCount, isFavorited: !isFavorited }
                    : business
            )
        );
    };

    // Add a new business
    const addBusiness = async (business) => {
        try {
            const newBusiness = await businessService.createCard(business);
            setBusinesses((prev) => [...prev, newBusiness]);
            return newBusiness;
        } catch (error) {
            console.error('Failed to add business:', error);
            setFetchError(error.message);
        }
    };

    // Edit an existing business
    const editBusiness = async (cardId, updatedData) => {
        try {
            const updatedBusiness = await businessService.updateCard(cardId, updatedData);
            setBusinesses((prev) =>
                prev.map((b) => (b._id === cardId ? updatedBusiness : b))
            );
            return updatedBusiness;
        } catch (error) {
            console.error('Failed to update business:', error);
            setFetchError(error.message);
        }
    };

    // Delete a business by ID
    const deleteBusiness = async (id) => {
        try {
            await businessService.deleteCard(id);
            setBusinesses((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
            setFetchError(err.message);
        }
    };

    return (
        <BusinessContext.Provider
            value={{
                businesses,
                favorites,
                addBusiness,
                editBusiness,
                deleteBusiness,
                toggleFavorite,
                fetchError,
                isLoading,
            }}
        >
            {isLoading ? (
                <div>Loading...</div>
            ) : fetchError ? (
                <div>Error: {fetchError}</div>
            ) : (
                children
            )}
        </BusinessContext.Provider>
    );
};

// Hook 
export const useBusiness = () => useContext(BusinessContext);
