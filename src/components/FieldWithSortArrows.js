import React from 'react';
import { useState, useEffect } from 'react';
const FieldWithSortArrows = ({ field, onSortChange }) => {
    const [sortOrder, setSortOrder] = useState('up'); // 'up' or 'down'

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'up' ? 'down' : 'up';
        setSortOrder(newSortOrder);
        onSortChange(field, newSortOrder);
    };

    return (
        <div className="selected-field-with-arrows">
            {field}
            <button onClick={toggleSortOrder}>
                {sortOrder === 'up' ? '↑' : '↓'}
            </button>
        </div>
    );
};


export default  FieldWithSortArrows;