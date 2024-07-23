import React, { useEffect, useState } from 'react';
import { getAnnonces, addAnnonce } from '../services/api';
import './HomePage.css';

const HomePage = ({ user, handleLogout }) => {
    const [annonces, setAnnonces] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAnnonce({ titre: title, description, prix, user_id: user.id });
            alert('Annonce created successfully');
            setTitle('');
            setDescription('');
            setPrix('');
            const response = await getAnnonces();
            setAnnonces(response.data.annonces);
        } catch (error) {
            console.error('Failed to create annonce', error);
        }
    };

    return (
        <div className="home-page">
            <div className="home-content">
                <h2>Add New Annonce</h2>
                <form onSubmit={handleSubmit} className="annonce-form">
                    <div className="input-group">
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
