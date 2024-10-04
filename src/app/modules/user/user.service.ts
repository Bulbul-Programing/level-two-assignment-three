import QueryBuilder from '../../builder/QueryBuilder';
import { facilitySearchAbleFields } from '../Facility/FacilityConst';
import { TUser } from './user.interface';
import { userModel } from './user.model';

const createNewUserIntoDB = async (payload: TUser) => {
  const createUser = await userModel.create(payload);
  const userData = await userModel
    .findById(createUser._id)
    .select({ password: 0 });
  return userData;
};

const getAllUserIntoDB = async (
  role: string,
  query: Record<string, unknown>,
) => {
  const userQuery = new QueryBuilder(userModel.find({ role }), query)
    .searching(facilitySearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceFilter();
  const result = await userQuery.modelQuery
  return result;
};

const isExistUserIntoDB = async (email: string) => {
  const result = await userModel.findOne({ email });
  return result;
};

const deleteUserIntoDB = async (id: string) => {
  const delateUser = await userModel.deleteOne({ _id: id });
  return delateUser;
};

export const userService = {
  createNewUserIntoDB,
  isExistUserIntoDB,
  getAllUserIntoDB,
  deleteUserIntoDB,
};
