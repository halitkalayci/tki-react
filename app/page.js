"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import CarList from './components/car-list/CarList';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import axios from 'axios';
import axiosInstance from './utilities/axiosInterceptors';
// SSR - CSR 
// Component
// Functional Component - Class Based Component
// <div class="x"> </div>


// <link href="global.css"/>
// JSX içerisinde javascript yazmak istediğimizde {} kullanıyoruz
export default function Home() {
  let name = "Halit"; // API isteği?
  // Token'i decode edip?



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
  }, [count]); 
  // custom watcher

  useEffect(() => {
    fetchCarsFromAPI();
  },[]);

  const [cars, setCars] = useState({})
  const [pagination, setPagination] = useState({pageIndex:0, pageSize:2})

  const fetchCarsFromAPI = () => {
    axiosInstance.get('Cars?PageIndex=' + pagination.pageIndex + '&PageSize=' + pagination.pageSize)
    .then(response=> {
      setCars(response.data);
    })
  }

  useEffect(() => {
    fetchCarsFromAPI();
  },[pagination])

  const onPageChange = (e) => {
    setPagination({...pagination, pageIndex:e.page}) // async
    //fetchCarsFromAPI(); // async işlem bitmiş gibi
  }
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
      <div className='row'>
       {cars?.items?.map(car => <div key={car.id} className='col-3 mb-3'> 
        <CarList car={car}></CarList>
       </div>)}

       <div className='col-12'>
       <Paginator  rows={2} totalRecords={cars.count} onPageChange={onPageChange}  />
       </div>
      </div> 
    </main>
  )
}
// Component-Base
// Single Page Application => Javascript => React (Next.Js),Angular,Vue,Svelte
