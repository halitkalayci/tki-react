"use client"
import React, { useContext, useRef, useState } from 'react'
import styles from '../page.module.css'
import axios from 'axios'
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext"
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';
import axiosInstance from '../utilities/axiosInterceptors';
function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const toast = useRef(null);
    const navigate = useRouter();
    const authContext = useContext(AuthContext);

    const register = () => {
        let object = {firstName,lastName,email,password,passwordConfirm,IPAddress:"123"};
        console.log(object);
        
        if(object.password != passwordConfirm)
        {
            authContext.showToastr({severity:'error', summary:'Başarısız',detail:'Şifreler uyuşmuyor'});
            return;
        }

        axiosInstance.post('https://localhost:7206/api/Auth/Register',object)
        .then(response=>{
            authContext.showToastr({severity:'success', summary:'Başarılı',detail:'Başarıyla kayıt olundu.'});
            let token = response.data.token;
            localStorage.setItem('token',token);
            authContext.setIsAuthenticated(true);
            navigate.push("/");
        })
    }

    return (
        <main className={styles.main}>
            <h3>Register Page</h3>
            <form>
                <div className='form-group'>
                    <label>Ad</label>
                    <InputText value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder='Ad' />
                </div>

                <div className='form-group'>
                    <label>Soyad</label>
                    <InputText value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder='Soyad' />
                </div>
                <div className='form-group'>
                    <label>E-posta</label>
                    <InputText value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='E-posta' />
                </div>
                <div className='form-group'>
                    <label>Şifre</label>
                    <InputText value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='******' />
                </div>
                <div className='form-group'>
                    <label>Şifre Tekrar</label>
                    <InputText value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} type="password" placeholder='******' />
                </div>
                <div className='form-group'>
                    <Button label='Kayıt Ol' className='w-100' onClick={register} type='button'></Button>
                </div>
            </form>
        </main>
    )
}

export default Register