import express from 'express'
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import { Book } from '../models/bookModel.js';
import {User} from '../models/userModel.js'
import { Order } from '../models/orderModel.js';
const router= express.Router()
router.post('/', async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields: title, author, publishYear'
            });
        }
        const newBook={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book=await Book.create(newBook)
        return response.status(201).send(book)
    } catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }

})
router.post('/users', async (request,response)=>{
    try{
        const { email, password } = request.body
        router.all('*', (req, res, next) => {
            console.log(`Received: ${req.method} ${req.url}`);
            next();
        });
        
        if(
            !request.body.email ||
            !request.body.password
        ){
            return response.status(400).send({
                message:'Send all required fields: email,password'
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            
            if (!isPasswordValid) {
                return response.status(401).send({ message: 'Incorrect password' });
            }

            const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, 'your_secret_key', { expiresIn: '1h' });
            return response.status(200).send({
                message: 'Login successful',
                user: existingUser,
                token
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser={
            email: request.body.email,
            password: hashedPassword,
        };
        const user=await User.create(newUser)
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, 'your_secret_key', { expiresIn: '1h' });
        return response.status(201).send(user)
    } catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }

})
router.post('/order', async (request,response)=>{
    try{
        if( !request.body.id||
            !request.body.cart.items
        ){
            return response.status(400).send({
                message:'Send all required fields: email,items'
            });
        }
        const newOrder={
            id:request.body.id,
            cart: request.body.cart,
        };
        const order=await Order.create(newOrder)
        return response.status(201).send(order)
    } catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }

})
router.get('/', async (request, response) => {
    try {
        const books = await Book.find(); // Fetch all books
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});
router.get('/orders', async (request, response) => {
    try {
        console.log("Fetching orders using Order.find()...");  // ✅ Debug log
        const orders = await Order.find();
        console.log("Orders fetched:", orders);
        return response.status(200).json(orders); 
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

router.get('/:id',async(request,response)=>{
    try{
        const {id} = request.params
        const book= await Book.findById(id)
        return response.status(200).json(book)
    } catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})
router.get('/users/:id',async(request,response)=>{
    try{
        const {id} = request.params
        const cart= await User.findById(id)
        return response.status(200).json(cart)
    } catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})
router.get('/users/:id/cart',async(request,response)=>{
    try{
        const {id} = request.params
        const user= await User.findById(id)
        const cartItem=user.cart.items;
        console.log(cartItem[0])
        cartItem.forEach((item, index) => {
            console.log(`Cart Item ${index + 1}:`, item);
        });
        return response.status(200).json(user)
    } catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})
router.put("/users/:id/cart", async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity } = req.body.book;
        // console.log(productId)
        // console.log(quantity)
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingItem = user.cart.items.find((item) => item.productId.equals(productId));

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.items.push({ productId, quantity: quantity || 1 });
        }

        await user.save();
        res.status(200).json({ message: "Cart updated", cart: user.cart });

    } catch (error) {
        //console.log(req.body)
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
router.put('/:id', async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields: title, author, publishYear'
            });
        }
        const {id} = request.params
        const result = await Book.findByIdAndUpdate(id,request.body)
        if(!result){
            return response.status(404).json({message:'Book not found'})
        }
        return response.status(200).send({message:"Book updated successfully"})
    } catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }

})
router.delete('/:id', async(request,response)=>{
    try{
        const {id} = request.params
        const result= await Book.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message:'Book not found'})
        }
        return response.status(200).send({message:"Book deleted successfully"})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})
export default router;