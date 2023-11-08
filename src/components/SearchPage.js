// SearchPage.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';

const SearchPage = () => {
    const [results, setResults] = useState([]);

    return (
        <div>
            <h1>Search Page</h1>
            <SearchBar setResults={setResults} />
        </div>
    );
};

export default SearchPage;