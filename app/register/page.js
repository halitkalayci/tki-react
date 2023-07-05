"use client"
import React, { useRef, useState } from 'react'
import styles from '../page.module.css'
import axios from 'axios'
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext"
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const toast = useRef(null);
    const navigate = useRouter();

    const register = () => {
        let object = {firstName,lastName,email,password,passwordConfirm,IPAddress:"123"};
        console.log(object);
        
        if(object.password != passwordConfirm)
        {
            toast.current.show({severity:'error', summary:'Başarısız',detail:'Şifreler uyuşmuyor'});
            return;
        }

        axios.post('https://localhost:7206/api/Auth/Register',object)
        .then(response=>{
            toast.current.show({severity:'success', summary:'Başarılı',detail:'Başarıyla kayıt olundu.'});
            navigate.push("/");
        })
        .catch(error=>{
            console.log(error);
            toast.current.show({severity:'error', summary:'Başarısız',detail:error.response.data.detail});
        });
        
    }

    return (
        <main className={styles.main}>
            <Toast ref={toast}></Toast>
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