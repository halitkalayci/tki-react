"use client"
import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'
import axios from 'axios'
function Login() {
  // HTTP Isteği

  // fetch => js built-in
  // axios => kütüphane

  // .then => başarılı bir cevap geldiği an çalışacak fonksiyon
  // .catch => başarısız bir cevap geldiği an çalışacak fonksiyon
  // .finally => istek karşısında herhangi bir cevap alındığında çalışan

  const [carCount, setCarCount] = useState(0)
//   useEffect(() => {
//     fetch("https://localhost:7206/api/Cars?PageIndex=0&PageSize=20")
//         .then((response)=> response.json())
//         .then(json => setCarCount(json.items.length));
//   }, [])
  

  return (
    <main className={styles.main}>
        <h3>Login Page</h3>
        <h3>Databasede toplam {carCount} adet araba var.</h3>
    </main>
  )
}

export default Login

// react-router => ek paket