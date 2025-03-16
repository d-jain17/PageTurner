import React from 'react'
import { useState} from 'react'
import BuyLogin from '../components/home/BuyLogin'
import SellLogin from '../components/home/SellLogin'
function Login() {
    const [user,setUser]=useState('buy')
    
  return (
    <div className='p-4'>
        <div className='flex items-center gap-x-2 p-4 w-[600px] justify-between mx-auto'>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>setUser('buy')}>Buy a book</button>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>setUser('sell')}>Sell a book</button>
        </div>
        {user=='buy'? <BuyLogin/> : <SellLogin/>}
   </div>
  )
}

export default Login