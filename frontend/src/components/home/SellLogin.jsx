import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useSnackbar} from 'notistack'
import { useNavigate } from 'react-router-dom'

function SellLogin() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const snackbar= useSnackbar()
    const navigate=useNavigate()

    const handleSaveUser=()=>{

        if(email=='authenticSeller@gmail.com' && password=='authentic12'){
          snackbar.enqueueSnackbar('Welcome back!!', { variant: 'success' });
          navigate(`/books`)
        }
        else{
          snackbar.enqueueSnackbar('Wrong credentials', { variant: 'error' });
        }
      }
  return (
    <div className='flex flex-col border-2 border-sky-400 rounded-cl w-[600px] p-4 mx-auto my-4'>
        Hello dear seller !
    <div className='my-4'>
      <label className='text-xl mr-4 text-gray-500'>Email</label>
      <input
      type='text'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className='border-2 border-gray-500 px-4 py-2 w-full'></input>
    </div>
    <div className='my-4'>
      <label className='text-xl mr-4 text-gray-500'>Password</label>
      <input
      type='text'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className='border-2 border-gray-500 px-4 py-2 w-full'></input>
    </div>
    <button className='p-2 border-sky-300 m-8' onClick={handleSaveUser}>
      Log In
    </button>
  </div>
  )
}

export default SellLogin;