import React from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { useState } from 'react';
import axios from 'axios';
import BookModal from './BookModal';
function SingleBuyerCard({ item }) {
  const [showModal,setShowModal]=useState(false)
  const userId = localStorage.getItem("userId");
  const handleAddCart = () => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    const bookToAdd = {
      productId: item._id,
      title: item.title,
      author: item.author,
      publishYear: item.publishYear,
      quantity: 1,
    };

    axios
      .put(`http://localhost:5555/books/users/${userId}/cart`, { book: bookToAdd })
      .then(() => {
        alert("Book added to cart!");
      })
      .catch((error) => {
        alert("An error happened. Please check the console.");
        console.log(error);
      });
  };
        return (
            <div
                className='border-2 border-gray-500 w-[400px] rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
                <h2 className='absolute top-1 right-2 px-4 py-1 bg-red:300 rounded-lg'>
                    {item.publishYear}
                </h2>
                <h4 className='my-2 text-gray-500'>{item._id}</h4>
                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-red-200 text-2xl' />
                    <h2 className='my-1'>{item.title}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <BiUserCircle className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{item.author}</h2>
                </div>
                <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                    <BiShow className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                        onClick={() => setShowModal(true)} />
                    <button className='bg-blue-500 p-3 cursor-pointer text-white rounded-lg hover:bg-blue-300' onClick={handleAddCart}>
                        Add to Cart
                    </button>

                </div>
                {
                    showModal && (
                        <BookModal item={item} onClose={() => setShowModal(false)} />
                    )
                }
            </div>
        )
    }

    export default SingleBuyerCard