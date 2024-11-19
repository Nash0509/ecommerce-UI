import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/electronics.css";
import { useNavigate } from "react-router-dom";

const Sports = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/sports")
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: (
      <div className="slick-arrow slick-next text-white bg-black p-2 rounded-full shadow-lg hover:bg-gray-800">
        <i className="fas fa-chevron-right"></i>
      </div>
    ),
    prevArrow: (
      <div className="slick-arrow slick-prev text-white bg-black p-2 rounded-full shadow-lg hover:bg-gray-800">
        <i className="fas fa-chevron-left"></i>
      </div>
    ),
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black text-white py-16 px-8">
      <h2 className="text-center text-4xl font-bold text-white mb-12 tracking-wide">
        Sports Gear Collection
      </h2>

      {images.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-gray-700 h-80 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <Slider {...settings} className="product-slider">
          {images.map((image, index) => (
            <div
              key={image._id}
              className="group relative w-full cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
              onClick={() => navigate(`/product/${image._id}`)}
            >
              <img
                src={image.image}
                alt={`sports-${index}`}
                className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4">
                <p className="text-xl font-semibold tracking-wide group-hover:text-yellow-400 transition-colors duration-300">
                  {image.name}
                </p>
                <p className="text-lg mt-2">${image.Price}</p>
                <button className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-md hover:bg-yellow-400 transform transition duration-200">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Sports;
