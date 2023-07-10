"use client"
import styles from './page.module.css'
import { useContext, useEffect, useState } from 'react';
import CarList from './components/car-list/CarList';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import axiosInstance from './utilities/axiosInterceptors';
import { AuthContext } from './contexts/AuthContext';
import { Dialog } from 'primereact/dialog';
import QRCode from 'react-qr-code';

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
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(authContext.getDecodedToken());
    fetchCarsFromAPI();
  }, []);

  const [cars, setCars] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 2 })
  const fetchCarsFromAPI = () => {
    axiosInstance.get('Cars?PageIndex=' + pagination.pageIndex + '&PageSize=' + pagination.pageSize)
      .then(response => {
        setCars(response.data);
      })
  }

  useEffect(() => {
    fetchCarsFromAPI();
  }, [pagination])

  const onPageChange = (e) => {
    setPagination({ ...pagination, pageIndex: e.page }) // async
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

  const [dialogVisible, setDialogVisible] = useState(false);
  const [qrCodeKey, setQrCodeKey] = useState("")
  const [otpVerifyCode, setOtpVerifyCode] = useState("")
  const enableOtp = () => {
    axiosInstance.post("Auth/enable-otp").then(response => {
      let securityKey = response.data.securityKey;
      let qrKey = "otpauth://totp/TKIRentACar?secret=" + securityKey;
      setQrCodeKey(qrKey);
      setDialogVisible(true);
    })
  }

  const verifyOtp = () => {
      console.log(otpVerifyCode);
      axiosInstance.post("Auth/verify-otp", {code:otpVerifyCode, userId:0}).then(response => {
        console.log(response);
      })
  }

  const enableEmailOtp = () => {
      axiosInstance.post("Auth/enable-email-otp").then(response => {
         authContext.showToastr({severity:"success", summary:'Başarılı' ,detail:"Email gönderildi."})
      })
  }
  return (
    <main className={styles.main}>
      <div className='row'>
        <div className='col-12 mb-3'>
          <Button onClick={enableOtp} label='OTP Aktif Et' severity='info'> </Button>
          <Button className='mx-2' onClick={enableEmailOtp} label='Email OTP Aktif Et' severity='info'> </Button>
        </div>

        {cars?.items?.map(car => <div key={car.id} className='col-3 mb-3'>
          <CarList car={car}></CarList>
        </div>)}

        <div className='col-12'>
          <Paginator rows={2} totalRecords={cars.count} onPageChange={onPageChange} />
        </div>


      </div>

      <Dialog visible={dialogVisible} header="OTP Aktif Et">
        <form>
          <QRCode value={qrCodeKey}></QRCode>
          <div className='form-group'>
            <label>OTP Code</label>
            <input value={otpVerifyCode} onChange={(e) => { setOtpVerifyCode(e.target.value) }} className="form-control" type="text" />
          </div>
          <div>
            <Button type='button' onClick={() => { setDialogVisible(false) }} label='Vazgeç' severity='danger'></Button>
            <Button type='button' onClick={verifyOtp} label='Onayla' severity='info'></Button>
          </div>
        </form>
      </Dialog>
    </main>
  )
}
// Component-Base
// Single Page Application => Javascript => React (Next.Js),Angular,Vue,Svelte
