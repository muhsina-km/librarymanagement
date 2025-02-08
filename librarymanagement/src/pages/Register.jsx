import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password length validation
    if (password.length < 8) {
      setAlert({ message: 'Password must be at least 8 characters long.', severity: 'error' });
      return;
    }
  
    try {
      await API.post('/users/register', { name, email, password });
      setAlert({ message: 'Registration Successful!', severity: 'success' }); 
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setAlert({ message: 'This email is already registered', severity: 'error' }); 
    }
  };
  

  return (
    <Container maxWidth="sm">
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>} 
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' , fontWeight: 'bold'}}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}></div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;