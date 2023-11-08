import React from 'react';
import './../App.css';

const NewCard = ({ item, selectedFields }) => {
    return (
        <div className="card">
            {selectedFields.map(field => (
                <div key={field} className="card-field">
                    <strong>{field}:</strong> {item[field]}
                </div>
            ))}
        </div>
    );
};

export default NewCard;



