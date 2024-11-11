import React from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/electronics.css";
import { useNavigate } from "react-router-dom";

const Clothing = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://ecommerce-l97b.onrender.com/clothing")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setImages(res);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="my-20 bg-black text-white p-10">
      <p className="text-center my-10 text-[30px]">Clothing</p>
      {images.length === 0 ? (
        <div className="flex space-x-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-64 h-64 bg-gray-700 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      ) : (
        <Slider {...settings} className="slide">
          {images.map((image, index) => (
            <div
              className="w-64 cursor-pointer"
              onClick={() => navigate(`/product/${image._id}`)}
            >
              <img
                src={image.image}
                alt={`clothes-${index}`}
                className="w-full hover:rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Clothing;
