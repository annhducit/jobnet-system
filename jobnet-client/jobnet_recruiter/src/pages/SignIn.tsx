import { Form, Link, useNavigation, redirect } from 'react-router-dom'
import type { IconType } from 'react-icons'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import type { TypeOptions } from 'react-toastify'

import useTitlePage from '../hooks/useTitlePage'
import useAuthToast from '../hooks/useAuthToast'

import Input from 'Common/input/Input'
import Button from 'Common/Button'

import AuthenticateLayout from '../layouts/AuthenticateLayout'

import authService from '../services/authService'

import type { AuthRequest } from '../services/authService'
import type ErrorType from '../types/error'
import loginImages from '../assets/images/jobseeker-auth.jpg'
import { redirectIfAuthenticated } from '../utils/auth'
import { store } from '../app/store'
import { authActions } from '../features/auth/authSlice'

export interface SignInLoader {
  type?: TypeOptions
  message?: string
}

export interface SignInAction {
  type: TypeOptions
  message: string
}

RecruiterSignIn.loader = function ({
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

RecruiterSignIn.action = async function ({
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

    return redirect('/')
  } catch (err) {
    return { type: 'error', message: (err as ErrorType).message }
  }
}

export default function RecruiterSignIn(): JSX.Element {
  const navigation = useNavigation()
  useAuthToast()

  const { t } = useTranslation()
  useTitlePage(t('pageTitle.signin'))

  return (
    <AuthenticateLayout
      welcome={t('signin.recruiter.title')}
      introduction={t('signin.recruiter.introduction')}
      intendedFor={t('signin.recruiter.intended')}
      padding="py-10"
      backgroundImage={loginImages}
    >
      <Form method="post" replace>
        <div className="flex flex-col gap-y-4">
          <Input
            label={`${t('signin.inputs.email.label')} :`}
            placeholder={t('signin.inputs.email.placeholder')}
            icon={FaEnvelope as IconType}
            color="main"
            iconConfig="text-main-upper"
            type="text"
            name="email"
          />
          <Input
            label={`${t('signin.inputs.password.label')} :`}
            placeholder={t('signin.inputs.password.placeholder')}
            color="main"
            iconConfig="text-main-upper"
            icon={FaLock as IconType}
            type="password"
            name="password"
          />
          <Button
            className="mt-4"
            type="submit"
            color="main"
            size="lg"
            disabled={navigation.state === 'submitting'}
          >
            {navigation.state === 'submitting'
              ? t('signin.buttons.submiting')
              : t('signin.buttons.submit')}
          </Button>
        </div>
      </Form>

      <div className="mt-4 text-center">
        <span className="text-sm text-black">{t('signin.signup.label')}</span>
        <Link
          to="/recruiter/signup"
          className="ml-2 text-sm font-semibold cursor-pointer text-main hover:underline"
        >
          {t('signin.buttons.signup')}
        </Link>
      </div>
    </AuthenticateLayout>
  )
}
