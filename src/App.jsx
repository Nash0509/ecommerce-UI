import React from 'react'
import Contact from './Components/Contact'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Product from './Components/Product';
import Cate from './Components/Cate';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';

const App = () => {
  return (
   <Router>
     <ToastContainer/>
     <Navbar />
    <Routes>
      <Route path='/register' element={<Contact />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/nav' element={<Navbar />}/>
      <Route path='/product/:id' element={<Product />}/>
      <Route path='/category/:id' element={<Cate />}/>
      <Route path='/cart/:id' element={<Cart />}/>
      <Route path='/checkout' element={<Checkout />}/>
    </Routes>
    <Footer />
   </Router>
  )
}

export default App