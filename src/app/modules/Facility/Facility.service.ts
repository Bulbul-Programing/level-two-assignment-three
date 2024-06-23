import AppError from "../../error/AppError";
import { TFacility } from "./Facility.interface";
import { facilityModel } from "./Facility.model";


const creteFacilityIntoDB = async (payload : TFacility) => {
    const result = await facilityModel.create(payload)
    return result
}

const updateFacilityIntoDB = async (id : string ,payload : Partial<TFacility>) => {
    const isExistFacility = await facilityModel.findById(id)

    if(!isExistFacility){
        throw new AppError(404, 'facility not found!')
    }

    const result = await facilityModel.findOneAndUpdate({_id : id}, payload, {new : true})
    return result
}

const deleteFacilityIntoDB = async (id : string) => {
    const isExistFacility = await facilityModel.findById(id)

    if(!isExistFacility){
        throw new AppError(404, 'facility not found!')
    }

    const result = await facilityModel.findByIdAndUpdate(id, {isDeleted : true}, {new : true})
    return result
}



export const facilityService = {
    creteFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityIntoDB
}