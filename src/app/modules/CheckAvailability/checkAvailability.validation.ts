export const checkDateFormate = (date: string) => {
   // Regular expression to match the date format YYYY-MM-DD
   const regex = /^\d{4}-\d{2}-\d{2}$/;

   // Check if the date string matches the format
   return regex.test(date);
};
