
import { getHeaders, BASE_URL } from '../Utils/Api';
import { getToken, removeToken } from '../Utils/jwtHelper';

const BASE_CARD_URL = `${BASE_URL}/cards`;
const MY_CARDS_TOKEN_KEY = 'authToken';
const CREATE_CARD_TOKEN_KEY = 'create_card_token';

const businessService = {
    getAllCards: async () => {
        try {
            const response = await fetch(`${BASE_CARD_URL}`, {
                method: 'GET',
                headers: getHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch cards');
            return await response.json();
        } catch (error) {
            console.error('Error fetching all cards:', error);
            throw error;
        }
    },


    getCardById: async (cardId) => {
        try {
            const response = await fetch(`${BASE_CARD_URL}/${cardId}`, {
                method: 'GET',
                headers: getHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch card');
            return await response.json();
        } catch (error) {
            console.error(`Error fetching card with ID ${cardId}:`, error);
            throw error;
        }
    },

    getMyCards: async () => {
        const token = getToken(MY_CARDS_TOKEN_KEY);
        try {
            const response = await fetch(`${BASE_CARD_URL}/my-cards`, {
                method: 'GET',
                headers: {
                    ...getHeaders(),
                    'x-auth-token': token,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch my cards');
            return await response.json();
        } catch (error) {
            console.error('Error fetching my cards:', error);
            throw error;
        }
    },



    likeCard: async (cardId) => {
        const token = getToken(MY_CARDS_TOKEN_KEY);
        console.log('Retrieved token:', token);

        try {
            const response = await fetch(`${BASE_CARD_URL}/${cardId}`, {
                method: 'PATCH',
                headers: {
                    ...getHeaders(true),
                    'x-auth-token': token,
                },
            });

            console.log('Response status:', response.status, 'Response body:', await response.clone().text()); // Log the full response

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Error response:', errorBody);
                throw new Error('Failed to like/unlike card');
            }

            const updatedCard = await response.json();
            console.log('Updated card data:', updatedCard);
            return updatedCard.likes.length;
        } catch (error) {
            console.error(`Error liking/unliking card with ID ${cardId}:`, error);
            throw error;
        }
    },



    updateCard: async (cardId, cardData) => {
        const token = getToken(MY_CARDS_TOKEN_KEY);
        try {
            const response = await fetch(`${BASE_CARD_URL}/${cardId}`, {
                method: 'PUT',
                headers: {
                    ...getHeaders(true),
                    'x-auth-token': token,
                },
                body: JSON.stringify(cardData),
            });
            if (!response.ok) throw new Error('Failed to update card');
            return await response.json();
        } catch (error) {
            console.error(`Error updating card with ID ${cardId}:`, error);
            throw error;
        }
    },
    createCard: async (cardData) => {
        const token = localStorage.getItem('create_card_token');
        console.log('Retrieved token from local storage:', token);

        if (!token) {
            console.error('No token found. Please log in again.');
            throw new Error('No token found. Please log in again.');
        }

        try {
            const response = await fetch(BASE_CARD_URL, {
                method: 'POST',
                headers: {
                    ...getHeaders(),
                    'x-auth-token': token,
                },
                body: JSON.stringify(cardData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const newCard = await response.json();
            return newCard;
        } catch (error) {
            console.error('Error creating card:', error.message);
            throw error;
        }
    },


    updateBizNumber: async (cardId, newBizNumber) => {
        const token = getToken(MY_CARDS_TOKEN_KEY);
        try {
            const response = await fetch(`${BASE_CARD_URL}/${cardId}/biz-number`, {
                method: 'PATCH',
                headers: {
                    ...getHeaders(true),
                    'x-auth-token': token,
                },
                body: JSON.stringify({ bizNumber: newBizNumber }),
            });
            if (!response.ok) throw new Error('Failed to update business number');
            return await response.json();
        } catch (error) {
            console.error(`Error updating biz number for card with ID ${cardId}:`, error);
            throw error;
        }
    },

    deleteCard: async (cardId) => {
        const token = getToken(MY_CARDS_TOKEN_KEY);
        try {
            const response = await fetch(`${BASE_CARD_URL}/${cardId}`, {
                method: 'DELETE',
                headers: {
                    ...getHeaders(true),
                    'x-auth-token': token,
                },
            });
            if (!response.ok) throw new Error('Failed to delete card');
            return await response.json();
        } catch (error) {
            console.error(`Error deleting card with ID ${cardId}:`, error);
            throw error;
        }
    },

    removeCardToken: () => {
        removeToken(CREATE_CARD_TOKEN_KEY);
    },
};

export default businessService;
