import { useRef } from 'react'
import { RefObject } from 'react'


export default function useScroll(): {
  scrollIntoView: () => void
  scrollIntoViewRef: RefObject<HTMLDivElement>
} {
  const scrollIntoViewRef = useRef<HTMLDivElement>(null)

  const scrollIntoView = () => {
    const rect = scrollIntoViewRef.current?.getBoundingClientRect()
    rect &&
      window.scrollTo({
        top: rect.top + window.scrollY - 80,
        behavior: 'smooth',
      })
  }

  return {
    scrollIntoView,
    scrollIntoViewRef,
  }
}