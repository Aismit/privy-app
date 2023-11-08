// SearchPage.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';

const SearchPage = () => {
    const [results, setResults] = useState([]);

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '10vh' // Use the full height of the viewport
            }}>
                <h1>Search Page</h1>
            </div>
            <SearchBar setResults={setResults} />
        </div>
    );
};

export default SearchPage;