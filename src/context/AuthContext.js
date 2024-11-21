import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

  // Set current user from token
    useEffect(() => {
        if (token) {
        axios
            .get('http://localhost:3000/current', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            .then((response) => setUser({
                id: response.data.user.id,
                first_name: response.data.user.first_name,
                last_name: response.data.user.last_name,
                phone: response.data.user.phone,
                role: response.data.user.role,
            }))
            .catch(() => logout()); // Log out if token is invalid
        }
    }, [token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};