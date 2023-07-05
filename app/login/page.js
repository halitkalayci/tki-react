"use client"
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './login.css';
import styles from '../page.module.css'
import { Toast } from 'primereact/toast';
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

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // useReference => react'daki elementlerin referans olarak bir değişkene atanması işlevi
    // başlangıç genelde null olur => site yüklenene kadar reference boş
    const toastReference = useRef(null);

    const submit = () => {
        //console.log( { email: email, password: password } );
        let object = { email, password };
        console.log(object); 

        axios.post("https://localhost:7206/api/Auth", object)
        .then(response=>{
            toastReference.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Başarıyla Giriş Yapıldı' });
        }).catch(error => {
            toastReference.current.show({ severity: 'error', summary: 'Hatalı', detail: 'Giriş Yapılamadı' });
        });
    }
    // one way data binding 
    // two way data binding
    return (
        <main className={styles.main}>
            <Toast ref={toastReference} />
            <h3>Login Page</h3>
            <form>
                <div className='form-group'>
                    <label>E-posta</label>
                    <InputText onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='E-posta' />
                </div>
                <div className='form-group'>
                    <label>Şifre</label>
                    <InputText onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='******' />
                </div>
                <div>
                    <Button className='w-100' severity='success' label="Giriş Yap" type='button' onClick={submit}></Button>
                </div>
            </form>
        </main>
    )
}

export default Login

// react-router => ek paket