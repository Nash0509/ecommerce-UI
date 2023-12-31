import React from 'react';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/electronics.css'
import lux1 from './images/lux1.jpeg';
import lux2 from './images/lux2.jpeg';
import lux3 from './images/lux3.jpeg';
import lux4 from './images/lux4.jpeg';
import lux5 from './images/lux5.jpeg';
import lux6 from './images/lux6.jpeg';
import { useNavigate } from 'react-router-dom';

const Luxury = () => {

  const navigate = useNavigate();

  const [images , setImages] = useState([]);

  useEffect(() => {
       
     fetch('https://ecommerce-l97b.onrender.com/luxury')
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

      <p className='text-center my-10 text-[30px]'>Luxury</p>

      <div>

        <Slider {...settings} className='slide'>
        {

          images.map((image, index) => (

            <div className='w-64 cursor-pointer' onClick={()=> navigate(`/product/${image._id}`)}><img src={image.image} alt={`luxury-${index}`} className='w-full hover:rounded-2xl'/></div>

          ))

        }
        </Slider>

      </div>

    </div>
  );
};

export default Luxury;
