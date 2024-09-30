import { getAvailability } from "./checkAvilability.utils"


const checkAvailabilityIntoDB = async (date : string, facility : string) => {
   const availableTime = await getAvailability(date, facility)
   return availableTime
}

export const checkAvailabilityServer = {
    checkAvailabilityIntoDB
}