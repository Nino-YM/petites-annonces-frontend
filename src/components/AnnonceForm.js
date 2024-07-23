import React, { useState } from 'react';
import { addAnnonce } from '../services/api';

const AnnonceForm = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAnnonce({ titre, description, prix });
            alert('Annonce created successfully');
            // Optionally, clear the form fields
            setTitre('');
            setDescription('');
            setPrix('');
        } catch (error) {
            console.error('Failed to create annonce', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
            </div>
            <button type="submit">Add Annonce</button>
        </form>
    );
};

export default AnnonceForm;
