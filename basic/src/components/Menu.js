'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Menu = () => {

    // replace: browser history me routes ke cache store ko avoid karta hain.
    // prefetch: Browser page caching ko ignore karne ke liye hota hain.

    const currentPath = usePathname()
  return (
    <div className='flex gap-5 py-5'>
        <Link href={'/'} className={currentPath==='/'?'active':''} replace>Home</Link>
        <Link href={{pathname:'/about',query:{name:'RAM',price:'200'}}} className={currentPath==='/about'?'active':''} replace>About</Link>
        <Link href={{pathname:'/admin',query:{name:'Raj',role:'admin'}}} className={currentPath==='/admin'?'active':''} replace>Admin</Link>
        <Link prefetch={false} href={'/contact'} className={currentPath==='/contact'?'active':''} replace>Contact</Link>
    </div>
  )
}

export default Menu