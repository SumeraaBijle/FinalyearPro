// models/User.js
import mongoose from 'mongoose';
import { type } from 'os';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // type:{
    //     type:String,
    //     default:"user",
    //     require:true,
    //      enum:["user","admin"]  
    // }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
