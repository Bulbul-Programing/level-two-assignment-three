import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    facility : {type : Schema.Types.ObjectId, required : true},
    date : {type : String, required : true},
    startTime : {type : String, required : true},
    endTime : {type : String, required : true},
    user : {type : Schema.Types.ObjectId, required : false,},
    isBooked : {type : String , enum : ['confirmed','canceled'], default: 'confirmed'}
})

export const bookingModel = model<TBooking>('booking', bookingSchema)