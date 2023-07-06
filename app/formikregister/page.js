"use client"
import React from 'react'
import styles from '../page.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button } from 'primereact/button'
import * as Yup from "yup";
import { InputText } from 'primereact/inputtext'

function FormikRegister() {

    const initialValues = {
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
        email: '',
        ipAddress: ''
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required().min(2),
        lastName: Yup.string().required(),
        password: Yup.string().required(),
        passwordConfirm: Yup.string().required(),
        email: Yup.string().required()
    })
    return (
        <main className={styles.main}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={(values) => {
                console.log(values);
            }}>
                <Form>
                    <div className='form-group'>
                        <label>Ad</label>
                        <InputText  name="firstName" type="text" />
                        <ErrorMessage name="firstName"></ErrorMessage>
                    </div>

                    <div className='form-group'>
                        <label>Soyad</label>
                        <Field name="lastName" type="text" />
                    </div>

                    <div className='form-group'>
                        <label>E-posta</label>
                        <Field name="email" type="text" />
                    </div>

                    <div className='form-group'>
                        <label>Şifre</label>
                        <Field name="password" type="password" />
                    </div>

                    <div className='form-group'>
                        <label>Şifre Tekrar</label>
                        <Field name="passwordConfirm" type="password" />
                    </div>

                    <div>
                        <Button label='Kayıt Ol' severity='info' className='w-100'></Button>
                    </div>
                </Form>
            </Formik>
        </main>
    )
}

export default FormikRegister