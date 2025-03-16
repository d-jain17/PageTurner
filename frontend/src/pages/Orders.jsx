import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
function Orders() {
  const [books,setBooks]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5555/books/')
        .then((response)=>{
            console.log("API Response:", response.data); 
            setBooks(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error)
            setLoading(false)
        }
    )},[])
  return (
    <div>
        <h1 className='text-3xl my-8 '>Orders:</h1>
    </div>
  )
}

export default Orders