"use client"
import React, { useEffect, useState } from 'react'
import styles from "../page.module.css"
import axiosInstance from '../utilities/axiosInterceptors';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
function Reports() {
  const [cars, setCars] = useState([])
  useEffect(() =>{
    fetchCars();
  }, [])

  const fetchCars = () => {
    axiosInstance.get("Cars/getall").then(response => {
        setCars(response.data);
    })
  }


  const imageColumnTemplate = (row) => {
    return <img className='table-img' src={row.image}></img>
  }

  const headerTemplate = () => {
    return <div> <Button onClick={exportExcel} label='Export Excel' severity='info'></Button> </div>
  }

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
        if (module && module.default) {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });

            module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }
    });
};

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
        // databaseden raporlanacak veriyi tekrar al.
        console.log(cars);
        const worksheet = xlsx.utils.json_to_sheet(cars);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'cars');
    });
  }


  // npm install xlsx jspdf jspdf-autotable
  // Client Side Pagination
  return (
    <main className={styles.main}>
        <DataTable header={headerTemplate} value={cars} paginator rows={5} rowsPerPageOptions={[5,10,20,30]}>
            <Column field='id' header="#"></Column>
            <Column field='kilometer' header="Kilometre"></Column>
            <Column field='plate' header="Plaka"></Column>
            <Column field='image' header="Image" body={imageColumnTemplate}></Column>
        </DataTable>
    </main>
  )
}

export default Reports