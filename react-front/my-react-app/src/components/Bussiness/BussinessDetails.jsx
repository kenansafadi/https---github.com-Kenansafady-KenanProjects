
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import businessService from '../../Services/BusinessServices';
import '../../Styles/CardDetails.scss';

const CardDetails = () => {
    const { cardId } = useParams(); // Get the cardId from the URL param
    const [card, setCard] = useState(null);

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const cardData = await businessService.getCardById(cardId);
                setCard(cardData);
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };

        fetchCardDetails();
    }, [cardId]);

    if (!card) {
        return <div>Loading...</div>;
    }

    const { city, street, houseNumber, country } = card.address;
    const address = `${houseNumber} ${street}, ${city}, ${country}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAP9Ux9gz6VMppA-rSOBMfTL9HfSWCHytM&q=${encodeURIComponent(address)}`;

    return (
        <div className="card-details">
            <h2>{card.title}</h2>
            <img src={card.image.url} alt={card.image.alt} />
            <h3>{card.subtitle}</h3>
            <p>{card.description}</p>
            <div className="card-contact">
                <p>Phone: {card.phone}</p>
                <p>Email: {card.email}</p>
                <p>Website:
                    {card.web ? (
                        <a href={card.web} target="_blank" rel="noopener noreferrer">
                            {card.web}
                        </a>
                    ) : (
                        'N/A' // Display 'N/A' if there's no website URL
                    )}
                </p>
            </div>
            <p className="card-address">Address: {address}</p>
            <div className="map-container">
                <h4>Location:</h4>
                <iframe
                    width="100%"
                    height="300"
                    frameBorder="0"
                    src={mapsEmbedUrl}
                    allowFullScreen>
                </iframe>
                <p>
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                </p>
            </div>
        </div>
    );
};

export default CardDetails;
