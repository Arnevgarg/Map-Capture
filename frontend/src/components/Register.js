import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { username, password });
      alert('Registration successful');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Register</h2>
    //   <div>
    //     <label>Username:</label>
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //   </div>
    //   <button type="submit">Register</button>
    // </form>
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="mb-3">Register</h2>
      <div className="mb-3">
        <label className="form-label">Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
      </div>
      <button type="submit" className="btn btn-success">Register</button>
    </form>
  );
};

export default Register;
