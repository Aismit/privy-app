import React, { useState } from 'react';
import './../SearchBar.css'; // Make sure to create a corresponding CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchContext  from './SearchContext';
import { useContext } from 'react';
const Redis = require('ioredis');
const redis = new Redis('rediss://:p94865365ee0f7ced4cfcfc7e6d54d97a9f043aaf4e72c3588044f0479b7e4d51@ec2-3-86-119-237.compute-1.amazonaws.com:12769');

function SearchBar({ setResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecommendations, setFilteredRecommendations] = useState([]);
    const navigate = useNavigate();
    const { setQueryTerm } = useContext(SearchContext);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // if (value) {
        //     const filtered = recommendations.filter(item =>
        //         item.toLowerCase().includes(value.toLowerCase())
        //     );
        //     setFilteredRecommendations(filtered);
        // } else {
        //     setFilteredRecommendations([]);
        // }
    };

    const handleSearch = async () => {
        if (!searchTerm) {
            return;
        }
        console.log('Searching for:', searchTerm);
        try {
            setQueryTerm(searchTerm);
            const cachedData = await redis.get(searchTerm);
            if (cachedData) {
                console.log('Data found in cache');
                const results = JSON.parse(cachedData);
                setResults(results);

                navigate('/results', { state: { results } });

            } else {
                const searchResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(searchTerm)}`);
                if (searchResponse.data.total > 0) {
                    const objectIDs = searchResponse.data.objectIDs;

                    const objectDetailsPromises = objectIDs.map(async (id) => {
                        try {
                            const objectResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                            return objectResponse.data;
                        } catch (error) {
                            console.error(`Failed to fetch object with ID ${id}:`, error);
                            return null
                        }
                    });


                    const temp_results = await Promise.all(objectDetailsPromises);
                    const results = temp_results.filter(result => result !== null)

                    await redis.setex(searchTerm, 3600, JSON.stringify(results));

                    console.log("hi")

                    setResults(results);

                    // Use React Router to navigate to the Results page with state
                    navigate('/results', { state: { results } });
                } else {
                    setResults([]);
                    navigate('/results', { state: { results: [] } });
                }
            }} catch (error) {
                console.error('Error fetching data from the API:', error);
            }



    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
}

export default SearchBar;