import React from 'react'
import styles from './aboutStyle.module.css'
import Menu from '@/components/Menu'

const page = async() => {

     await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    )
  return (
    <div className={styles.textColor}>
      <Menu />
      <h1>

      This is about page.
      </h1>
      
      </div>
  )
}

export default page