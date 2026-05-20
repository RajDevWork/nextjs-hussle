import React from 'react'
import styles from './aboutStyle.module.css'
import Menu from '@/components/Menu'

const page = () => {
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