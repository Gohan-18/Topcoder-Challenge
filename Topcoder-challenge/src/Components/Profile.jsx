import { Autocomplete, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box, Container, TextField, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db, useAuth } from '../firebase/Auth';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { Form, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { collection, getDocs } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {

  // const [country, setCountry] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [tags, setTags] = useState(() => {tags: []});
  const [edit, setEdit] = useState(true);

  async function getUserDetails () {
    const userDetailsRef = collection(db, 'topcoderData');
    await getDocs(userDetailsRef).then(res => {
      // console.log(res);
      const userData = res.docs.map(doc => ({
        data: doc.data(),
        id: doc.id,
      }))
      console.log(userData);
      setUserDetails(userData);
    }).catch((e) => console.log(e.message))
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  const [userData] = userDetails;
  // const {data} = userData;
  // setTimeout(() => {
  //   const {data} = userData;
  //   console.log(data)     
  // }, 3000)

  

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function updateInfo (e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = [...data.entries()];
    console.log(values);

    // console.log(data);

    setEdit(!edit)
  }

  function navigateToMyAccount() {
    navigate('/');
  };


  return (
    <>
    <Container maxWidth='lg' sx={{position: 'relative', pt: '100px'}} >
      <IconButton onClick={navigateToMyAccount} sx={{position: 'static'}} >
        <ChevronLeftRoundedIcon fontSize='large'/>
      </IconButton>
    {!userDetails.length ? 
      <Box  pt={6} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}><CircularProgress/></Box>  : 
      <Container maxWidth='sm'  >
        <Box  pb={6} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant='h6' sx={{fontSize: '32px', borderBottom: '3px solid black', px:'10px'}}>Profile Details</Typography>
        </Box>
        <Box sx={{pb:6, px:{ xs :'20px', sm: '0'}}}>
          <Form onSubmit={(e) => updateInfo(e)} >
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '40px'}} >
              <Avatar sx={{width: '70px', height: '70px',bgcolor: '#ff6700'}} alt={user.displayName} src="" />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', mb: '20px'}} >
            <Typography gutterBottom sx={{fontSize: '15px', pl: '5px'}} >Name</Typography>
              <TextField
                autoComplete='off'
                name='name'
                id="name"
                // label='Name'
                defaultValue={user.displayName}
                InputProps={{
                  readOnly:edit,
                }}
                sx={{
                  width:'100%'
                }}
              />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', mb: '20px'}} >
            <Typography gutterBottom sx={{fontSize: '15px', pl: '5px'}} >Biography</Typography>
              <TextField
                autoComplete='off'
                name='biography'
                id="biography"
                // label='Biography'
                value={userData?.data?.biography}
                multiline
                minRows={4}
                InputProps={{
                  readOnly: edit,
                }}
                sx={{
                  width:'100%'
                }}
              />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', mb: '20px'}} >
              <Typography gutterBottom sx={{fontSize: '15px', pl: '5px'}} >Country</Typography>
              <TextField
                value={userData?.data?.country}
                autoComplete='off'
                name='country'
                id="country"
                // label='Country'
                InputProps={{
                  readOnly: edit,
                }}
                sx={{
                  width:'100%'
                }}
              />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', mb: '20px'}} >
            <Typography gutterBottom sx={{fontSize: '15px', pl: '5px'}} >Interests</Typography>
              <Autocomplete
                disabled
                sx={{
                  width: '100%'
                }}
                multiple
                id="interests"
                options={userData?.data?.interests}
                // getOptionLabel={(option) => option}
                defaultValue={[...userData?.data?.interests]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled
                    sx={{width: '100%',color: 'black'}}
                  />
                )}
              />
            </Box>
            {/* {!edit && <Button type='submit' fullWidth variant='contained' color='success'>Update</Button>} */}
          </Form>
          {/* {edit && <Button onClick={() => setEdit(!edit)} fullWidth variant='contained'>Edit Info</Button>} */}
        </Box>
        {/* <Container maxWidth='lg'>
          <Button fullWidth variant='contained' color='error' onClick={logOut}>LogOut</Button>
        </Container> */}
    </Container>}
    </Container>
    </>
  )
}

// sx={{position: 'fixed', bottom: 100, left:0, right:0}}
              {/* <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px'}} >
              <TextField
                name='email-input'
                id="email-input"
                label='Email Id'
                defaultValue={user.email}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  width:'100%'
                }}
              />
            </Box> */}