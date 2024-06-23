import { Types } from "mongoose"

export type TBooking = {
    facility : Types.ObjectId
    date : string
    startTime : string
    endTime : string
    user ?: Types.ObjectId
    isBooked : 'confirmed' | 'canceled'
}

export type TDateAdnTime = {
    date : string
    startTime : string
    endTime : string
}