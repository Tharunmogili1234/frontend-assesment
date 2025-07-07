import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      const decoded = jwtDecode(res.data.token);
if (decoded.role === 'admin') navigate('/admin');
else navigate('/shop');
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + err.response?.data?.msg || 'unknown error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={password}
        type="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
