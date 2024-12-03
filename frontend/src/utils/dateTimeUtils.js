import { format, addMinutes, differenceInDays, differenceInHours, isPast, isToday } from 'date-fns';

export const formatEventDateTime = (startTime, duration) => {
  const startDate = new Date(startTime);
  const endDate = addMinutes(startDate, duration);

  // Format date as "MM/dd/yyyy"
  const formattedDate = format(startDate, 'MM/dd/yyyy');

  // Format time as "h a" and combine start and end times
  const formattedTime = `${format(startDate, 'h a')} — ${format(endDate, 'h a')}`;

  return { formattedDate, formattedTime };
};

export const calculateTimeUntilEvent = (eventTime, duration) => {
  const now = new Date();
  const eventStart = new Date(eventTime);
  const eventEnd = addMinutes(eventStart, duration);

  if (isToday(eventStart) && differenceInHours(eventStart, now) === 0) {
    return "now";
  }

  if (isPast(eventEnd)) {
    return "happened";
  }

  const days = differenceInDays(eventStart, now);
  const hours = differenceInHours(eventStart, now) % 24;

  return `in ${days} days ${hours} hours`;
}; 