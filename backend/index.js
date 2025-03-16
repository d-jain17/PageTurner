import express, { request } from "express";
import cors from "cors"
import {PORT,mongoDBURL} from "./config.js"
import mongoose from 'mongoose'
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
const app=express()

app.use(express.json())
app.use(cors())
// app.use(
//     cors(
//         {
//             origin:'http://localhost:3000',
//             methods:['GET','POST','PUT','DELETE'],
//             allowedHeaders:['Content-Type'],
//         }
//     )
// )
app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("Welcome to mern stack tutorial. this is home")
})
app.use('/books',booksRoute)
mongoose.connect(mongoDBURL).then(()=>{
    console.log("App connected the the DB")
    console.log("works good")
    app.listen(PORT,()=>{
        console.log(`App is listening to${PORT}`)
    })
}).catch((error)=>{
console.log(error)
})

