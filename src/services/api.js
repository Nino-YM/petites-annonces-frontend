import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const logout = () => api.post('/logout');
export const getCurrentUser = () => api.get('/currentuser');
export const getAnnonces = () => api.get('/annonces');
export const addAnnonce = (annonce) => api.post('/annonces', annonce);
export const updateAnnonce = (id, annonce) => api.put(`/annonces/${id}`, annonce);
export const deleteAnnonce = (id) => api.delete(`/annonces/${id}`);

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
