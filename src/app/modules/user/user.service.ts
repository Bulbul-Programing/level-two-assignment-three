import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createNewUserIntoDB = async(payload : TUser) => {
    const createUser = await userModel.create(payload)
    const userData = await userModel.findById(createUser._id).select({password : 0})
    return userData
}

const getAllUserIntoDB = async (role : string) =>{
    const result = await userModel.find({role})
    return result
}

const isExistUserIntoDB = async (email : string) => {
    const result = await userModel.findOne({email})
    return result
}

export const userService = {
    createNewUserIntoDB,
    isExistUserIntoDB,
    getAllUserIntoDB
}