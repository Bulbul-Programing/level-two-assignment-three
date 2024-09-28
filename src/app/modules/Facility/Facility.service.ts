import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TFacility } from './Facility.interface';
import { facilityModel } from './Facility.model';
import { facilitySearchAbleFields } from './FacilityConst';

const getAllFacilityIntoDb = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(facilityModel.find(), query)
    .searching(facilitySearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceFilter()
    .futureField();
  const result = await facilityQuery.modelQuery
  return result;
};

const creteFacilityIntoDB = async (payload: TFacility) => {
  const result = await facilityModel.create(payload);
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const isExistFacility = await facilityModel.findById(id);

  if (!isExistFacility) {
    throw new AppError(404, 'facility not found!');
  }

  const result = await facilityModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFacilityIntoDB = async (id: string) => {
  const isExistFacility = await facilityModel.findById(id);

  if (!isExistFacility) {
    throw new AppError(404, 'facility not found!');
  }

  const result = await facilityModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const facilityService = {
  creteFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityIntoDB,
  getAllFacilityIntoDb,
};
