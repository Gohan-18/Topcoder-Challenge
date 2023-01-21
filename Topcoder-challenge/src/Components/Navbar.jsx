import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';


export default function Navbar() {

    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    function navigateProfile () {
        navigate('/profile');
    }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AppBar position="fixed" sx={{height: '80px', display: 'flex', alignItems: 'space-between', justifyContent: 'center', px: '20px'}} >
        <Toolbar>
          
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 , display: {xs: 'none', sm: 'inline-block'}}}
            >
            TopCoder
            </Typography>

            {!user ?
            <>
            <Button sx={{mx:'20px'}} variant='contained' onClick={() => navigate('/signin')} >Sign In</Button>
            <Button variant='contained' onClick={() => navigate('/signup')} >Sign Up</Button>
            </>
             :
             <>
             <Button onClick={navigateProfile} sx={{mx:'20px', fontSize: {xs: '12px', sm: '16px'}}} variant='contained' color='success'>Profile</Button>
             <Button variant='contained' color='success' sx={{fontSize: {xs: '12px', sm: '16px'}}} >Create Learning Space** **</Button>
             </>
            }

            

        </Toolbar>
      </AppBar>
    </Box>
  );
}