import React from 'react';

export const SearchContext = React.createContext({
    queryTerm: "",
    setQueryTerm: () => {},
});

export default SearchContext;