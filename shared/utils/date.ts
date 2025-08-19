export const formatIndonesianDate = (date: string | Date): string => {
  const dateObj = new Date(date);

  const datePart = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC", // tetap UTC
  });

  const timePart = dateObj.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // tetap UTC
  });

  return `${datePart} ${timePart} WIB`; // tambah label WIB
};
