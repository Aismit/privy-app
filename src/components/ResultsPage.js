import React from 'react';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FieldWithSortArrows from './FieldWithSortArrows';
import SearchContext  from './SearchContext';
import Card from './Card';
import { useNavigate } from 'react-router-dom';


const sortResults = (results, selectedFields, sortOrders) => {
    return [...results].sort((a, b) => {
        for (let field of selectedFields) {
            if (!(field in a) || !(field in b)) continue;

            // If it's a number, perform a numeric sort
            if (!isNaN(Number(a[field])) && !isNaN(Number(b[field]))) {
                if (a[field] - b[field] !== 0) {
                    return sortOrders[field] === 'up' ? a[field] - b[field] : b[field] - a[field];
                }
            }
            // Else perform a string sort
            else {
                if (a[field].toLowerCase() !== b[field].toLowerCase()) {
                    return sortOrders[field] === 'up'
                        ? a[field].localeCompare(b[field])
                        : b[field].localeCompare(a[field]);
                }
            }
        }
        // If all selected fields are equal, leave the order unchanged
        return 0;
    });
};



const ResultsPage = () => {
    const location = useLocation();
    const { results } = location.state || { results: [] };
    const [selectedFields, setSelectedFields] = useState([]);
    const [initialFieldsState, setInitialFieldsState] = useState({});
    const [sortOrders, setSortOrders] = useState({});
    const [displayLimit, setDisplayLimit] = useState(results.length);
    const { queryTerm } = useContext(SearchContext);
    const navigate = useNavigate();
    const goToSearchPage = () => {
        navigate('/search');
    };
    useEffect(() => {
        if (results.length > 0) {
            const referenceItem = results[0];
            const fieldsState = Object.keys(referenceItem).reduce((fields, field) => {
                fields[field] = false;
                return fields;
            }, {});
            setInitialFieldsState(fieldsState);
        }
    }, [results]);

    const handleFieldChange = (fieldName, isChecked) => {
        setSelectedFields((prevSelectedFields) => {
            if (isChecked) {
                // Add field to the array
                return [...prevSelectedFields, fieldName];
            } else {
                // Remove field from the array
                return prevSelectedFields.filter((field) => field !== fieldName);
            }
        });
    };

    const handleSortChange = (fieldName, newSortOrder) => {
        setSortOrders({ ...sortOrders, [fieldName]: newSortOrder });
    };

    const sortedResults = sortResults(results, selectedFields, sortOrders);

    const handleDisplayLimitChange = (event) => {
        const value = event.target.value;
        setDisplayLimit(value === '' ? results.length : Math.max(0, parseInt(value, 10)));
    };

    console.log(queryTerm);



    return (
        <div>
            <h1>Search Results</h1>
            <button onClick={goToSearchPage}>Back to Search</button>
            <div className="field-selection">
                {Object.keys(initialFieldsState).map((field) => (
                    <label key={field}>
                        <input
                            type="checkbox"
                            checked={selectedFields.includes(field)}
                            onChange={(e) => handleFieldChange(field, e.target.checked)}
                        />
                        {field}
                    </label>
                ))}
            </div>
            <br/>
            <div className="display-limit-input">
                <label>
                    Number of results to display:
                    <input
                        type="number"
                        value={displayLimit}
                        onChange={handleDisplayLimitChange}
                        min="0"
                        max={results.length}
                    />
                </label>
            </div>
            <br/>
            <div className="selected-fields-list">
                {selectedFields.map((field, index) => (
                    <FieldWithSortArrows
                        key={index}
                        field={field}
                        onSortChange={handleSortChange}
                    />
                ))}
            </div>
            {sortedResults.length > 0 ? (
                <div>
                    {sortedResults.slice(0, displayLimit).map((item, index) => (
                        <Card key={index} item={item} selectedFields={selectedFields} />
                    ))}
                </div>
                // <ul>
                //     {sortedResults.slice(0, displayLimit).map((item, index) => (
                //         <li key={index}>
                //             {selectedFields.map(
                //                 (field) => item[field] && <p key={field}>{item[field]}</p>
                //             )}
                //         </li>
                //     ))}
                // </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default ResultsPage;