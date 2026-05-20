'use client'
import Menu from '@/components/Menu'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useSearchParams()

    // console.log(params)
  return (
    <div> 
        <Menu />
        <h1>
            This is admin page.
        </h1>
        <p>Welcome back, {params.get('name')}- {params.get('role')}</p>
        </div>
  )
}

export default page