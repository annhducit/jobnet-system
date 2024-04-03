import { useEffect } from 'react'

export default function useTitlePage(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
