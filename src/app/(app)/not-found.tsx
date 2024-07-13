import React from 'react'

import { Gutter, MinHeight, VerticalPadding } from '@/components'

const NotFound: React.FC = () => {
  return (
    <MinHeight>
      <VerticalPadding top="lg" bottom="lg">
        <Gutter>
          <h1>Not Found</h1>
        </Gutter>
      </VerticalPadding>
    </MinHeight>
  )
}

export default NotFound