import React, { Suspense } from "react";
import "../Styles/home.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import HomeItems from "./HomeItems";

// Import images
import image from "./images/elect.webp";
import image1 from "./images/fur.webp";
import image3 from "./images/mobiles.webp";
import image2 from "./images/grocery.webp";
import image5 from "./images/biles.webp";
import image6 from "./images/travel.webp";
import image7 from "./images/appliances.webp";
import image8 from "./images/fashion.webp";
import slider1 from "./images/slider1.webp";
import slider2 from "./images/slider2.webp";
import slider3 from "./images/slider3.webp";

const Home = () => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const cat = [
    "Electronics",
    "Luxury",
    "Clothing",
    "Sports",
    "Home",
    "Grocery",
    "Travel",
    "TwoWheelers",
  ];

  const images = [
    image,
    image7,
    image3,
    image8,
    image1,
    image2,
    image6,
    image5,
  ];

  if (load) {
    return (
      <div
        className="h-[70vh] flex justify-center"
        style={{ alignItems: "center" }}
      >
        <HashLoader size={100} />
      </div>
    );
  }

  return (
    <div className="home-main">
      <div className="shopBy">
        <ul className="flex overflow-x-scroll">
          {images.map((image, index) => (
            <div onClick={() => navigate(`/category/${cat[index]}`)}>
              <img src={image} alt={`${cat[index]}-image`} />
              <li>{cat[index]}</li>
            </div>
          ))}
        </ul>
      </div>

      <div className="items1">
        <Slider {...settings}>
          <div>
            <img
              src={slider1}
              alt="Image 1"
              className="simg"
              onClick={() => navigate(`/category/travel`)}
            />
          </div>
          <div>
            <img
              src={slider2}
              alt="Image 2"
              className="simg"
              onClick={() => navigate(`/category/electronics`)}
            />
          </div>
          <div>
            <img
              src={slider3}
              alt="Image 3"
              className="simg"
              onClick={() => navigate(`/category/travel`)}
            />
          </div>
        </Slider>
      </div>

      <div className="sections">
        <div className="electronics">
          <HomeItems item="electronics" />
        </div>

        <div className="luxury">
          <HomeItems item="luxury" />
        </div>

        <div className="clothing">
          <HomeItems item="clothing" />
        </div>

        <div className="sports">
          <HomeItems item="sports" />
        </div>
      </div>

      <div className="p-10 bg-gradient-to-b from-gray-800 to-black text-white">
        <h1 className="text-3xl text-center font-bold text-yellow-400 shadow-lg p-4 rounded-lg border border-yellow-500 mb-8">
          Top Stories
        </h1>

        <p className="text-[1.2rem] leading-relaxed text-gray-200 p-8 mt-5 rounded-lg shadow-lg hover:bg-amber-200 hover:text-black border border-gray-600 transition-all duration-300">
          Once upon a time in the bustling world of online shopping, there was a
          curious customer named Alex. Eager to find the perfect birthday gift
          for a friend, Alex decided to explore a popular e-commerce website
          known for its vast array of products and seamless user experience.
          <br />
          <br />
          As Alex navigated through the virtual aisles, the website's
          intelligent recommendation system caught their attention. It seemed as
          if the website had an uncanny ability to understand Alex's
          preferences. Intrigued, Alex decided to put it to the test and typed
          in a vague search query. <br />
          <br />
          To their surprise, the search results were spot on, showcasing a
          curated selection of items that matched Alex's interests. The
          user-friendly interface and intuitive design made the entire shopping
          experience a breeze. The website even offered a real-time chat support
          feature, where Alex could instantly get assistance from a friendly
          customer support representative named Sam. <br />
          <br />
          As Alex filled the digital shopping cart with carefully chosen items,
          they noticed a notification icon displaying a special discount for
          being a loyal customer. Excitement filled the virtual air as Alex
          proceeded to checkout, anticipating the upcoming birthday surprise.
          <br />
          <br />
          The checkout process was swift and secure, and Alex appreciated the
          multiple payment options available. A delightful confirmation email
          arrived promptly, assuring Alex that their chosen gifts would soon be
          on their way. The email even included a personalized message, adding a
          warm touch to the transaction. <br />
          <br />
          A few days later, a cheerful delivery person arrived at Alex's
          doorstep with a beautifully wrapped package. The attention to detail
          and care taken in packaging added an extra layer of joy to the
          unboxing experience. Each item was of the highest quality, exactly as
          described on the website. <br />
          <br />
          Overwhelmed with satisfaction, Alex couldn't help but share their
          positive experience on social media, praising the e-commerce website
          for its seamless navigation, personalized recommendations, and
          exceptional customer service. The story of Alex's memorable journey
          with the e-commerce website spread far and wide, attracting new
          customers eager to embark on their own adventures in the world of
          online shopping. <br />
          <br />
          And so, the e-commerce website continued to weave tales of delightful
          experiences, one satisfied customer at a time, ensuring that each
          shopping journey was nothing short of magical. <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default Home;
