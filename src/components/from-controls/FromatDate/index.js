const moment = require("moment");
const Thu = {
  Mon: "Thứ 2",
  Tue: "Thứ 3",
  Wed: "Thứ 4",
  Thu: "Thứ 5",
  Fri: "Thứ 6",
  Sat: "Thứ 7",
  Sun: "Chủ Nhật",
};
const Thang = {
  Jan: "Tháng 1",
  Feb: "Tháng 2",
  Mar: "Tháng 3",
  Apr: "Tháng 4",
  May: "Tháng 5",
  Jun: "Tháng 6",
  Jul: "Tháng 7",
  Aug: "Tháng 8",
  Sep: "Tháng 9",
  Oct: "Tháng 10",
  Nov: "Tháng 11",
  Dec: "Tháng 12",
};
module.exports.formatDateTimeVN = (time) => {
  const timeNew = moment(time).toString();
  const timeNewString = timeNew.split(" ");
  const objTimeNew = {
    thu: Thu[timeNewString[0]],
    thang: Thang[timeNewString[1]],
    ngay: timeNewString[2],
    nam: timeNewString[3],
    gio: timeNewString[4],
    muigio: timeNewString[5],
  };
  return objTimeNew;
};
module.exports.formatDateTimeISO = (time) => {
  const dateStartNew = time.split(" ")[0];
  return dateStartNew;
};
