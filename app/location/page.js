"use client"
import React, { useEffect, useState } from 'react'
import styles from "../page.module.css"
function Location() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    useEffect(() => {
        let locationInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log(pos)
                setLatitude(pos.coords.latitude);
                setLongitude(pos.coords.longitude);
            })
        }, 3000)

        setTimeout(() => {
            clearInterval(locationInterval);
        },30000)
    },[])
    return (
        <main className={styles.main}>
            <p>Latitude {latitude}</p>
            <p>Longitude {longitude}</p>
        </main>
    )
}

export default Location

// signalR 
// PWA, Deployment
