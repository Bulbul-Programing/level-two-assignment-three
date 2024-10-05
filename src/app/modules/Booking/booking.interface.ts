import { Types } from "mongoose"

export type TBooking = {
    facility : Types.ObjectId
    date : string
    startTime : string
    endTime : string
    user ?: Types.ObjectId
    payableAmount ?: number
    isBooked : 'confirmed' | 'canceled'
    paymentStatus : string,
    transitionId : string
}
export type TUpdateBooking = {
    facility : string
    _id : Types.ObjectId
    date ?: string
    startTime ?: string
    endTime ?: string
    isBooked ?: 'confirmed' | 'canceled'
    payableAmount ?: number
}

export type TDateAdnTime = {
    date : string
    startTime : string
    endTime : string
}