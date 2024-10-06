import config from '../../config';
import SSLCommerzPayment from 'sslcommerz-lts';
import { TBooking, TDateAdnTime } from '../Booking/booking.interface';
import { facilityModel } from '../Facility/Facility.model';
import { userModel } from '../user/user.model';
import AppError from '../../error/AppError';
import { calculateHours } from '../Booking/booking.utils';
import { ObjectId } from 'mongodb';
import { bookingModel } from '../Booking/booking.model';
import timeConflict from '../../utils/timeConflict';

const store_id = config.sslcommerzStoreId;
const store_passwd = config.sslcommerzSecretId;
const is_live = false;

const paymentProcessIntoDB = async (
  userData: Record<string, unknown>,
  payload: TBooking,
) => {
  // checking user exist
  const user = await userModel.findOne({ email: userData });

  if (!user) {
    throw new AppError(404, 'user not found');
  }
  payload.user = user._id;

  // checking facility is existing
  const isFacilityExist = await facilityModel.findOne({
    _id: payload.facility,
  });

  if (!isFacilityExist) {
    throw new AppError(404, 'Facility not found');
  }

  const dateAndTime: TDateAdnTime = {
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  // checking schedule is available in this time
  const existSchedule = await timeConflict(
    dateAndTime,
    payload.facility.toString(),
  );
  if (existSchedule) {
    throw new AppError(
      500,
      'This facility is not available at that time ! chose another time or day.',
    );
  }

  const totalHours = calculateHours(payload.startTime, payload.endTime);

  payload.payableAmount = Number(
    (totalHours * isFacilityExist.pricePerHour).toFixed(2),
  );
  // creating transitions id
  const tran_id = new ObjectId().toString();

  const data = {
    total_amount: payload.payableAmount,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `https://assignment-three-sable.vercel.app/api/bookings/updateBooking/payment/${tran_id}?status=paid`,
    fail_url: `https://assignment-three-sable.vercel.app/api/payment/redirect/paymentFelid`,
    cancel_url: 'https://assignment-three-sable.vercel.app/api/payment/redirect/facility',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address,
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: user.phone,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const generateLink = async () => {
    const res = await sslcz.init(data).then((apiResponse: any) => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      return GatewayPageURL;
    });
    return res;
  };
  payload.paymentStatus = 'unpaid';
  payload.transitionId = tran_id;

  const addBooking = await bookingModel.create(payload);

  const url = await generateLink();
  return url;
};

export const paymentGatewayService = {
  paymentProcessIntoDB,
};
