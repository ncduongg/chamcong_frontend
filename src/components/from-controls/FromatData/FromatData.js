const { formatDateTimeISO } = require("../FromatDate");

module.exports.dataFormat = (data) => {
  const cloneData = [...data];
  const dataNew = [];
  let ii = 0;
  let iii = 0;
  for (let i = 0; i < cloneData.length; i += iii) {
    const element = cloneData[i];
    const newItemArray = [];
    iii = 0;
    for (let k = ii; k < cloneData.length; k++) {
      const element2 = cloneData[k];
      if (
        formatDateTimeISO(element.date) === formatDateTimeISO(element2.date)
      ) {
        newItemArray.push(element2);
        iii += 1;
      } else {
        ii = ii + iii;
        break;
      }
    }
    dataNew.push({
      date: element.date,
      dateEnd: newItemArray[newItemArray.length - 1].date,
      ...element,
    });
  }
  return dataNew;
};
module.exports.dataFormatEx = (data) => {
  const doneArray = [];
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let newArrayItemByID = [];
    for (let k = i; k < data.length; k++) {
      if (data[i].idUser === data[k].idUser) {
        newArrayItemByID.push(data[k]);
      }
      if (data[i].idUser !== data[k].idUser) {
        i = k - 1;
        doneArray.push(newArrayItemByID);
        break;
      }
    }
  }
  return doneArray;
};
const dateFormatAPI = (data) => {
  const newDate = data.split("T")[0];
  const newTime = data.split("T")[1].slice(0, 5);
  return newDate + " " + newTime;
};
