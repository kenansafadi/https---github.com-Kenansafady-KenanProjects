
import { useState, useEffect } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import '../../Styles/NavBar.scss';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onSearch }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (query) => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.body.classList.toggle('dark-mode', newMode);
        localStorage.setItem('darkMode', newMode);
    };

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
        document.body.classList.toggle('dark-mode', savedMode);
    }, []);

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isNoCardsPage = location.pathname === '/no-cards-found';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBCardClick = () => {
        if (!isAuthenticated) {
            navigate('/no-cards-found');
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <NavLink
                        to={isAuthenticated ? "/" : "/no-cards-found"}
                        onClick={handleBCardClick}
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        B-Card
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => (isActive ? 'active-link' : '')}
                    >
                        About
                    </NavLink>
                </li>

                {isAuthenticated ? (
                    <>
                        <li>
                            <NavLink
                                to="/favourites"
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Favourites
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-business-cards"
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                My Cards
                            </NavLink>
                        </li>
                        <li className="search-bar-container">
                            <SearchBar onSearch={handleSearch} />
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                        <li>
                            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                <FontAwesomeIcon icon={faUser} />

                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                Register
                            </NavLink>
                        </li>
                    </>
                )}

                {!isNoCardsPage && !isLoginPage && !isRegisterPage && (
                    <li className="dark-mode-toggle">
                        <FontAwesomeIcon
                            icon={isDarkMode ? faSun : faMoon}
                            onClick={toggleDarkMode}
                        />
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
