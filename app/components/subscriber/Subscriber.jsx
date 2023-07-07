"use client"
import { AuthContext } from '@/app/contexts/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export default function Subscriber() {

  const authContext = useContext(AuthContext);
  const navigation = useRouter();
  
  // Dinleyicilerin oluşturulması..
  useEffect(() => {
    window.addEventListener('toastr',(e) => {
        authContext.showToastr(e.detail);
    })
    window.addEventListener('redirectToLogin', () => {
        navigation.push("/login")
    })
  },[])

  return (
    <></>
  )
}


