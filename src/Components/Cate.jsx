import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { FaRupeeSign } from 'react-icons/fa';

const Cate = () => {
  const [res, setRes] = useState([]);
  const [load, setLoad] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  window.scrollTo(0,0);

  useEffect(() => {
      
    setTimeout(() => {
      setLoad(false);
    }, 500)

  }, [])

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
       fetch(`https://ecommerce-l97b.onrender.com/${id.toLowerCase()}`)
       .then((res) => res.json())
       .then((data) => {
         console.log(data);
         setRes(data);
       });
       setLoad(false);
    }, 200)
   
  }, [id]);

  if(load) {
    return <div className='h-[70vh] flex justify-center' style={{alignItems:'center'}}><HashLoader size={100}/></div>
  }

  return (
    <div>

      <div>
        {res.length === 0 ? (
          <div className='h-[90vh] bg-[whitesmoke] flex justify-center pt-[35vh] text-[2rem] font-bold'>Currently no items to show in {id}...</div>
        ) : (
          <div className="item justify-center m-5 p-5 " style={{ alignItems: 'center', border: '1px solid black' }}>
              <h1 className='text-center text-[1.5rem] bg-black text-white rounded shadow-xl'>{id}</h1>
            {res.map((pdt, index) => (
                 <div className='flex mt-5 hover:bg-[azure] p-5 hover:cursor-pointer' style={{alignItems:'center', justifyContent:'center'}} onClick={() => navigate(`/product/${pdt._id}`)}>
                   <React.Fragment key={index}>
                <div className="image shadow-2xl">
                  <img src={pdt.image} alt={`${id}-image`} className=' w-[20vw] h-[20vw] mx-5 mb-5 p-5' />
                </div>
                <div className="des bg-aqua ml-8">
                  <div className='w-[50vw]'>
                    <p className='text-[1.5rem] text-left'>{pdt.name}</p>
                  </div>
                  <p className='text-[22px] my-4 flex' style={{alignItems:'center'}}>
                    Price:&nbsp;<FaRupeeSign/>&nbsp; {pdt.Price}
                  </p>
                  <div className='my-5 w-[50vw]'>
                    <Button variant='contained' color='primary'>Add to Cart&nbsp;<ShoppingCartIcon /></Button>
                  </div>
                </div>
              </React.Fragment>
                 </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cate;
