export const calculateHours = (startTime : string, endTime : string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;

    const [endHour, endMinute] = endTime.split(':').map(Number);
    const endTotalMinutes = endHour * 60 + endMinute;

    const differenceInMinutes = endTotalMinutes - startTotalMinutes;

    // Convert minutes back to hours
    const differenceInHours = differenceInMinutes / 60;

    return differenceInHours;
}