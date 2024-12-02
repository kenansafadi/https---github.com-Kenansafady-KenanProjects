import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/AuthServices';
import '../../Styles/register.scss'
function Register() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState({ url: '', alt: '' });
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState('');
    const [isBusiness] = useState(true); // Assuming this is constant
    const [registerError, setRegisterError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const registrationData = {
            name: {
                first: firstName,
                middle: middleName,
                last: lastName,
            },
            phone,
            email,
            password,
            image,
            address: {
                state,
                country,
                city,
                street,
                houseNumber: Number(houseNumber),
                zip: Number(zip),
            },
            isBusiness,
        };

        try {
            console.log('Registration Data:', registrationData);

            await authService.register(registrationData);
            navigate('/login');
        } catch (error) {
            setRegisterError(error.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label id="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="middleName">Middle Name</label>
                    <input
                        type="text"
                        id="middleName"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />
                </div>
                <div>
                    <label id="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={image.url}
                        onChange={(e) => setImage({ ...image, url: e.target.value })}
                    />
                </div>
                <div>
                    <label id="imageAlt">Image Alt Text</label>
                    <input
                        type="text"
                        id="imageAlt"
                        value={image.alt}
                        onChange={(e) => setImage({ ...image, alt: e.target.value })}
                    />
                </div>
                <div>
                    <label id="state">State</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="houseNumber">House Number</label>
                    <input
                        type="number"
                        id="houseNumber"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label id="zip">ZIP</label>
                    <input
                        type="number"
                        id="zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
        </div>
    );
}

export default Register;
