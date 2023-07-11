"use client"
import React, { useState } from 'react'
import styles from "../page.module.css"
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import axiosInstance from '../utilities/axiosInterceptors';
function CreateCar() {

    const [imageBase64, setImageBase64] = useState("");

    const addCarInitialValues = {
        kilometer: 0,
        plate: ''
    }
    //TODO: fix regex
    const addCarValidationSchema = Yup.object().shape({
        kilometer: Yup.number().required().moreThan(0), // >
        plate: Yup.string().required().min(2)
        .matches(/(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))/, 'Lütfen düzgün bir Türkiye plakası giriniz.'),
    })

    const onImageChange = (event) => {
        console.log(event);
        let reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result); //base64
            setImageBase64(reader.result);
        }
        reader.onerror = (error) => {
            console.log("HATA: ", error)
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    // resim upload
    return (
        <main className={styles.main}>
            <Formik
                initialValues={addCarInitialValues}
                validationSchema={addCarValidationSchema}
                onSubmit={(values) => {
                    axiosInstance.post('Cars',{...values, image:imageBase64})
                    .then(response=>{
                        // kullanıcıyı uyarmak.
                    })
                }}
            >
                <Form>

                <div className='form-group'>
                    <label>Resim</label>
                    <Field onChange={onImageChange} type="file" name="image" className="form-control"></Field>
                    <ErrorMessage name='image'></ErrorMessage>
                </div>

                <div className='form-group'>
                    <label>Kilometre</label>
                    <Field name="kilometer" className="form-control"></Field>
                    <ErrorMessage name='kilometer'></ErrorMessage>
                </div>
                <div className='form-group'>
                    <label>Plaka</label>
                    <Field name="plate" className="form-control"></Field>
                    <ErrorMessage name='plate'></ErrorMessage>
                </div>
                <div>
                    <Button type='submit' label='Ekle' severity='info' className='w-100'></Button>
                </div>
                </Form>


            </Formik>
        </main>
    )
}

export default CreateCar
