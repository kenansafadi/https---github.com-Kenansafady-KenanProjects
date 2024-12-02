// SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        console.log("Current input:", value); // Log the current input
        onSearch(value);
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            className="search-input"
        />
    );
};

export default SearchBar;
