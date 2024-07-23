import React, { useState, useEffect } from 'react';
import './AnnoncePage.css';
import { getAnnonces } from '../services/api';
import AnnonceForm from './AnnonceForm';

const AnnoncePage = ({ user, handleLogout }) => {
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

    return (
        <div className="annonce-page">
            <nav className="navbar">
                <div className="navbar-brand">Petites Annonces</div>
                <div className="navbar-user">
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>
            <AnnonceForm />
            <ul className="annonces-list">
                {annonces.map((annonce) => (
                    <li key={annonce.id} className="annonce-item">
                        <h3>{annonce.titre}</h3>
                        <p>{annonce.description}</p>
                        <p>Price: {annonce.prix}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnnoncePage;
