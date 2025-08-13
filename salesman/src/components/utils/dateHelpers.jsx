import { format, parseISO, isValid, differenceInMinutes, addMinutes, subMinutes } from 'date-fns';

export const formatDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return '';
  return format(dateObj, 'dd/MM/yyyy HH:mm:ss');
};

export const formatTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return '';
  return format(dateObj, 'HH:mm:ss');
};

export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return '';
  return format(dateObj, 'dd/MM/yyyy');
};

export const getTimeDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInMinutes(end, start);
};

export const addMinutesToDate = (date, minutes) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addMinutes(dateObj, minutes);
};

export const subtractMinutesFromDate = (date, minutes) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return subMinutes(dateObj, minutes);
};

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  return checkDate >= start && checkDate <= end;
};

export const generateTimeRange = (startDate, endDate, intervalMinutes = 5) => {
  const times = [];
  let currentDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  while (currentDate <= end) {
    times.push(new Date(currentDate));
    currentDate = addMinutes(currentDate, intervalMinutes);
  }
  
  return times;
};

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const targetDate = typeof date === 'string' ? parseISO(date) : date;
  const diffMinutes = differenceInMinutes(now, targetDate);
  
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
  return `${Math.floor(diffMinutes / 1440)}d ago`;
};
