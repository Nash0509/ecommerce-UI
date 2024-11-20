import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSadCry } from 'react-icons/fa';

const Cancel = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/checkout');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center p-5 bg-white shadow-md rounded-md">
        <FaSadCry size={50} className="text-red-500 mb-3 mx-auto" />
        <h1 className="text-2xl font-bold mb-3">Payment Canceled</h1>
        <p className="mb-5">
          It seems like you canceled the payment. If you wish to proceed with the order, you can try again.
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
            onClick={handleRetry}
          >
            Retry Payment
          </button>
          <Link
            to="/cart/1"
            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-200"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
