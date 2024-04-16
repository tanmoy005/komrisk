import moment from "moment/moment";


export const DateFormatDDMMYYYY = (dateTime: string | undefined | null) => {
  // console.log('dateTime', dateTime);
  
  return dateTime && moment(dateTime).format("DD/MM/YYYY");
};

