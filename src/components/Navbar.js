import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => (
    <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Petites Annonces</Link>
        </div>
        <div className="navbar-menu">
            {user ? (
                <>
                    <span className="navbar-item">Welcome, {user.name}</span>
                    <button className="navbar-item" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Link className="navbar-item" to="/login">Login</Link>
            )}
        </div>
    </nav>
);

export default Navbar;
