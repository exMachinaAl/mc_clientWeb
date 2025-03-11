import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../../config/axiosCg"

// Buat Context
const AuthContext = createContext();

// Hook untuk menggunakan context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [sharedBotData, setSharedBotData] = useState({})

    // Saat pertama kali render, cek apakah ada token
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // Login
    const login = async (username, password) => {
        const res = await api.post('/api/login', {
            username,
            password
        })
        // const res = await fetch('http://localhost:3001/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username, password })
        // });

        const data = res.data
        if (res.status) setToken(data.token);
        return data;
    };

    // Logout
    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, sharedBotData, setSharedBotData }}>
            {children}
        </AuthContext.Provider>
    );
};
