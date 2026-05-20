'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Menu = () => {

    const currentPath = usePathname()
  return (
    <div className='flex gap-5 py-5'>
        <Link href={'/'} className={currentPath==='/'?'active':''}>Home</Link>
        <Link href={'/about'} className={currentPath==='/about'?'active':''}>About</Link>
        <Link href={'/admin'} className={currentPath==='/admin'?'active':''}>Admin</Link>
        <Link href={'/contact'} className={currentPath==='/contact'?'active':''}>Contact</Link>
    </div>
  )
}

export default Menu