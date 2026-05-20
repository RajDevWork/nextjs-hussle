import Link from 'next/link'
import React from 'react'

const Menu = () => {
  return (
    <div className='flex gap-5 py-5'>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/admin'}>Admin</Link>
        <Link href={'/contact'}>Contact</Link>
    </div>
  )
}

export default Menu