"use client"
import React, { useEffect } from 'react'
import styles from "../page.module.css"
function Location() {
    useEffect(() => {
        let locationInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log(pos)
            })
        }, 3000)

        setTimeout(() => {
            clearInterval(locationInterval);
        },30000)
    },[])
    return (
        <main className={styles.main}>

        </main>
    )
}

export default Location

// signalR 