import { getAvailability } from "./checkAvilability.utils"


const checkAvailabilityIntoDB = async (date : string) => {
   const availableTime = await getAvailability(date)
   return availableTime
}

export const checkAvailabilityServer = {
    checkAvailabilityIntoDB
}