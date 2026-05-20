// 'use client'
import Menu from '@/components/Menu';
// import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {

  // const router = useRouter()
  // const Goto = ()=>{
  //   // router.push("/about")
  //   // router.replace("/about")
  //   // router.refresh() // for page refresh
  //   // router.prefetch("/about")
  //   // router.back();
  //   router.forward()
  // }

  return (
    <div>
      <Menu />
      <h1 className='text-3xl font-bold text-gray-200'>This is HOME Page.</h1>
      {/* <button onClick={Goto}>Click here</button> */}
      {process.env.API_KEY}
    </div>
  );
};

export default page;