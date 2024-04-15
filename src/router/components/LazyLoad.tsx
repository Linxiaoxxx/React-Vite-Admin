import { Suspense, lazy } from 'react'
import Nprogress from '@/components/Nprogress'

function lazyLoad(Comp: React.LazyExoticComponent<any>): React.ReactNode {
  return (
    <Suspense fallback={<Nprogress />}>
      <Comp />
    </Suspense>
  )
}

export default lazyLoad
