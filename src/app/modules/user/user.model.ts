import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser>({
    name  : {type : String, required : true},
    email  : {type : String, required : true, unique : true},
    phone  : {type : String, required : true},
    password  : {type : String, required : true, select: 0},
    role  : {type : String,enum : ['admin', 'user'], required : true},
    address  : {type : String, required : true},
    profileImage : {type : String, required : true}
})

userSchema.pre('save', async function(next){
    const userData = this
    userData.password = await bcrypt.hash(userData.password, Number(config.bcrypt_rounds))
    next()
})

userSchema.post('save', async function(doc, next){
    doc.password = ''
    next()
})

export const userModel = model<TUser>('user', userSchema)