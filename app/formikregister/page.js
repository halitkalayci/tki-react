"use client"
import React from 'react'
import styles from '../page.module.css'
import { Field, Form, Formik } from 'formik'
import { Button } from 'primereact/button'
function FormikRegister() {

    const initialValues = {
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
        email: '',
        ipAddress: ''
    }
    return (
        <main className={styles.main}>
            <Formik initialValues={initialValues} onSubmit={(values) => {
                console.log(values);
            }}>
                <Form>
                    <div className='form-group'>
                        <label>Ad</label>
                        <Field name="firstName" type="text" />
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