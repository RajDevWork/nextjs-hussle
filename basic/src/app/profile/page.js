import React from 'react'
import  Image  from 'next/image';

const page = () => {
  return (
    <div>This is profile page.

        {/* <img src="Images/demo.jpg" alt="Profile Image" /> */}
        <Image src="/Images/demo.jpg" alt="Profile Image" width={200} height={200} />
    </div>
  )
}

export default page