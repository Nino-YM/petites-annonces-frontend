import React, { useEffect, useState } from 'react';
import { getAnnonces, addAnnonce } from '../services/api';
import './HomePage.css';

const HomePage = ({ user, handleLogout }) => {
    const [annonces, setAnnonces] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const annoncesPerPage = 5;

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

    // Filter annonces based on search term
    const filteredAnnonces = annonces.filter(annonce =>
        annonce.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        annonce.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastAnnonce = currentPage * annoncesPerPage;
    const indexOfFirstAnnonce = indexOfLastAnnonce - annoncesPerPage;
    const currentAnnonces = filteredAnnonces.slice(indexOfFirstAnnonce, indexOfLastAnnonce);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="home-page">
            <nav className="navbar">
                <div className="navbar-brand">Petites Annonces</div>
                <div className="navbar-user">
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>
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
                <input
                    type="text"
                    placeholder="Search annonces..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <div className="annonce-list">
                    {currentAnnonces.map((annonce) => (
                        <div key={annonce.id} className="annonce-item">
                            <h3>{annonce.titre}</h3>
                            <p>{annonce.description}</p>
                            <p>Price: ${annonce.prix}</p>
                            <p>Posted by: {annonce.user.name}</p>
                        </div>
                    ))}
                </div>
                <Pagination
                    annoncesPerPage={annoncesPerPage}
                    totalAnnonces={filteredAnnonces.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

const Pagination = ({ annoncesPerPage, totalAnnonces, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAnnonces / annoncesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination">
            <ul>
                {pageNumbers.map(number => (
                    <li key={number} className={number === currentPage ? 'active' : ''}>
                        <a onClick={() => paginate(number)} href="#!">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default HomePage;