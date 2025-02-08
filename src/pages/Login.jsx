import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Role dropdown
  const [alert, setAlert] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the email, password, and selected role to the backend
      const response = await API.post('/users/login', { email, password, role });
      login(response.data.token);
      setAlert({ message: 'Login Successful!', severity: 'success' });

      // After login, navigate to the dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setAlert({ message: 'Invalid email or password', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}

      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
