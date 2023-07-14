"use client"
import React, { useEffect, useState } from 'react'
import styles from "../page.module.css"
import axiosInstance from '../utilities/axiosInterceptors';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

  // Client Side Pagination
  return (
    <main className={styles.main}>
        <DataTable value={cars} paginator rows={5} rowsPerPageOptions={[5,10,20,30]}>
            <Column field='id' header="#"></Column>
            <Column field='kilometer' header="Kilometre"></Column>
            <Column field='plate' header="Plaka"></Column>
            <Column field='image' header="Image" body={imageColumnTemplate}></Column>
        </DataTable>
    </main>
  )
}

export default Reports