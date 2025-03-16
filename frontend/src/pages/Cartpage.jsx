import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react';
import BackButton from '../components/BackButton';
import { Link,useNavigate } from 'react-router-dom';
import {useSnackbar} from 'notistack'
import SingleCartCard from '../components/home/SingleCartCard';
function Cartpage() {
    const userId=localStorage.getItem("userId");
    const [books,setBooks]=useState([])
    const navigate =useNavigate()
    const snackbar = useSnackbar();
    useEffect(()=>{
      axios.get(`http://localhost:5555/books/users/${userId}/cart`)
      .then((response)=>{
          // console.log("API Response:", response.data);
          // console.log(response.data.email)
          setBooks(response.data.cart.items)
      })
      .catch((error)=>{
          console.log(error)
      }
  )},[userId])
    const handleOrder=()=>{
  
      const data = {
        id: userId,
        cart: { items: books } 
    };
    console.log(data);
    
      axios.post('http://localhost:5555/books/order',data)
      .then(()=>{
        snackbar.enqueueSnackbar('Order placed successfully', { variant: 'success' });
        navigate(`/books/buyer/${userId}`)
      })
      .catch((error)=>{
        alert('An error happened.Please Check console')
        snackbar.enqueueSnackbar('Error', { variant: 'error' });
  
        console.log(error)
      })
    }
    
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-8'>Cart: </h1>
        <div>
        
            {books.map((book)=>(
             <SingleCartCard item={book} key={book.productId}/>
        ))}
        </div>

        <Link to={`/books/order/${userId}`}>
        <button className="bg-blue-500 p-3 cursor-pointer mx-4 text-white rounded-lg hover:bg-blue-300" onClick={handleOrder}>
        Order Now
      </button>
      </Link>
      
    </div>
  )
}

export default Cartpage