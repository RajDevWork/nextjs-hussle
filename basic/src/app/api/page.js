'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [Data, setData] = useState([])

    useEffect(() => {

        (async()=>{
            let res = await fetch('https://dummyjson.com/products')
            let json = await res.json()
            setData(json['products'])
        })()
      
    }, [])
    

  return (
    <div>
        <p>
            Call API
        </p>
        {
            Data.map((item,index)=>{
                return <div key={item.id}>
                        <h1>{item.title}</h1>
                </div>
            })
        }
    </div>
  )
}

export default page