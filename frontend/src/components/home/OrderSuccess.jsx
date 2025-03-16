import React from 'react'
import { FaRegThumbsUp } from "react-icons/fa";
import BackButton from '../BackButton';
function OrderSuccess() {
  return (
    <div className='p-40'>
        <BackButton/>
        <center>
            <div className='border-5 p-10 rounded-full'>
        <FaRegThumbsUp size={200}/>
        
        </div>
        <h1 className='text-xl font-bold m-4 text-green-500'>
            Order placed successfully!
        </h1>
        </center>
    </div>
  )
}

export default OrderSuccess