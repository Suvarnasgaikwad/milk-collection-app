// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you'll add some CSS for styling

const Header = () => {
  return (
    <header>
      <h1>Milk Collection System</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/farmers">Registration</Link></li>
          <li><Link to="/farmerslist">Farmer List</Link></li>
          <li><Link to="/add-milk-collection">Add Milk Collection </Link></li>
          <li><Link to="/view-collections">View Collections</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/setting">Settings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


