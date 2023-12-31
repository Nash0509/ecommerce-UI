import React from 'react';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/electronics.css'
import sport1 from './images/sport1.jpeg';
import sport2 from './images/sport2.jpeg';
import sport3 from './images/sport3.jpeg';
import sport4 from './images/sport4.jpeg';
import sport5 from './images/sport5.jpeg';
import sport6 from './images/sport6.jpeg';
import { useNavigate } from 'react-router-dom';

const Sports = () => {

  const navigate = useNavigate();

  const [images , setImages] = useState([]);

  useEffect(() => {
       
     fetch('https://ecommerce-l97b.onrender.com/sports')
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

      <p className='text-center my-10 text-[30px]'>Sports</p>

      <div>

        <Slider {...settings} className='slide'>
         {

            images.map((image, index) => (

              <div className='w-64 cursor-pointer' onClick={()=> navigate(`/product/${image._id}`)}><img src={image.image} alt={`sports-${index}`} className='w-full hover:rounded-2xl'/></div>

            ))

         }
         
        </Slider>

      </div>

    </div>
  );
};

export default Sports;
