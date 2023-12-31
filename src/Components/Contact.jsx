import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

   if(!sessionStorage.getItem('token')) {
    try {
      console.log("Email : " + email);
      console.log("Pass : "+ password);
      const response = await fetch('https://ecommerce-l97b.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        sessionStorage.setItem('token', data.token);
        console.log(data.token)
        console.log('Registration successful:', data);
        toast.success('You have been registered successfully!');
        navigate('/cart/1')
      } 
      else if(response.status === 422) {
        const data = await response.json();
        console.log(data.message);
        toast.warning("Wrong email/password...");
      }
      else {
        console.log('Registration failed, invalid data');
       toast.warning("Invalid details, try again...")
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred during registration. Please try again.');
    }
   }
   else {
    toast.warning("You are already registered");
   }
  }

  return (
    <div className=' h-[100vh] flex justify-center flex-col ' style={{alignItems:'center'}}>
      <form className=' p-[3.5rem] rounded'>


    <Box  m={2} p={10}  bgcolor='azure' boxShadow={3}>
    <h1 className='text-[2rem] my-4 text-black text-center'>Register</h1><br />

    <TextField label="Email" variant="filled" type='email' required  onChange={(e) => setEmail(e.target.value)} className='p-3 text-center rounded my-4 text-white' color='primary' InputProps={{style : {color : 'black'},}}/><br /><br />
      <TextField label="Password" variant="filled" type='password' required  onChange={(e) => setPassword(e.target.value)} className='p-3 text-center rounded my-4 text-white' color='primary'/><br /><br />
        <div className='text-center'>
        <Button variant="contained" color="primary" onClick={handleRegister}>
        Submit
      </Button>
        </div>
        <h1 className='text-center mt-5 underline cursor-pointer' onClick={() => {
         if(sessionStorage.getItem('token')) {
          sessionStorage.removeItem('token');
          toast.success("You have been logged out successfully!");
         }
         else {
          toast.warning("LogIn/register first...")
         }
        }}>Logout</h1>
    </Box>
  
      </form>
     
    </div>
  );
};

export default Contact;
