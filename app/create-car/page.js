"use client"
import React from 'react'
import styles from "../page.module.css"
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
function CreateCar() {


    const addCarInitialValues = {
        kilometer: 0,
        plate: ''
    }
    //TODO: fix regex
    const addCarValidationSchema = Yup.object().shape({
        kilometer: Yup.number().required().moreThan(0), // >
        plate: Yup.string().required().min(2).matches(new RegExp("(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))")) // >=
    })

    return (
        <main className={styles.main}>
            <Formik
                initialValues={addCarInitialValues}
                validationSchema={addCarValidationSchema}
                onSubmit={(values) => console.log(values)}
            >

                <Form>

                <div className='form-group'>
                    <label>Kilometre</label>
                    <Field name="kilometer" className="form-control"></Field>
                </div>
                <div className='form-group'>
                    <label>Plaka</label>
                    <Field name="plate" className="form-control"></Field>
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
