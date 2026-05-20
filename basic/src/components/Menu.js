'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Menu = () => {

    const currentPath = usePathname()
  return (
    <div className='flex gap-5 py-5'>
        <Link href={'/'} className={currentPath==='/'?'active':''}>Home</Link>
        <Link href={{pathname:'/about',query:{name:'RAM',price:'200'}}} className={currentPath==='/about'?'active':''}>About</Link>
        <Link href={{pathname:'/admin',query:{name:'Raj',role:'admin'}}} className={currentPath==='/admin'?'active':''}>Admin</Link>
        <Link href={'/contact'} className={currentPath==='/contact'?'active':''}>Contact</Link>
    </div>
  )
}

export default Menu