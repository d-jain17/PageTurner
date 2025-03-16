import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Navbar() {
  const userId = localStorage.getItem("userId");
  return (
    <div className='bg-blue-400 flex text-white justify-between px-4 py-4'>
        <div className='flex gap-5'>
        <h3>Logo</h3>
        <h3>Home</h3>
        </div>
        <div className='flex gap-5'>
        <CgProfile className='text-2xl'/>
        <Link to={`/books/buyer/${userId}/cart`}>
        <FaShoppingCart className='text-2xl' />
        </Link>
        </div>
    </div>
  )
}

export default Navbar