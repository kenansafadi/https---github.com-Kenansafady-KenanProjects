
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessCard from './MyBusinessCards';
import '../Styles/Global.scss';
import UserPlus from '../components/common/UserPlus';
import { useContext } from 'react';
import { BusinessContext } from '../components/context/BussinessContext';

const Home = ({ cards }) => {
    const navigate = useNavigate();
    const { toggleFavorite } = useContext(BusinessContext);


    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const handleImageClick = (cardId) => {
        navigate(`/card/${cardId}`);
    };

    const handleLikeClick = async (cardId) => {
        console.log("Like button clicked for card ID:", cardId);
        await toggleFavorite(cardId);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="home-container">
            {currentCards.length > 0 ? (
                currentCards.map((card) => (
                    <BusinessCard
                        key={card._id}
                        card={card}
                        onImageClick={handleImageClick}
                        onLikeClick={handleLikeClick}
                    />
                ))
            ) : (
                <p>No businesses available.</p>
            )}
            <div className="pagination-container">

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>

            <UserPlus />
        </div>
    );
};

export default Home;
