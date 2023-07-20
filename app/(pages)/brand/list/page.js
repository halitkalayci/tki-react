"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from "../../../page.module.css"
import axiosInstance from '@/app/utilities/axiosInterceptors';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { AuthContext } from '@/app/contexts/AuthContext';
import './brandlist.css'
function BrandList() {
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthContext);
    const [brands, setBrands] = useState([])
    const [imageBase64, setImageBase64] = useState("")
    useEffect(() => {
        fetchBrands();
    }, [])

    useEffect(() => {
        if (brands && brands.length > 0)
            setIsLoading(false)
    }, [brands])

    const fetchBrands = () => {
        setIsLoading(true);
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
        return <input className='form-control' type="file" onChange={(e) => {
            {
                let reader = new FileReader();
                reader.onload = () => {
                    opt.editorCallback(reader.result)
                    setImageBase64(reader.result);
                };
                reader.onerror = (error) => {
                    console.log('HATA: ', error);
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }} />
    }

    const cellEditCompleted = (e) => {
        let request = {
            id: e.newRowData.id,
            name: e.newRowData.name,
            logo: ''
        }
        if (imageBase64 != null && imageBase64 != '') {
            request.logo = imageBase64;
        }
        setImageBase64("")
        axiosInstance.put("Brands", request).then(response => {
            authContext.showToastr({ severity: 'success', detail: 'Marka başarıyla güncellendi.' })
            fetchBrands();
        })
    }

    const rowEditCompleted = (e) => {
        setIsLoading(true);
        let request = {
            id: e.newData.id,
            name: e.newData.name,
            logo: ''
        }
        if (e.newData.logo.includes("base64")) {
            request.logo = e.newData.logo;
        }
        axiosInstance.put("Brands", request).then(response => {
            authContext.showToastr({ severity: 'success', detail: 'Marka başarıyla güncellendi.' })
            fetchBrands();
        })
    }
    return (
        <>
            {isLoading && <div class="overlay">
                <div class="overlay__inner">
                    <div class="overlay__content"><span class="spinner"></span></div>
                </div>
            </div>}
            <main className={styles.main}>
                <DataTable onRowEditComplete={(e) => { rowEditCompleted(e) }} editMode='row' value={brands} paginator rows={10}>
                    <Column header="ID" field="id"></Column>
                    <Column editor={textEditor} header="Ad" field="name"></Column>
                    <Column editor={imgEditor} body={imageTemplate} header="Logo" field="logo"></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </main>
        </>
    )
}

export default BrandList