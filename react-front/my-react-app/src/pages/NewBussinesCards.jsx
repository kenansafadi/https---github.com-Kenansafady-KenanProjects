

import React, { useState } from 'react';
import { useBusiness } from '../components/context/BussinessContext';
import '../Styles/NewBusinessCard.scss';
const NewBusinessCard = ({ closeForm }) => {
    const { addBusiness } = useBusiness();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        imageUrl: '',
        imageAlt: '',
        city: '',
        country: '',
        state: '',
        street: '',
        houseNumber: '',
        zip: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});


    const validateForm = () => {
        const errors = {};
        if (!formData.title) errors.title = 'Title is required';
        if (!formData.subtitle) errors.subtitle = 'Subtitle is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.phone) errors.phone = 'Phone is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.city) errors.city = 'City is required';
        if (!formData.country) errors.country = 'Country is required';
        if (!formData.street || formData.street.length < 2) {
            errors.street = 'Street must be at least 2 characters long';
        }
        if (!formData.houseNumber) errors.houseNumber = 'House Number is required';
        if (!formData.zip) errors.zip = 'Zip code is required';
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);

        const requestData = {
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            phone: formData.phone,
            email: formData.email,
            web: formData.web || '',
            image: {
                url: formData.imageUrl || '',
                alt: formData.imageAlt || '',
            },
            address: {
                state: formData.state || '',
                country: formData.country,
                city: formData.city,
                street: formData.street,
                houseNumber: formData.houseNumber,
                zip: formData.zip,
            },
        };

        try {
            const newBusiness = await addBusiness(requestData);
            console.log('Response from addBusiness:', newBusiness);


            setFormData({
                title: '',
                subtitle: '',
                description: '',
                phone: '',
                email: '',
                web: '',
                imageUrl: '',
                imageAlt: '',
                city: '',
                country: '',
                state: '',
                street: '',
                houseNumber: '',
                zip: '',
            });
            setFormErrors({});
            closeForm();
        } catch (error) {
            console.error('Error creating card:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Business Card</h2>
            <label>
                Title*:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
                {formErrors.title && <span className="error">{formErrors.title}</span>}
            </label>
            <label>
                Subtitle*:
                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} />
                {formErrors.subtitle && <span className="error">{formErrors.subtitle}</span>}
            </label>
            <label>
                Description*:
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                {formErrors.description && <span className="error">{formErrors.description}</span>}
            </label>
            <label>
                Phone*:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                {formErrors.phone && <span className="error">{formErrors.phone}</span>}
            </label>
            <label>
                Email*:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
            </label>
            <label>
                Web:
                <input type="url" name="web" value={formData.web} onChange={handleChange} />
            </label>
            <label>
                Image Url:
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
            </label>
            <label>
                Image Alt:
                <input type="text" name="imageAlt" value={formData.imageAlt} onChange={handleChange} />
            </label>
            <label>
                City*:
                <input type="text" name="city" value={formData.city} onChange={handleChange} />
                {formErrors.city && <span className="error">{formErrors.city}</span>}
            </label>
            <label>
                Country*:
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
                {formErrors.country && <span className="error">{formErrors.country}</span>}
            </label>
            <label>
                State:
                <input type="text" name="state" value={formData.state} onChange={handleChange} />
            </label>
            <label>
                Street*:
                <input type="text" name="street" value={formData.street} onChange={handleChange} />
                {formErrors.street && <span className="error">{formErrors.street}</span>}
            </label>
            <label>
                House Number*:
                <input type="number" name="houseNumber" value={formData.houseNumber} onChange={handleChange} />
                {formErrors.houseNumber && <span className="error">{formErrors.houseNumber}</span>}
            </label>
            <label>
                Zip*:
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
                {formErrors.zip && <span className="error">{formErrors.zip}</span>}
            </label>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={closeForm}>
                Close
            </button>
        </form>
    );
};

export default NewBusinessCard;