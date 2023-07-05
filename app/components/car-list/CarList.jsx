import React from 'react'
import styles from './car-list.css'

// props
function CarList(props) {
  return (
    <div>
        <p>Araba Markası : {props.brand}</p>
        <p>Araba Modeli : {props.model}</p>
        <p>Araba Yılı : {props.year}</p>
    </div>
  )
}

export default CarList
