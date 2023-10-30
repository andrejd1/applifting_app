import { format } from "date-fns";

export const formatStringDate = (
  dateString: string,
  formatPattern: string = "MM/dd/yy",
): string => {
  const date = new Date(dateString);
  return format(date, formatPattern);
};
