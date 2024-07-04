import { bookingModel } from '../Booking/booking.model';
import { TAvailableTime } from './checkAvailability.interface';

export const getAvailability = async (date: string) => {
  const findBookingThisDate = await bookingModel
    .find({ date })
    .sort({ startTime: 1 });

  if (findBookingThisDate.length < 1) {
    const availableTime: TAvailableTime[] = [
      {
        startTime: '00:00',
        endTime: '23:59',
      },
    ];
    return availableTime;
  }

  const availableTime: TAvailableTime[] = [];
  let endTime: string = '';
  findBookingThisDate.forEach((booking) => {
    const time: TAvailableTime = {
      startTime: availableTime.length < 1 ? '00:00' : endTime,
      endTime: `${booking.startTime}`,
    };
    endTime = booking.endTime;
    availableTime.push(time);
  });
  const lastSlot: TAvailableTime = {
    startTime: endTime,
    endTime: '23:59',
  };
  availableTime.push(lastSlot);
  return availableTime;
};
