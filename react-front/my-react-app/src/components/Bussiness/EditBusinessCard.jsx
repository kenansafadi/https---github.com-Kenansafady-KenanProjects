
import React, { useState } from 'react';
import { useBusiness } from '../context/BussinessContext';
import '../../Styles/NewBusinessCard.scss'
const EditBusinessCard = ({ business, onClose }) => {
    const { editBusiness } = useBusiness();
    const [formData, setFormData] = useState({ ...business });
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

        // Prepare the requestData object based on the relevant fields
        const requestData = {
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            phone: formData.phone,
            email: formData.email,
            web: formData.web || '', // Optional field
            image: {
                url: formData.imageUrl || '', // Optional field
                alt: formData.imageAlt || '', // Optional field
            },
            address: {
                state: formData.state || '', // Optional field
                country: formData.country,
                city: formData.city,
                street: formData.street,
                houseNumber: formData.houseNumber,
                zip: formData.zip,
            },
        };

        try {
            await editBusiness(business._id, requestData); // Pass business ID and new data
            onClose(); // Close modal after successful submission
        } catch (error) {
            console.error('Error updating business:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="form-modal" onSubmit={handleSubmit}>
            <h2>Edit Business Card</h2>
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
            <div className="button-container">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update'}
                </button>
                <button type="button" onClick={onClose}>Cancel</button>

            </div>

        </form>
    );
};

export default EditBusinessCard;
