"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
// SSR - CSR 
// Component
// Functional Component - Class Based Component
// <div class="x"> </div>

// JSX içerisinde javascript yazmak istediğimizde {} kullanıyoruz
export default function Home() {
  let name = "Halit"; // API isteği?
  // Token'i decode edip?

  let cars = ["BMW", "TOGG", "Mercedes", "Fiat"]


  let clickFunction = () => {
    alert("Butona tıklandı.")
  }
  // forEach
  // map
  // jsx içerisinde iterasyonlar her zaman map ile yapılmalı.
  // iterasyon sonucu ortaya çıkan jsx elemanlarının parentina key value verilmeli
  let number = 0;
  // ekranda değişikliği takip edilmesi gereken (watchable)
  // değişkenler reactin belirlediği şekilde oluşturulmalı.

  // React Hooks => useX useY
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, [count]); // deplist

  useEffect(() => {
    console.log("sayfa  yüklendi");
  },[])
  // n adet useEffect n adet useState
  // watcher
  return (
    <main className={styles.main}>
      <p> Sayı: {count}  </p>
      <button onClick={() => {
        setCount(count + 1); // async ve await yok
      }}> Arttır </button>
      <br />
      <button onClick={() => {
        setCount(count - 1)
      }}> Azalt </button>
      <br />
      <button onClick={() => console.log(count)}>Konsola Yazdır</button>
    </main>
  )
}
