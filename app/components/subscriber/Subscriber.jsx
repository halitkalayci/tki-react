"use client"
import { AuthContext } from '@/app/contexts/AuthContext'
import React, { useContext, useEffect } from 'react'

export default function Subscriber() {

  const authContext = useContext(AuthContext);
  
  
  // Dinleyicilerin oluşturulması..
  useEffect(() => {
    window.addEventListener('toastr',() => {
        console.log("dışarıdan toastr eventi çağırıldı.");
    })
  },[])

  return (
    <></>
  )
}


