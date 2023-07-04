"use client"
import React, { useState } from 'react'
import styles from '../page.module.css'
import axios from 'axios'

function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")


    const register = () => {
        let object = {firstName,lastName,email,password,passwordConfirm,IPAddress:"123"};
        console.log(object);
        
        // şifreler uyuşmalı 
        // firstname en az 3 hane olmalı

        axios.post('https://localhost:7206/api/Auth/Register',object).then(response=>console.log(response));
        
    }

    return (
        <main className={styles.main}>
            <h3>Register Page</h3>
            <form>
                <div>
                    <label>Ad</label>
                    <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder='Ad' />
                </div>

                <div>
                    <label>Soyad</label>
                    <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder='Soyad' />
                </div>
                <div>
                    <label>E-posta</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='E-posta' />
                </div>
                <div>
                    <label>Şifre</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='******' />
                </div>
                <div>
                    <label>Şifre Tekrar</label>
                    <input value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} type="password" placeholder='******' />
                </div>
                <div>
                    <button onClick={register} type='button'>Kayıt Ol</button>
                </div>
            </form>
        </main>
    )
}

export default Register