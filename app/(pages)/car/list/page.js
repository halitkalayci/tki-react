"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
function CarList() {
    const pathName = useRouter();

    useEffect(() => {
    }, [])
    return (
        <div>CarList</div>
    )
}

export default CarList
