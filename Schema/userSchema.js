import mongoose from "mongoose";
const {Schema,model} = mongoose

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

})
export const UserModel = model('user_db',userSchema)
