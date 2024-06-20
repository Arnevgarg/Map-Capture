import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      setToken(response.data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Login</h2>
    //   <div>
    //     <label>Username:</label>
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //   </div>
    //   <button type="submit">Login</button>
    // </form>
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="mb-3">Login</h2>
      <div className="mb-3">
        <label className="form-label">Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
