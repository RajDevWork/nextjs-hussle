'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NotFound = () => {
    const pathname = usePathname()
  return (
    <div>
        <h1>Not Found</h1>
        <p>Could not find requested {pathname} resources</p>
        <Link href={"/"}>Return Home</Link>
    </div>
  )
}

export default NotFound