import React, { Suspense } from 'react'

import { RenderParamsComponent, RenderParamsComponentProps } from './Component'

// Using `useSearchParams` from `next/navigation` causes the entire route to de-optimize into client-side rendering
// To fix this, we wrap the component in a `Suspense` component
// See https://nextjs.org/docs/messages/deopted-into-client-rendering for more info

const RenderParams: React.FC<RenderParamsComponentProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <RenderParamsComponent {...props} />
    </Suspense>
  )
}

export { RenderParams }
