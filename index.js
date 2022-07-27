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


app.get('/Users',async(req,res) => {
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

app.get('/Users',async(req,res) =>{
    const id = {_id:req.params.id}
    const Users = await UserModel.findOne(id)
    if (Users){
        res.status(200).json({
            message: 'User found',
            User: Users
        })
    }
    else{
        res.status(404).json({
            message:'User not found'
        })
    }
})

app.post('/user', async(req,res) =>{
    const {username, email,pasword} = req.body
    const newUser = await UserModel.create({username,email,pasword,})
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






app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})