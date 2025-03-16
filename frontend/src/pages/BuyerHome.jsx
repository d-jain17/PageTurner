import React from 'react'
import BuyerCard from '../components/home/BuyerCard'
import { useState,useEffect } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';
function BuyerHome() {
    const [books,setBooks]=useState([])
    useEffect(()=>{
        
        axios.get('http://localhost:5555/books/')
        .then((response)=>{
            console.log("API Response:", response.data); 
            setBooks(response.data)
           
        })
        .catch((error)=>{
            console.log(error)
            
        }
    )},[])
  return (
    <div>
    <Navbar/>
    <BuyerCard books={books}/>
    </div>
  )
}

export default BuyerHome