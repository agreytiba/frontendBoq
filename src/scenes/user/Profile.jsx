import React, { useState,useEffect } from 'react';
import { Grid, Typography,Box, Card, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../confing.js/baseUrl';
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  // initialize useNavigation
  const navigate = useNavigate()

useEffect(() => {
  fetchUser()

}, [])


     const fetchUser= () => {
        setIsLoading(true)
        axios.get(API_BASE_URL + `/api/users/${user._id}`)
            .then(response => {
                setIsLoading(false)
                setUserData(response.data);
            })
            .catch(error => {
                toast.error(`Error fetching :`, error);
            });
     
    };


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    setIsLoading(true)
    try {
     const res = await axios.post(API_BASE_URL + `/api/users/${user._id}`,userData);
      // Assuming the backend responds with the updated user data
      if (res.data) {
       setIsLoading(false)
       sessionStorage.setItem('user', JSON.stringify(res.data));
       setOpen(false);
       
      } 
     else {
        toast.success(`failed to edit user`)
        setIsLoading(false)
      }
     
    } catch (error) {
      toast.error( error);
      setIsLoading(false)
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Box display={`flex`} justifyContent={`center`} alignItems={`center`}>
    <Card sx={{ padding: `20px`}}>
        <Button onClick={() => navigate(-1)} sx={{marginBlock:`10px`}}><ArrowBack style={{marginRight:`6px`}}/> back</Button>
      <Typography variant="h5" gutterBottom textAlign={`center`}>USER PROFILE</Typography>
      <Grid container spacing={2} marginTop={`20px`} lineHeight={`2.5`}>
        <Grid item xs={12} sm={6}>
          <Typography>Name: <span style={{color:`blue`, marginLeft:`5px`}}> {userData?.name}</span></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Phone Number: <span style={{color:`blue`, marginLeft:`5px`}}>{userData?.phone}</span></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Email:<span style={{color:`blue`, marginLeft:`5px`}}> {userData?.email}</span></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>User privailege:<span style={{color:`blue`, marginLeft:`5px`}}> {userData?.accessLevel}</span></Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleOpen} sx={{marginRight:`auto`}}>Edit</Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{display:`flex`,flexDirection:`column`, rowGap:`10px`, minWidth:`250px`,minHeight:`400px`, justifyContent:`center`,alignItems:`center`}}>
          <TextField fullWidth label="First Name" name="firstName" value={userData?.firstName || ''} onChange={handleChange} />
          <TextField fullWidth label="Last Name" name="lastName" value={userData?.lastName || ''} onChange={handleChange} />
          <TextField fullWidth label="Email" name="email" value={userData?.email || ''} onChange={handleChange} disabled/>
          <TextField fullWidth label="User privailege" name="userType" value={userData?.userType || ''} onChange={handleChange} disabled />
          <TextField fullWidth label="Project Id" name="projectId" value={userData?.projectId || ''} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      </Card>
    </Box>
  );
};

export default Profile;
