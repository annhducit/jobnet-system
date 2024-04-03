import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import {existsWishlist,createWishlist,deleteWishlist} from 'Post/Wishlist'

export default function useIsInWishlist(postId: string) {
  const { t } = useTranslation()

  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    void (async () => {
      try {
        const isExist = await existsWishlist(postId)
        setIsInWishlist(isExist)
      } catch (err) {
        console.error('Wishlist service unavailable.')
      }
    })()
  }, [postId])

  const addToWishlist = () => {
    void (async () => {
      try {
        if (!isInWishlist) {
          await createWishlist(postId)
          toast.success(t('toast.post.save.saved'))
        } else {
          await deleteWishlist(postId)
          toast.success(t('toast.post.save.unsave'))
        }
        setIsInWishlist((prev) => !prev)
      } catch (err) {
        console.error('Wishlist service unavailable.')
      }
    })()
  }

  return { isInWishlist, addToWishlist }
}
