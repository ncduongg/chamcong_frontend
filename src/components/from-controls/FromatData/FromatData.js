const { formatDateTimeISO } = require("../FromatDate")

module.exports.dataFormat = (data) => {
    const cloneData = [...data]
    const dataNew = []
    let ii = 0;
    let iii = 0;
    for (let i = 0; i < cloneData.length; i += iii) {
        const element = cloneData[i];
        const newItemArray = []
        iii = 0
        for (let k = ii; k < cloneData.length; k++) {
            const element2 = cloneData[k];
            if (formatDateTimeISO(element.date) === formatDateTimeISO(element2.date)) {
                newItemArray.push(element2)
                iii += 1
            }
            else {
                ii = ii + iii
                break;
            }

        }
        dataNew.push({
            date: element.date,
            dateEnd: newItemArray[newItemArray.length - 1].date,
            ...element,
        })
    }
    return dataNew
}