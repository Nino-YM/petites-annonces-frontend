import React, { useState, useEffect } from 'react';
import { login, logout, getCurrentUser } from './services/auth';
import './App.css';


const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.access_token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Petites Annonces</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default App;
