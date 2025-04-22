export const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return null; 
  }

  return date.toLocaleString("es-ES", {
    weekday: "long",  
    year: "numeric", 
    month: "long",  
    day: "numeric",  
    // hour: "2-digit",  
    // minute: "2-digit",  
  });
};
