import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import {FaApplePay} from 'react-icons/fa'
import { HashLoader } from 'react-spinners';

const Checkout = () => {

    const [load, setLoad] = useState(true);
    const total = useSelector((store) => store.pizza.total);

    const navigate = useNavigate();

    useEffect(() => {
      
        setTimeout(() => {
             setLoad(false);
        }, 500)
   
     }, [])
    

   useEffect(() => {

     fetch('https://ecommerce-l97b.onrender.com/checkout', {
        'method' : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'auth' : sessionStorage.getItem('token')
        } 
     })
     .then((res) => res.json())
     .then((res) => {
        console.log(res.message);
     })
     .catch((err) => {
        
       navigate('/login');
       console.log(err.message);
       toast.warning("You need to login/register first...")

     })

   }, [])

   if (load) {
    return <div className='h-[70vh] flex justify-center' style={{alignItems:'center'}}><HashLoader size={100}/></div>;
  }

  return (
    <div className='p-7 h-[100vh] mt-[15vh]'>
        <p className='bg-[blue] text-white rounded w-[30vw] m-auto text-center p-3 text-[1.5rem]'>Pay &nbsp;:&nbsp; Rs. {total}</p>
      
      <div className='text-center mt-4 '>
       <button className='rounded bg-[black] text-white px-5'><a href="https://buy.stripe.com/test_dR64j7bZa18H20UdQQ" ><FaApplePay size={70}/></a></button>
      </div>
    </div>
  )
}

export default Checkout