"use client"
import { AuthContext } from '@/app/contexts/AuthContext'
import React, { useContext, useEffect } from 'react'

export default function Subscriber() {

  const authContext = useContext(AuthContext);
  
  
  // Dinleyicilerin oluşturulması..
  useEffect(() => {
    window.addEventListener('toastr',(e) => {
        authContext.showToastr(e.detail);
    })
  },[])

  return (
    <></>
  )
}


