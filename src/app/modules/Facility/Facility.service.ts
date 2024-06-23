import { TFacility } from "./Facility.interface";
import { facilityModel } from "./Facility.model";


const creteFacilityIntoDB = async (payload : TFacility) => {
    const result = await facilityModel.create(payload)
    return result
}



export const facilityService = {
    creteFacilityIntoDB
}