import { TFacility } from "./Facility.interface";
import { facilityModel } from "./Facility.model";


const creteFacilityIntoDB = async (payload : TFacility) => {
    const result = await facilityModel.create(payload)
    return result
}

const updateFacilityIntoDB = async (id : string ,payload : Partial<TFacility>) => {
    const result = await facilityModel.findOneAndUpdate({_id : id}, payload, {new : true})
    return result
}



export const facilityService = {
    creteFacilityIntoDB,
    updateFacilityIntoDB
}