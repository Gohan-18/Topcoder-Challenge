import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import AuthProvider from './firebase/Auth';
import Profile from './Components/Profile';

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>} >
      <Route index element={<Home/>} />
      <Route path='/profile' element={<Profile/>} />

    </Route>
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    </>
  ))

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
