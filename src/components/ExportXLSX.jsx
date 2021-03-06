
import React from 'react'
import Button from 'react-bootstrap/Button';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportXLSX = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToXLSX = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        console.log(csvData)
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="warning" onClick={(e) => exportToXLSX(csvData,fileName)}>Export Users to XLSX file</Button>
    )
}

export default ExportXLSX;