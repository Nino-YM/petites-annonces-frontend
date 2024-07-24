import React from 'react';

const Register = ({ handleRegister, name, setName, email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation }) => (
    <form onSubmit={handleRegister}>
        <div className="login-box">
            <h1>Register - Petites Annonces</h1>
            <div className="input-group">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </div>
    </form>
);

export default Register;
