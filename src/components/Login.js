import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ handleLogin, email, setEmail, password, setPassword }) => (
    <form onSubmit={handleLogin}>
        <div className="login-box">
            <h1>Petites Annonces</h1>
            <div className="input-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </form>
);

export default Login;
