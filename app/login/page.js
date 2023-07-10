"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './login.css';
import styles from '../page.module.css'
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';
import jwt_decode from "jwt-decode";
import axiosInstance from '../utilities/axiosInterceptors';
import { Dialog } from 'primereact/dialog';
// Folder Structure Routing
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

    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log(authContext);
    }, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [emailOtp, setEmailOtp] = useState("");
    // useReference => react'daki elementlerin referans olarak bir değişkene atanması işlevi
    // başlangıç genelde null olur => site yüklenene kadar reference boş
    const toastReference = useRef(null);
    const navigate = useRouter();
    const [showEmailPopup, setShowEmailPopup] = useState(false)
    const submit = (withEmail=false) => {
        //console.log( { email: email, password: password } );

        let object = { email, password, authenticatorCode: otp };
        if (withEmail==true)
            object.authenticatorCode = emailOtp;

        console.log(object);

        axiosInstance.post("Auth", object)
            .then(response => {
                // gelen cevaptan tokeni okuma
                if (response.data.requiredAuthenticatorType
                    == 1 && response.data.accessToken == null) {
                    // Dialog açıp
                    setShowEmailPopup(true);
                }
                let token = response.data.accessToken.token;
                localStorage.setItem('token', token);
                navigate.push("/")
                authContext.setIsAuthenticated(true);
            });
    }

    // one way data binding 
    // two way data binding
    return (
        <main className={styles.main}>
            <h3>Login Page</h3>
            <form>
                <div className='form-group'>
                    <label>E-posta</label>
                    <InputText onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='E-posta' />
                </div>
                <div className='form-group'>
                    <label>Şifre</label>
                    <InputText onKeyDown={(e) => { if (e.key == 'Enter') submit() }} onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='******' />
                </div>
                <div className='form-group'>
                    <label>OTP</label>
                    <InputText onChange={(e) => setOtp(e.target.value)} value={otp} type="text" placeholder='' />
                </div>
                <div>
                    <Button className='w-100' severity='success' label="Giriş Yap" type='button' onClick={submit}></Button>
                </div>
            </form>

            <Dialog header="Email Onay" visible={showEmailPopup}>
                <form>
                    <div className='form-group'>
                        <label>Onay Kodu</label>
                        <input value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} className='form-control' type="text" placeholder='' />
                    </div>
                    <div>
                        <Button type='button' onClick={() => { submit(true) }} label='Onayla' severity='info'></Button>
                    </div>
                </form>
            </Dialog>
        </main>
    )
}

export default Login

// react-router => ek paket