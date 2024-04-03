import { useNavigation, Form, redirect } from 'react-router-dom'
import { FaLock, FaUser } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'
import type { TypeOptions } from 'react-toastify'

import { redirectIfAuthenticated } from '../utils/auth'
import useAuthToast from '../hooks/useAuthToast'
import { store } from '../app/store'
import { authActions } from '../features/auth/authSlice'
import AuthenticateLayout from '../layouts/AuthenticateLayout'

import Input from 'Common/input/Input'
import Button from 'Common/Button'

import type { AuthRequest } from '../services/authService'
import loginImages from '../assets/images/recruiter-auth.png'
import authService from '../services/authService'
import type ErrorType from '../types/error'

export interface SignInLoader {
  type?: TypeOptions
  message?: string
}

export interface SignInAction {
  type: TypeOptions
  message: string
}

AdminSignIn.loader = function ({
  request,
}: {
  request: Request
}): SignInLoader {
  redirectIfAuthenticated()
  const searchParams = new URL(request.url).searchParams
  const type = searchParams.get('type')
  const message = searchParams.get('message')

  return { type, message } as SignInLoader
}

AdminSignIn.action = async function ({
  request,
}: {
  request: Request
}): Promise<SignInAction | Response> {
  const formData = await request.formData()
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  } as AuthRequest

  if (!credentials.email || !credentials.password)
    return { type: 'error', message: 'Please provide credentials.' }

  try {
    const auth = await authService.login(credentials)
    store.dispatch(authActions.setAuth(auth))

    return redirect('/signin')
  } catch (err) {
    return { type: 'error', message: (err as ErrorType).message }
  }
}

export default function AdminSignIn(): JSX.Element {
  const navigation = useNavigation()
  useAuthToast()
  const { t } = useTranslation()

  return (
    <AuthenticateLayout
      welcome={t('signin.admin.title')}
      introduction={t('signin.admin.introduction')}
      intendedFor={t('signin.admin.intended')}
      padding="pt-10"
      backgroundImage={loginImages}
    >
      <Form method="post" replace>
        <div className="flex flex-col gap-4 pt-8">
          <Input
            label={`${t('signin.inputs.email.label')} :`}
            placeholder={t('signin.inputs.email.placeholder')}
            icon={FaUser as IconType}
            type="text"
            color="main"
            iconConfig="text-main-upper"
            id="email"
            name="email"
          />
          <Input
            label={`${t('signin.inputs.password.label')} :`}
            placeholder={t('signin.inputs.password.placeholder')}
            icon={FaLock as IconType}
            type="password"
            color="main"
            iconConfig="text-main-upper"
            id="password"
            name="password"
          />
          <Button
            className="mt-4"
            color="main"
            size="lg"
            type="submit"
            disabled={navigation.state === 'submitting'}
          >
            {navigation.state === 'submitting'
              ? t('signin.buttons.submiting')
              : t('signin.buttons.submit')}
          </Button>
        </div>
      </Form>
    </AuthenticateLayout>
  )
}
