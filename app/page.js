"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import CarList from './components/car-list/CarList';

import { Button } from 'primereact/button';
import axios from 'axios';
// SSR - CSR 
// Component
// Functional Component - Class Based Component
// <div class="x"> </div>


// <link href="global.css"/>
// JSX içerisinde javascript yazmak istediğimizde {} kullanıyoruz
export default function Home() {
  let name = "Halit"; // API isteği?
  // Token'i decode edip?

  let cars = ["BMW", "TOGG", "Mercedes", "Fiat"]


  const clickFunction = () => {
    alert("Butona tıklandı.")
  }
  // forEach
  // map
  // jsx içerisinde iterasyonlar her zaman map ile yapılmalı.
  // iterasyon sonucu ortaya çıkan jsx elemanlarının parentina key value verilmeli

  // ekranda değişikliği takip edilmesi gereken (watchable)
  // değişkenler reactin belirlediği şekilde oluşturulmalı.

  // React Hooks => useX useY
  // useEffect => sayfa açılışı ve depList'deki değerlerin değişimini takip etme olanağı
  let number = 0; // klasik javascript variable tanımlama syntaxi
  const [count, setCount] = useState(0);
      // getter  setter

  useEffect(() => {
    console.log(count);
    axios.get("https://localhost:7206/api/Cars?PageIndex=0&PageSize=20", 
    {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')} })
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
  }, [count]); 
  // custom watcher

  useEffect(() => {
    
  },[]);
  // n adet useEffect n adet useState
  // watcher

  // class => className 

  // tek bir dosyada html içinde js çalıştırabilmek
  // {}
  // CTRL + SPACE => Intellisense'i trigger eder

  // Arrow Anonm. Function =>  () => {}
  // Classic Anonm. Function => function() { }
  
  // Arrow Function => const increase = () => {}
  // Classic Function => function increase() {}
  
  return (
    <main className={styles.main}>
      <p> Sayı: {count}  </p>
      <Button label="Arttır" icon="pi pi-check" />
      <button onClick={() => {
        setCount(count + 1);
      }}> Arttır </button>
      <br />
      <button onClick={() => {
        setCount(count - 1)
      }}> Azalt </button>
      <br />
      <button onClick={() => console.log(count)}>Konsola Yazdır</button>

      <p>************</p>

      <p> Sayı: {number}  </p>
      <button onClick={() => {
        number++
      }}> Arttır </button>
      <br />
      <button onClick={() => {
        number--
      }}> Azalt </button>
      <br />
      <button onClick={() => console.log(number)}>Konsola Yazdır</button>



      <CarList brand="BMW" model="520" year="2023" /> 
      <CarList brand="Mercedes" model="e60" year="2012"/> 

    </main>
  )
}
// Component-Base
// Single Page Application => Javascript => React (Next.Js),Angular,Vue,Svelte
