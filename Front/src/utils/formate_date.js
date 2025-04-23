export const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return null;
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); 

  const formattedDate = date.toLocaleString("es-ES", {
    weekday: "long",  
    year: "numeric", 
    month: "long",  
    day: "numeric",  
    // hour: "2-digit",  
    // minute: "2-digit"
  });

  if (isSameDay(date, today)) {
    return "Hoy";
  }

  if (isSameDay(date, tomorrow)) {
    return "Mañana";
  }

  return `${formattedDate}`;
};

const isSameDay = (date1, date2) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};