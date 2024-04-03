import { useEffect } from 'react'
import { useActionData, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignInAction, SignInLoader } from '../pages/SignIn'

export default function useAuthToast() {
  const loader = useLoaderData() as SignInLoader
  const action = useActionData() as SignInAction | undefined

  useEffect(() => {
    toast(loader.message, {
      toastId: loader.message,
      type: loader.type,
    })
  }, [loader.type, loader.message])

  useEffect(() => {
    const toastId =
      action &&
      toast(action.message, {
        type: action.type,
      })
    return () => toast.dismiss(toastId)
  }, [action])
}
