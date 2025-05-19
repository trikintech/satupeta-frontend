/**
 * Format date to Indonesian format with timezone
 * @param date - Date to format
 * @param timezone - Timezone to display (default: 'WIB')
 * @returns Formatted date string in Indonesian format
 * @example
 * formatIndonesianDate('2024-03-15T14:30:00Z') // returns "15 Maret 2024 14:30 WIB"
 */
export const formatIndonesianDate = (
  date: string | Date,
  timezone: "WIB" | "WITA" | "WIT" = "WIB"
): string => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${timezone}`;
};
