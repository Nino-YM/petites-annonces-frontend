import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { login, logout, getCurrentUser, register } from './services/auth';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ name, email, password, password_confirmation: passwordConfirmation });
      localStorage.setItem('token', response.data.access_token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Registration error:', error);
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
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.is_admin ? (
                  <Navigate to="/admin" />
                ) : (
                  <HomePage user={user} handleLogout={handleLogout} />
                )
              ) : (
                <Login handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
              )
            }
          />
          <Route
            path="/register"
            element={
              <Register
                handleRegister={handleRegister}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                passwordConfirmation={passwordConfirmation}
                setPasswordConfirmation={setPasswordConfirmation}
              />
            }
          />
          <Route
            path="/admin"
            element={
              user && user.is_admin ? (
                <AdminPage user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
