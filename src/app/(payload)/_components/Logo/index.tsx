import Image from 'next/image'
import React from 'react'

import logo from '@/public/images/logo.png'

const Logo = () => {
  return <Image src={logo} alt="Logo" width={342} height={100} />
}

export { Logo }
