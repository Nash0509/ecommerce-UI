import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { total } from './PizzaSlice';
import { HashLoader } from 'react-spinners';
import {AiOutlineDelete} from 'react-icons/ai'
import {toast} from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {PropagateLoader} from 'react-spinners'
import Tooltip from '@mui/material/Tooltip';
import { minusOne } from './PizzaSlice';

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
  p: 8,
};

const Cart = () => {
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const total1 = useSelector((store) => store.pizza.total);
  

  useEffect(() => {
      
     setTimeout(() => {
          setLoad(false);
     }, 500)

  }, [])

  useEffect(() => {
    try {
      fetch('https://ecommerce-l97b.onrender.com/cart')
        .then((res) => res.json())
        .then((res) => {
          setItems(res);
          console.log("It ran again : ",  res);
  
          // Assuming res is an array of objects with 'price' property
          const totalPrice = res.reduce((acc, cur) => {
            // Ensure 'price' property exists and is a number
            if (cur.hasOwnProperty('price') && typeof cur.price === 'number') {
              return acc + cur.price;
            }
            return acc;
          }, 0);
  
          dispatch(total({total : totalPrice}));
        })
        .catch(() => console.log("Error in fetching cart items!"));
    } catch (err) {
      console.log("Error in the cart!");
    }
  }, []);
  

  if (load) {
    return <div className='h-[70vh] flex justify-center' style={{alignItems:'center'}}><HashLoader size={100}/></div>;
  }

  async function handleDelete(id) {

     try {

     await fetch(`https://ecommerce-l97b.onrender.com/delete/${id}`, {
      'method' : 'DELETE',
      headers : {'Content-Type': 'application/json'}
     })
     .then((res) => res.json())
     .then((res) => {
     toast.success("Item removed from the cart successfully!");
     setOpen(false);
    setItems((pre) => pre.filter((pdt) => pdt._id !== id))
     dispatch(minusOne());
     })


     }
     catch (err) {
      console.log("An error occurred while deleting");
     }

  }

  return (
    <div className='bg-[whitesmoke]'>
      <div className='flex justify-center pt-5'>
      <p className='text-center bg-[blue] text-white w-[30vw] rounded p-2'>Your total : Rs. {total1}</p>
      <Tooltip title="Checkout">
      <button className='rounded bg-blue-600 px-2 text-white ml-3' onClick={() => {
        if(items.length === 0) {
          toast.warning("No items in the cart...");
        }
        else navigate('/checkout');

      }}>Checkout</button>
      </Tooltip>
      </div>
     
     <div>
      {
        (items.length === 0) ? <div className='h-[90vh] bg-[whitesmoke] flex justify-center pt-[35vh] text-[2rem] font-bold'>Currently no item in the cart!</div> :  <div>
        {items.map((pdt, index) => (
            <div className='flex hover:bg-[azure] p-5 hover:cursor-pointer' style={{ alignItems: 'center', justifyContent: 'center' }} key={index}>
              <React.Fragment>
                <CartItem pdt={pdt} />
  
                <div>
        <Tooltip title="Delete">
        <Button onClick={handleOpen}><button className='bg-black text-white p-4 rounded ml-3'>  
                <AiOutlineDelete size={40}/>  </button></Button>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-white text-center'>
              Are you sure you want to remove this item from the cart
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
                <button onClick={() => handleDelete(pdt._id)} className='rounded bg-[blue] px-2 text-white ml-3 p-2 mt-4'>yes, I am sure!</button>
            </Typography>
          </Box>
        </Modal>
      </div>
               
              </React.Fragment>
            </div>
          ))}
        </div>
      }
     </div>
      
    </div>
  );
};

const CartItem = ({ pdt }) => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://ecommerce-l97b.onrender.com/product/${pdt.id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      })
      .catch(() => console.log("Error in fetching product details!"));
  }, [pdt.id]);

  if (!product) {
    return <p className='p-5 text-center'><PropagateLoader size={25}/></p>;
  }

  return (
    <div className='bg-[#ffffcc] border rounded flex ' style={{alignItems:'center'}}>
      <div className="image">
        <img src={product.image} alt={`image-${pdt.id}`} className=' w-[15vw] h-[15vw] mx-5 mb-5 p-5' />
      </div>
      <div className="des bg-aqua ml-8">
        <div className='w-[50vw]'>
          <p className='text-[1.5rem] text-left'>{product
          .name}</p>
        </div>
        <p className='text-[22px] my-4'>
          Price: Rs. {product.Price}
        </p>
      </div>
    </div>
  );
};

export default Cart;
