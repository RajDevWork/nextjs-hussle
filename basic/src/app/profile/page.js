import React from 'react'
import  Image  from 'next/image';

const page = () => {
  return (
    <div>
        <p className='global-text'>
            This is profile page.
        </p> 

        {/* <img src="Images/demo.jpg" alt="Profile Image" /> */}
        <Image src="/Images/demo.jpg" alt="Profile Image" width={200} height={200} />
    </div>
  )
}

export default page