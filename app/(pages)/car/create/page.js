'use client';
import React, { useState } from 'react';
import styles from '../../../page.module.css';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import axiosInstance from '@/app/utilities/axiosInterceptors';
import FormGroup from '@/app/components/form-group/FormGroup';
function CreateCar() {
    const [imageBase64, setImageBase64] = useState('');

    const addCarInitialValues = {
        kilometer: 0,
        plate: ''
    };
    //TODO: fix regex
    const addCarValidationSchema = Yup.object().shape({
        kilometer: Yup.number().required().moreThan(0), // >
        plate: Yup.string()
            .required()
            .min(2)
            .matches(/(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))/, 'Lütfen düzgün bir Türkiye plakası giriniz.')
    });

    const onImageChange = (event) => {
        console.log(event);
        let reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result); //base64
            setImageBase64(reader.result);
        };
        reader.onerror = (error) => {
            console.log('HATA: ', error);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    // resim upload
    return (
        <main className={styles.main}>
            <Formik
                initialValues={addCarInitialValues}
                validationSchema={addCarValidationSchema}
                onSubmit={(values) => {
                    axiosInstance.post('Cars', { ...values, image: imageBase64 }).then((response) => {
                        // kullanıcıyı uyarmak.
                    });
                }}
            >
                <Form>
                    <FormGroup type="file" name="image" label="Resim" />
                    <FormGroup type="number" name="kilometer" label="Kilometre" />
                    <FormGroup name="plate" label="Plaka" />
                    <div>
                        <Button type="submit" label="Ekle" severity="info" className="w-100"></Button>
                    </div>
                </Form>
            </Formik>
        </main>
    );
}

export default CreateCar;
