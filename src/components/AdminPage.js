import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { getAnnonces, addAnnonce, deleteAnnonce, updateAnnonce } from '../services/api';

const AdminPage = ({ user, handleLogout }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [annonces, setAnnonces] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentAnnonceId, setCurrentAnnonceId] = useState(null);

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
        if (editMode) {
            handleUpdateAnnonce(currentAnnonceId);
        } else {
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

    const handleEdit = (annonce) => {
        setTitle(annonce.titre);
        setDescription(annonce.description);
        setPrix(annonce.prix);
        setCurrentAnnonceId(annonce.id);
        setEditMode(true);
    };

    const handleUpdateAnnonce = async (id) => {
        try {
            await updateAnnonce(id, { titre: title, description, prix });
            alert('Annonce updated successfully');
            setTitle('');
            setDescription('');
            setPrix('');
            setEditMode(false);
            setCurrentAnnonceId(null);
            const response = await getAnnonces();
            setAnnonces(response.data.annonces); // Update the list of annonces
        } catch (error) {
            console.error('Failed to update annonce', error);
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
                <h2>{editMode ? 'Edit Annonce' : 'Add New Annonce'}</h2>
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
                    <button type="submit">{editMode ? 'Update Annonce' : 'Add Annonce'}</button>
                </form>
                <h2>All Annonces</h2>
                <table className="annonces-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Posted by</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {annonces.map((annonce) => (
                            <tr key={annonce.id}>
                                <td>{annonce.titre}</td>
                                <td>{annonce.description}</td>
                                <td>{annonce.prix}</td>
                                <td>{annonce.user.name}</td>
                                <td>
                                    <button onClick={() => handleEdit(annonce)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(annonce.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
