import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import {UserModel} from './Schema/userSchema.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

const db = process.env.DB_URL

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to MongoDB')
})



// landing page
app.get('/',(req,res) =>{
res.send('Welcome to user webservice')
})


app.get('/users',async(req,res) => {
    const Users = await UserModel.find({})
    if(Users){
        res.status(200).json({
            message: ' Users found',
            users:Users
        })
    }
    else{
        res.status(404).json({
            message:'Users not found'
        })
    }
})
 // fetching a user by id
app.get('/users/:id',async(req,res) =>{
    const {id} = req.params
    const User = await UserModel.findById(id)
    if (User){
        res.status(200).json({
            message: 'User found',
            User: User
        }) 
    }
    else{
        res.status(404).json({
            message:'User not found'
        })
    }
})

app.post('/user', async(req,res) =>{
    const {username, email,password} = req.body
    const newUser = await UserModel.create({
        username
        ,email 
        ,password,})
    if (newUser){
        res.status(200).json({
            message: 'user created',
            user:newUser
        })
    }
    else{
        res.status(404).json({
            message:'unable to create user'
        })
    }

})

// update user
app.patch('/user/:id', async(req,res) =>{
    const {id} = req.params
    const {username, email} = req.body

    const updateUser = await UserModel.updateOne({
        username,
        email
    }).where({id})

    if (updateUser){
        res.status(200).json({
            message: 'user updated',
            user:updateUser
        })
    }
    else{
        res.status(404).json({
            message:'unable to update user'
        })
    }

})
app.delete('/users/:id',async(req,res) =>{
    const {id} = req.params
    const deleteUser = await UserModel.findByIdAndDelete(id)

    if (deleteUser){
        res.status(200).json({
            message: 'user deleted',
            user:deleteUser
        })
    }
    else{
        res.status(404).json({
            message:'unable to delete user'
        })
    }
})






app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})