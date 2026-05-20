import React from 'react'
import styles from './aboutStyle.module.css'
import Menu from '@/components/Menu'

const page = async({ searchParams }) => {

    const params = await searchParams // iski help se hum query parameters ko access karte hain.
    // console.log(params)
  return (
    <div className={styles.textColor}>
      <Menu />
      <h1>

      This is about page.

      </h1>
      <p>{params.name} : {params.price}</p>
      
      </div>
  )
}

export default page