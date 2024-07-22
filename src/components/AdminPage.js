// AdminPage.js
import React, { useState } from 'react';
import './AdminPage.css';

const AdminPage = ({ user, handleLogout }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddAnnonce = async (e) => {
        e.preventDefault();
        // Implement the logic to add an annonce here
    };

    return (
        <div className="admin-page">
            <nav className="navbar">
                <div className="navbar-brand">Admin - Petites Annonces</div>
                <div className="navbar-user">
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>
            <div className="admin-content">
                <h2>Add New Annonce</h2>
                <form onSubmit={handleAddAnnonce} className="admin-form">
                    <div className="input-group">
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <button type="submit">Add Annonce</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
