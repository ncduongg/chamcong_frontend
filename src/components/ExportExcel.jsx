import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import { dataFormat } from './from-controls/FromatData/FromatData';
import moment from 'moment';
import { formatDateTimeVN } from './from-controls/FromatDate';
import { opts } from 'commander';
import { useSnackbar } from 'notistack';
export const ExportCSV = ({ csvData,titleButton,fileNameStart}) => {
    const { enqueueSnackbar } = useSnackbar();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData) => {
        if(csvData.length <= 0) {
            enqueueSnackbar("Chưa có dữ liệu nào được lọc ra, không thể in", {
                variant: 'error',
            });
            return;
        }
        const newCSVData = csvData.map(x => {
            const date = moment(x.date).toString()
            const dateEnd = moment(x.dateEnd).toString()
            const newDate = formatDateTimeVN(date);
            const newDateEnd = formatDateTimeVN(dateEnd);
            const newObj = {
                "Mã Nhân Viên": x.idUser,
                "Tên Nhân Viên": x.nameUser,
                "Giờ Vào": newDate.gio,
                "Giờ Ra" : newDate.gio === newDateEnd.gio ? "NaN" : newDateEnd.gio,
                "Thứ": newDate.thu,
                "Ngày":newDate.ngay,
                "Tháng":newDate.thang,
                "Năm":newDate.nam
                
            }
            return newObj
        })
        const fileStart = fileNameStart ? fileNameStart : newCSVData[0]["Tên Nhân Viên"]
        const fileName = "["+ fileStart + "][" + newCSVData[0]["Ngày"] + "/"+ newCSVData[0]["Tháng"] + "/"+newCSVData[0]["Năm"]+ "-"+ newCSVData[newCSVData.length - 1]["Ngày"] + "/"+ newCSVData[newCSVData.length - 1]["Tháng"] + "/" + newCSVData[newCSVData.length - 1]["Năm"] + "][" + moment() + "]"
        
        const ws = XLSX.utils.json_to_sheet(newCSVData,opts)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="contained" onClick={(e) => exportToCSV(csvData)}>{titleButton}</Button>
    )
}