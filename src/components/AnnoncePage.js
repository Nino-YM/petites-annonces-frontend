// AnnoncePage.js
import React from 'react';
import './AnnoncePage.css';

const AnnoncePage = ({ user, handleLogout }) => (
    <div className="annonce-page">
        <nav className="navbar">
            <div className="navbar-brand">Petites Annonces</div>
            <div className="navbar-user">
                <span>Welcome, {user.name}</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
        {/* Add your annonce listing or other content here */}
    </div>
);

export default AnnoncePage;
