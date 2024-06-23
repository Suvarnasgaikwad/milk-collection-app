// src/components/SearchBar.js
import React, { useState } from 'react';


const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 2) { // Fetch data if query length is greater than 2
            try {
                const response = await fetch(`http://localhost:8080/farmers/search?query=${value}`);
                const data = await response.json();
                setOptions(data);
            } catch (error) {
                console.error('Error fetching farmers:', error);
            }
        } else {
            setOptions([]);
        }
    };

    const handleOptionClick = (option) => {
        setQuery(option.name);
        setOptions([]);
        onSearch(option.name);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search farmers..."
            />
            {options.length > 0 && (
                <ul>
                    {options.map((option) => (
                        <li key={option.id} onClick={() => handleOptionClick(option)}>
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
