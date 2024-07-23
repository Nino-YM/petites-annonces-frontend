import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { getAnnonces, addAnnonce, deleteAnnonce } from '../services/api';

const AdminPage = ({ user, handleLogout }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const response = await getAnnonces();
                setAnnonces(response.data.annonces);
            } catch (error) {
                console.error('Failed to fetch annonces', error);
            }
        };

        fetchAnnonces();
    }, []);

    const handleAddAnnonce = async (e) => {
        e.preventDefault();
        try {
            await addAnnonce({ titre: title, description, prix, user_id: user.id });
            alert('Annonce created successfully');
            setTitle('');
            setDescription('');
            setPrix('');
            const response = await getAnnonces();
            setAnnonces(response.data.annonces); // Update the list of annonces
        } catch (error) {
            console.error('Failed to create annonce', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAnnonce(id);
            alert('Annonce deleted successfully');
            const response = await getAnnonces();
            setAnnonces(response.data.annonces); // Update the list of annonces
        } catch (error) {
            console.error('Failed to delete annonce', error);
        }
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
                    <div className="input-group">
                        <label>Price</label>
                        <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
                    </div>
                    <button type="submit">Add Annonce</button>
                </form>
                <h2>All Annonces</h2>
                <ul>
                    {annonces.map((annonce) => (
                        <li key={annonce.id}>
                            <h2>{annonce.titre}</h2>
                            <p>{annonce.description}</p>
                            <p>Price: {annonce.prix}</p>
                            <p>Posted by: {annonce.user.name}</p>
                            <button onClick={() => handleDelete(annonce.id)}>Delete</button> {/* Delete button */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
