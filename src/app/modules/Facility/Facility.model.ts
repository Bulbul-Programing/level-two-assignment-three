import { Schema, model } from 'mongoose';
import { TFacility } from './Facility.interface';

const facilitySchema = new Schema<TFacility>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, required: false, default: false },
});

export const facilityModel = model<TFacility>('facility', facilitySchema)