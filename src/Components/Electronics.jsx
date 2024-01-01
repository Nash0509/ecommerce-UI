import React from 'react';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/electronics.css'
import elect1 from './images/elect1.jpeg';
import elect2 from './images/elect2.jpeg';
import elect3 from './images/elect3.jpeg';
import elect4 from './images/elect4.jpeg';
import elect5 from './images/elect5.jpeg';
import elect6 from './images/elect6.jpeg';
import elect7 from './images/elect7.jpeg';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

const Electronics = () => {

    const navigate = useNavigate();
    const [images , setImages] = useState([]);

    useEffect(() => {
         
       fetch('https://ecommerce-l97b.onrender.com/electronics')
       .then((res) => res.json())
       .then((res) => {
        console.log(res);
        setImages(res);
       })

    }, [])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };


  return (
    <div className='my-20 bg-black text-white p-10'>

      <p className='text-center my-10 text-[30px]'>Electronics</p>

      <div>
      <Slider {...settings} className='slide'>

      {
        images.map((image, index) => (
 
          
            <div className='w-64 cursor-pointer' onClick={()=> navigate(`/product/${image._id}`)}><img src={image.image} alt={`electronics-${index}`} className='w-full hover:rounded-2xl'/></div>
            
        ))
      }
        </Slider>

      </div>

    </div>
  );
};

export default Electronics;
