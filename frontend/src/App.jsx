import React from 'react'
import {Routes,Route} from 'react-router-dom'
import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import Login from './pages/Login'
import BuyerHome from './pages/BuyerHome'
import Cartpage from './pages/Cartpage'
import OrderSuccess from './components/home/OrderSuccess'
import Orders from './pages/Orders'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/books' element={<Home/>}/>
      <Route path='/books/buyer/:id' element={<BuyerHome/>} />
      <Route path='books/buyer/:id/cart' element={<Cartpage/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/order/:id' element={<OrderSuccess/>}/>
      <Route path='/books/orders' element={<Orders/>}></Route>
    </Routes>
  )
}

export default App