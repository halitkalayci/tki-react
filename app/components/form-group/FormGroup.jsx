'use client';
import { ErrorMessage, Field } from 'formik';
import React from 'react';

function FormGroup(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <Field onChange={props.onChange ?? (() => {})} type={props.type ?? 'text'} name={props.name} className="form-control"></Field>
            <ErrorMessage name={props.name}>
                {(error) => {
                    return <div className="text-danger">{error}</div>;
                }}
            </ErrorMessage>
        </div>
    );
}

export default FormGroup;
