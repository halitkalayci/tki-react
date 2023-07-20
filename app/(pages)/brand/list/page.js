"use client"
import React, { useEffect, useState } from 'react'
import styles from "../../../page.module.css"
import axiosInstance from '@/app/utilities/axiosInterceptors';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
function BrandList() {
    const [brands, setBrands] = useState([])
    useEffect(() => {
        fetchBrands();
    }, [])

    const fetchBrands = () => {
        axiosInstance.get('brands/getall').then(response => {
            setBrands(response.data);
        })
    }

    const imageTemplate = (opt) => {
        return <img src={opt.logo} className='table-img' />
    }

    const textEditor = (opt) => {
        return <input className='form-control' type="text" value={opt.value} onChange={(e) => { opt.editorCallback(e.target.value) }} />
    }

    const imgEditor = (opt) => {
        console.log(opt);
        return <input className='form-control' type="file" onChange={(e) => { opt.editorCallback(e.target.value) }} />
    }

    const cellEditCompleted = (e) => {
        // axiosInstance.put()
    }

    return (
        <main className={styles.main}>
            <DataTable editMode='cell' value={brands} paginator rows={10}>
                <Column header="ID" field="id"></Column>
                <Column onCellEditComplete={(e) => { cellEditCompleted(e) }} editor={textEditor} header="Ad" field="name"></Column>
                <Column editor={imgEditor} body={imageTemplate} header="Logo" field="logo"></Column>
            </DataTable>
        </main>
    )
}

export default BrandList