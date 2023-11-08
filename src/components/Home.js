import React from 'react';
import './../App.css';
import { Link } from 'react-router-dom';
import applogo from './../app-logo.png';



const Home = () => {
  return (
      <div className="App">
        <header className="App-header">
          <img src={applogo}  alt="logo" />
            <Link to="/search">Click here to begin searching!</Link> {/* Link to the Search component */}
        </header>
      </div>
  );
};

export default Home;
