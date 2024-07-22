import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials)
        .then(response => {
            // Ensure the response structure is as expected
            if (response.data.access_token && response.data.user) {
                return response;
            } else {
                throw new Error('Invalid response structure');
            }
        });
};

export const logout = () => {
    return axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const getCurrentUser = () => {
    return axios.get(`${API_URL}/currentuser`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};
