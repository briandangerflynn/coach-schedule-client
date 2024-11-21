import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
        const token = response.data.token;
        login(token);
        navigate('/');
      } catch (err) {
        console.error('Error logging in user:', err);
      };
    };

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
};
