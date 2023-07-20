'use client';
import React, { useContext, useState } from 'react';
import styles from '../../../page.module.css';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import axiosInstance from '@/app/utilities/axiosInterceptors';
import FormGroup from '@/app/components/form-group/FormGroup';
import { AuthContext } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
function CreateCar() {
    const [imageBase64, setImageBase64] = useState('');
    const authContext = useContext(AuthContext)
    const navigate = useRouter();
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
                        authContext.showToastr({ severity: 'success', detail: 'Araba eklendi' })
                        navigate.push("/car/list")
                    });
                }}
            >
                <Form>
                    <FormGroup onChange={onImageChange} type="file" name="image" label="Resim" />
                    <FormGroup type="text" name="kilometer" label="Kilometre" />
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
