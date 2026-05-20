 'use client'
// import React, { useEffect, useState } from 'react'
async function getData(){
    let res = await fetch('https://dummyjson.com/products')
    let json = await res.json()
    return json['products']

}

const page = async() => {

    const Data = await getData()
    // const [Data, setData] = useState([])

    // useEffect(() => {

    //     (async()=>{
    //         let res = await fetch('https://dummyjson.com/products')
    //         let json = await res.json()
    //         setData(json['products'])
    //     })()
      
    // }, [])
    

  return (
    <div>
        <button onClick={()=>alert('Hi Raj')}>Click Here</button>
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