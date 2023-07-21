"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from "../../../page.module.css"
import axiosInstance from '@/app/utilities/axiosInterceptors';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { AuthContext } from '@/app/contexts/AuthContext';
import './brandlist.css'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Form, Formik } from 'formik';
import FormGroup from '@/app/components/form-group/FormGroup';
function BrandList() {
    const [isLoading, setIsLoading] = useState(true);
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const authContext = useContext(AuthContext);
    const [brands, setBrands] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [imageBase64, setImageBase64] = useState("")
    const [globalFilter, setGlobalFilter] = useState("")
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

    const initialValues = {
        name: '',
        logo: ''
    }
    const getBase64 = (event) => {
        let reader = new FileReader();
        reader.onload = () => {
            setImageBase64(reader.result);
        };
        reader.onerror = (error) => {
            console.log('HATA: ', error);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    const submitAddForm = (values) => {
        let request = { ...values, logo: imageBase64 };
        axiosInstance.post("Brands", request).then(response => {
            authContext.showToastr({ severity: 'success', detail: "Marka başarıyla eklendi" });
            setAddDialogOpen(false);
            fetchBrands();
        })
    }

    const AddFormDialog = () => {
        return <>
            <Dialog header="Marka Ekle" visible={addDialogOpen} onHide={() => { setAddDialogOpen(false) }}>
                <Formik onSubmit={submitAddForm} initialValues={initialValues}>
                    <Form>
                        <FormGroup label="Marka Adı" name="name" type="text"></FormGroup>
                        <FormGroup onChange={(e) => getBase64(e)} label="Logo" name="logo" type="file"></FormGroup>
                        <Button className='mx-3' severity='danger' type='button' onClick={() => { setAddDialogOpen(false) }} label='Vazgeç'></Button>
                        <Button severity='info' type='submit' label='Kaydet'></Button>
                    </Form>
                </Formik>
            </Dialog>
        </>
    }

    const deleteAllSelected = () => {
        selectedBrands.forEach(brand => {
            axiosInstance.delete("brands/" + brand.id).then(response => {
            });
        })
        authContext.showToastr({ severity: 'success', detail: 'Seçilen tüm markalar silindi.' });
    }

    const dataTableHeader = () => {
        return <>
            <div className='row'>
                <div className='col-4'>
                    <Button onClick={() => { setAddDialogOpen(true) }} label='Yeni Ekle' className='w-100' severity='info'></Button>
                </div>
                <div className='col-4'>
                    <Button onClick={() => { deleteAllSelected() }} label='Seçilenleri Sil' className='w-100' severity='danger'></Button>
                </div>
                <div className='col-4'>
                    <input className='form-control' placeholder='Filter..' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
                </div>
            </div>
        </>
    }

    return (
        <>
            <main className={styles.main}>
                <DataTable globalFilter={globalFilter} onSelectionChange={(e) => setSelectedBrands(e.value)}
                    selection={selectedBrands} header={dataTableHeader}
                    onRowEditComplete={(e) => { rowEditCompleted(e) }} editMode='row' value={brands}
                    paginator rows={10}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column header="ID" field="id"></Column>
                    <Column editor={textEditor} header="Ad" field="name"></Column>
                    <Column editor={imgEditor} body={imageTemplate} header="Logo" field="logo"></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
                <AddFormDialog></AddFormDialog>
            </main>
        </>
    )
}

export default BrandList