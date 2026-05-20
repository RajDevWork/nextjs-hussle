'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const ProgressProvider = () => {
  return (
    <ProgressBar
      height="5px"
      color="red"
      shallowRouting
    />
  )
}

export default ProgressProvider