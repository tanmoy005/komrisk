import moment from "moment/moment";
import { hasValue } from "./has-value";


export const DateFormatDDMMYYYY = (dateTime: string | undefined | null) => {
  // console.log('dateTime', dateTime);

  return dateTime && moment(dateTime).format("DD/MM/YYYY");
};

export const StringToDate = (dateTime: string) => {
  // console.log('dateTime', dateTime);
  let timestamp = Date.parse(dateTime);
  const dateObj = new Date(timestamp);
  return dateObj;
};

