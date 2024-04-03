import { Suspense } from 'react'


export default function App(): JSX.Element {
  return (
    <Suspense fallback="loading">
    </Suspense>
  )
}
