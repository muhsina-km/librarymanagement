import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // State to manage Dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/users/profile');
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Open the dialog when user clicks Logout
  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  // Confirm logout and redirect to login page
  const handleConfirmLogout = () => {
    logout();
    setOpenDialog(false);
    navigate('/login');
  };

  // Close the dialog without logging out
  const handleCancelLogout = () => {
    setOpenDialog(false);
  };

  const handleBackClick = () => {
    navigate('/dashboard'); // Replace '/dashboard' with your dashboard route
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Profile
      </Typography>
      {user && (
        <>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ width: 100, height: 100 }} src={user.profilePicture || "/default-avatar.png"} />
          </Box>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Name: {user.name}</Typography>
              <Typography variant="h6" gutterBottom>Email: {user.email}</Typography>
            </CardContent>
          </Card>
        </>
      )}
      <Divider sx={{ my: 3 }} />

      <div  style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
      {/* Back Button */}
      <Button variant="contained" color="primary" onClick={handleBackClick}>
        Back
      </Button>

      {/* Logout Button */}
      <Button variant="contained" color="secondary" onClick={handleLogoutClick}>
        Logout
      </Button>
      </div>
      

      {/* Confirmation Dialog for Logout */}
      <Dialog open={openDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
