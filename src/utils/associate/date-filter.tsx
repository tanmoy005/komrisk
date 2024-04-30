import moment from "moment/moment";
import { hasValue } from "./has-value";


export const DateFormatDDMMYYYY = (dateTime: string | undefined | null) => {
  return dateTime && moment(dateTime).format("DD/MM/YYYY");
};

export const StringToDate = (dateTime: string) => {
  let timestamp = Date.parse(dateTime);
  const dateObj = new Date(timestamp);
  return dateObj;
};

export const StringToDateDDMMYYYY = (dateTime: string) => {
  var parts = dateTime.split('/');
  var splitData = parts.length > 1 ? parts : dateTime.split('-');
  var convertedDate = new Date(parseInt(splitData[2]), parseInt(splitData[1]) - 1, parseInt(splitData[0]));
  return convertedDate;
};
