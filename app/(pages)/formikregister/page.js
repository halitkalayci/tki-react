'use client';
import React, { useState } from 'react';
import styles from '../../page.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Steps } from 'primereact/steps';
function FormikRegister() {
    const [step, setStep] = useState(0)
    const steps = [
        {
            label: 'Kişisel Bilgiler'
        },
        {
            label: "Şifre"
        }
    ]
    const initialValues = {
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
        email: '',
        ipAddress: ''
    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required().min(2),
        lastName: Yup.string().required(),
        password: Yup.string().required(),
        passwordConfirm: Yup.string().required(),
        email: Yup.string().required()
    });
    return (
        <main className={styles.main}>
            <Steps readOnly={false} onSelect={(e) => setStep(e.index)} model={steps} activeIndex={step}></Steps>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                    if (step < 1) {
                        setStep(step + 1);
                    } else {
                        // submit..
                        console.log(values);
                    }
                }}
            >
                <Form>
                    {step == 0 && <><div className="form-group">
                        <label>Ad</label>
                        <Field className="form-control" name="firstName" type="text" />
                        <ErrorMessage name="firstName"></ErrorMessage>
                    </div>

                        <div className="form-group">
                            <label>Soyad</label>
                            <Field className="form-control" name="lastName" type="text" />
                        </div>

                        <div className="form-group">
                            <label>E-posta</label>
                            <Field className="form-control" name="email" type="text" />
                        </div></>}

                    {step == 1 && <> <div className="form-group">
                        <label>Şifre</label>
                        <Field className="form-control" name="password" type="password" />
                    </div>

                        <div className="form-group">
                            <label>Şifre Tekrar</label>
                            <Field className="form-control" name="passwordConfirm" type="password" />
                        </div>
                    </>
                    }
                    <div>
                        {
                            step < 1 ? <Button type='button' onClick={() => setStep(step + 1)} label={step < 1 ? 'İleri' : 'Kayıt Ol'} severity="info" className="w-100"></Button>
                                : <Button type='submit' label={step < 1 ? 'İleri' : 'Kayıt Ol'} severity="info" className="w-100"></Button>
                        }
                    </div>
                </Form>
            </Formik>
        </main>
    );
}

export default FormikRegister;
