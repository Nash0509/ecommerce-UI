import React, { useState , useEffect} from 'react'
import '../Styles/navbar.css'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { freshData } from './PizzaSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});


const Navbar = () => {

  const [searchBy, setSearchBy] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const top100Films = [
    { title: 'Electronics', year: 1994 },
    { title: 'Clothing', year: 1972 },
    { title: 'Sports', year: 1974 },
    { title: 'Luxury', year: 2008 },
  ];

  useEffect(() => {
         
    function cart() {

   fetch('https://ecommerce-l97b.onrender.com/cart')
   .then((res) => res.json())
   .then((res) => {
    console.log("Cart items : ", res);
    dispatch(freshData({count : res.length}));
   })
   .catch((err) => console.log(err.message));

      }
      cart();

  }, [])

  const count = useSelector((store) => store.pizza.count);
  console.log(count);

  return (
    <div className='flex bg-black text-white p-5'>

      <div className="mx-7 commerce text-5xl"><Link
      to='/'>Ecommerce</Link></div>

      <div className='hidden lg:block '>
      <Autocomplete
  id="filter-demo"
  options={top100Films}
  getOptionLabel={(option) => option.title}
  filterOptions={filterOptions}
  onChange={(event, selectedOption) => {
    console.log("Selected Option: ", selectedOption);
    navigate(`/category/${selectedOption.title}`);
  }}
  sx={{ width: 300 }}
  renderInput={(params) => (
    <TextField 
      label="Search"
      variant="outlined"
      sx={{
        input: {
          color: "white",
        },
        '& .MuiInputLabel-root': {
          color: 'white',
        },
      }}
      style={{
        backgroundColor: 'rgb(50, 50, 50)',
        width: '25vw',
        position: 'absolute',
        fontSize: '3rem',
        marginLeft: '8vw',
        color: 'white',
      }}
      className='text-[3rem] rounded text-white'
      {...params}
      onChange={(e) => setSearchBy(e.target.value)}
    />
    
  )}
/>
 </div>

      <div className="2xl:mx-[35vw] flex xl:mx-[20vw] lg:mx-[9vw] md:mx-[15vw]">


     <ul className='flex ul'>
      <li><Link to='/'>Home</Link></li>
      <li className='flex'>Best <span>deals</span></li>
      <li onClick={() => navigate('/cart/1')}>
      <IconButton aria-label="cart">
      <StyledBadge badgeContent={count} color="secondary">
        <ShoppingCartIcon className='text-white text-5xl'/>
      </StyledBadge>
    </IconButton>
      </li>
      <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
     </ul>

      </div>

    </div>
  )
}



export default Navbar

