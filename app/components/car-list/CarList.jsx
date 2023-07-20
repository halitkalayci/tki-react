import React from 'react';
import styles from './car-list.css';
import { Card } from 'primereact/card';
// props
function CarList(props) {
    return (
        <div className="card">
            <Card title={props.car.plate}>
                <img className="mw-100" src={props.car.image} />
                <p className="m-0">
                    ID: {props.car.id} <br />
                    KM: {props.car.kilometer}
                </p>
            </Card>
        </div>
    );
}

export default CarList;
