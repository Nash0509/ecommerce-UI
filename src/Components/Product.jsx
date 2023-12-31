import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import { addToCart } from './PizzaSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {toast} from 'react-toastify'
import { FaCheck, FaRupeeSign, FaStar } from 'react-icons/fa';
import { HashLoader } from 'react-spinners';
import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius : '5px',
  p: 4,
};

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const Product = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [reviews, setReviews] = useState('');
  const [rate, setRate] = useState(3);
  const [totalR, setTotalR] = useState(0);
  const [cards, setCards] = useState(['That was really nice!', 'I have used this and I am not satisfied...', 'I mean it\'s alright']);

  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [p, setP] = useState();
  const [load, setLoad] = useState(true);

  useEffect(() => {
      
    setTimeout(() => {
      setLoad(false);
    }, 500)

  }, []);

  useEffect(() => {
       
      fetch(`https://ecommerce-l97b.onrender.com/reviews/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("This is the review data : ", res[0]);
        console.log(res.length);
        let a = 0;
        res.map((r) => {
          a+=r.rating;
          setCards([...cards, r.review]);
        });
        if(res.length !== 0 ) {
          setRate(a/res.length);
        }
        setTotalR(res.length+3);
      })




  }, [])

  useEffect(() => {
     
    fetch(`https://ecommerce-l97b.onrender.com/product/${id}`)
    .then((res)=> res.json())
    .then((res) => {

     console.log(res)
     setP(res);
     window.scrollTo(0,0);

    })

  }, [])

  if(load) {
    return <div className='h-[70vh] flex justify-center' style={{alignItems:'center'}}><HashLoader size={100}/></div>
  }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };

      if(!p) {
        return <p>Loading...</p>
      }

      async function handleAddToCart() {

      try {

      fetch(`https://ecommerce-l97b.onrender.com/pdt/${id}/${p.Price}`, {
 
        'method' : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            price : p.Price
          })

      })
      .then((res)=> res.json())
      .then((res) => {
        console.log(res);
         toast.success("Item added to the cart successfully");
         navigate('/cart/1');
      })

      }
      catch (err) {
        console.log("An error occured while adding to the cart!")
      }

      }

      function handleReview() {
        console.log("rating : "+value);
        console.log("Review : "+ reviews);

         fetch(`https://ecommerce-l97b.onrender.com/review/${id}`, {
             'method' : 'POST',
             headers : {
              'Content-Type': 'application/json'
             },
             body : JSON.stringify({
              review : reviews,
              rating : value
             })
         })

        toast.success("Thanks for your valuable feedback!");
        window.scrollTo(0,0)
      }

  return (
    <div>

     <div  className="item flex justify-center mt-6">
                <div className="image">
            <img src={p.image} alt={`${id}-image`} className='w-[30vw] h-[30vw] mx-5 mb-5 shadow-2xl'/>
        </div>

        <div className="des bg-aqua">

         <div className='w-[50vw]'>
          <p className='text-[2rem] text-left'>{p.name}</p>
         <p className='text-[1.5rem] text-left'>{p.dis}</p>

         </div>
           <p className='text-[22px] my-4 flex' style={{alignItems:'center'}}>
            Price : &nbsp;<FaRupeeSign />&nbsp; {p.Price}
           </p>

          <div className="rating">
            <h1>Ratings : {rate}</h1>
            <p className='underline mt-1'>{totalR} ratings</p>
          <Stack spacing={1} className='my-3 mb-10'>
      <Rating name="half-rating-read" defaultValue={rate} precision={0.5} readOnly />
    </Stack>
          </div>

          <div className='my-5 w-[50vw]'>
              <div>
      <button onClick={handleOpen} className='bg-[blue] text-white rounded p-2 flex' style={{alignItems:'center'}}>Add to the Cart &nbsp; <AiOutlineShoppingCart size={30}/></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-white text-center'>
            Are you sure ? 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
          <Button variant='contained' color='primary' onClick={() => {
                dispatch(addToCart({price : p.Price}));
                handleAddToCart();
                setTimeout(() => {
                  window.location.reload();
                }, 300)
              }}>Add to Cart&nbsp;<ShoppingCartIcon/></Button>
          </Typography>
        </Box>
      </Modal>
      <h1 className='flex mt-5 text-[1.5rem]' style={{alignItems:'center'}}><FaCheck/>&nbsp;Ecommerce assured</h1>
    </div>
             
          </div>

        </div>
             </div>

             <div className='mt-10 text-center text-[1.5rem]'>
              <h1>Already an owner of this product ? Leave your valueable feedback here</h1>
              <p className='mt-5 flex justify-center'>  <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box> </p><br />
              <textarea cols="30" rows="10" className='border-2 hover:border-[blue] focus:border-[black] p-3' placeholder='Express without any hasitation...' onChange={(e) => setReviews(e.target.value)}></textarea><br />
              <button className='bg-[blue] text-white rounded p-2 hover:bg-blue-700' onClick={handleReview}>Submit</button>
              
             </div>

     <div className="reviews bg-black text-white my-10 p-[4rem]">
        <h1 className='p-6 flex justify-center text-[1.5rem]' style={{alignItems:'center'}}>Customer Reviews&nbsp; <FaStar color='gold'/></h1>
     <Slider {...settings} className='slide p-10 text-center'>
        {
          cards.map((card) => {

            return (
              <Card sx={{ maxWidth: 345}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                      {card}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Anonymous
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            )

          })
        }
        </Slider>
     </div>

    </div>
  )
}

export default Product
