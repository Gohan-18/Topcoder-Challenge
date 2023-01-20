import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth'

export default function Home() {

    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    async function logout () {
        await signOut();
        navigate('/signin');
    }

  return (
    <Container maxWidth='lg' sx={{display: 'flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column', height: '50vh'}} >
        <Typography sx={{fontWeight: '500'}} gutterBottom variant='span' >Hey There... {user ? <Typography variant='span'>{user?.displayName ?? user.email}</Typography> : '' } </Typography>
        {user ? <Button sx={{mx:'20px'}} variant='contained' color='error' onClick={logout} >Log Out</Button> : ''}
    </Container>
  )
}
