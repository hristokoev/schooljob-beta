import Image from 'next/image'
import React from 'react'

import favicon from '@/public/images/favicon-32x32.png'

const Icon = () => {
  return <Image src={favicon} alt="Logo" width={32} height={32} />
}

export { Icon }
