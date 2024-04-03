import { Form, Link, useNavigation, redirect } from 'react-router-dom'
import { FaLock, FaUser } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import type { TypeOptions } from 'react-toastify'
import type { IconType } from 'react-icons'

import { AxiosError } from 'axios'
import i18n from '../app/i18n'

import useTitlePage from '../hooks/useTitlePage'
import useAuthToast from '../hooks/useAuthToast'

import { store } from '../app/store'
import { redirectIfAuthenticated } from '../utils/auth'
import { authActions } from '../features/auth/authSlice'
import AuthenticateLayout from '../layouts/AuthenticateLayout'

import Input from 'Common/input/Input'
import Button from 'Common/Button'

import authService from '../services/authService'
import type { AuthRequest } from '../services/authService'

import loginImages from '../assets/images/jobseeker-auth.jpg'

export interface SignInLoader {
  type?: TypeOptions
  message?: string
}

export interface SignInAction {
  type: TypeOptions
  message: string
}

SignIn.loader = function ({ request }: { request: Request }): SignInLoader {
  redirectIfAuthenticated()
  const searchParams = new URL(request.url).searchParams
  const type = searchParams.get('type')
  const message = searchParams.get('message')

  return { type, message } as SignInLoader
}

SignIn.action = async function ({
  request,
}: {
  request: Request
}): Promise<SignInAction | Response> {
  const t = i18n.t
  const formData = await request.formData()
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  } as AuthRequest
  const url = new URL(request.url)
  const redirectTo =
    url.searchParams.get('redirectTo') || url.pathname.replace('/signin', '')

  if (!credentials.email || !credentials.password)
    return { type: 'error', message: t('toast.errors.provideInformation') }

  try {
    const auth = await authService.login(credentials)
    store.dispatch(authActions.setAuth(auth))

    return redirect(redirectTo)
  } catch (err) {
    console.log(t(`toast.errors.${(err as AxiosError).response?.status}`))
    const message = (err as AxiosError).response?.status
      ? t(`toast.errors.${(err as AxiosError).response?.status}`)
      : 'Error: Unknow'
    return { type: 'error', message: message }
  }
}

export default function SignIn(): JSX.Element {
  const navigation = useNavigation()
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.signin'))
  useAuthToast()
  return (
    <AuthenticateLayout
      welcome={t('signin.jobSeeker.title')}
      introduction={t('signin.jobSeeker.introduction')}
      intendedFor={t('signin.jobSeeker.intended')}
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
          <div className="mt-4 text-center">
            <span className="text-black">{t('signin.signup.label')}</span>{' '}
            <Link
              to="/signup"
              className="font-semibold cursor-pointer text-main hover:text-main-upper"
            >
              {t('signin.buttons.signup')}
            </Link>
          </div>
        </div>
      </Form>
    </AuthenticateLayout>
  )
}
