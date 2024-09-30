import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    facility : {type : Schema.Types.ObjectId, required : true, ref: 'facility'},
    date : {type : String, required : true},
    startTime : {type : String, required : true},
    endTime : {type : String, required : true},
    payableAmount : {type : Number , required : false},
    user : {type : Schema.Types.ObjectId, required : false, ref : 'user'},
    isBooked : {type : String , enum : ['confirmed','canceled'], default: 'confirmed'}
},{timestamps : true})

export const bookingModel = model<TBooking>('booking', bookingSchema)