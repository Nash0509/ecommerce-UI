import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState();
  const [token , setToken] = useState('');

 async function handleLogin(e) {

       e.preventDefault();

    if(!sessionStorage.getItem('token')) {
      try {

        const log = await fetch('https://ecommerce-l97b.onrender.com/login', {
  
         method : 'POST', 
         headers : {
          'Content-Type' : 'application/json'
         },
         body : JSON.stringify({
   
          email : email,
          password : pass,
  
         })
  
        })
  
        if(log.ok) {
  
        const res = await log.json();
        console.log(res);
        setToken(res.token);
        sessionStorage.setItem('token', res.token);
        console.log(token);
        toast.success("Logged in successfully!");
        navigate('/cart/1');
        }
        else if(log.status === 422) {
          const data = await log.json();
          console.log(data.message);
          toast.warning("Wrong email/password...");
        }
        else {
          toast.error("Wrong email/password!")
        }
  
         }
         catch (err) {
  
        toast.error("An error occured while logging in : "+  err.message);
  
         }
    }
    else {
      toast.warning("You are already logged in / Your token expired, in that case logout...");
    }
      }
 


  return (
    <div className='bg-[white] h-[100vh] flex justify-center flex-col ' style={{alignItems:'center'}}>

      <form className='bg-[azure] p-[3.5rem] rounded mb-[4rem] shadow-2xl '>

      <h1 className='text-[2rem] my-4 text-center'>LogIn</h1>

        <input type="email" placeholder='email' required className='p-3 text-center rounded bg-[black] text-white focus:border-[0px]' onChange={(e) => setEmail(e.target.value)}/><br />

        <input type="password" placeholder='password' required className='p-3 text-center rounded my-4 bg-[black] text-white' onChange={e => setPass(e.target.value)}/><br />

       <div className='text-center'>
       <button className='bg-[blue] p-3 rounded text-white' onClick={(e) => handleLogin(e)}><input type="submit" style={{display:'none'}}/>Submit</button>
       </div>

      </form>

      {/* <h1>Only for the subscribed members!</h1><br />
      <button onClick={handleContent}>Content</button>

      <h1 id='content'></h1> */}

    </div>
  )
}

export default Login