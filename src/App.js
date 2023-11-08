import applogo from './app-logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js';
import Search from './components/SearchPage.js';
import ResultsPage from './components/ResultsPage';
import SearchContext  from './components/SearchContext';
import React, { useState } from 'react';




function App() {
    const [queryTerm, setQueryTerm] = useState('');
      return (
          <Router>
              <SearchContext.Provider value={{ queryTerm, setQueryTerm }}>

              <Routes>
                  <Route path="/" element={<Home />} /> {/* Update this line */}
                  <Route path="/search" element={<Search />} />
                  <Route path="/results" element={<ResultsPage />} />
                  <Route path="results/:id" element={<ResultsPage />} />
              </Routes>
              </SearchContext.Provider>
          </Router>

      );
}

export default App;
