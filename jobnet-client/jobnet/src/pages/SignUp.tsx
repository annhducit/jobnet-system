import { useEffect } from 'react'
import { Link, Form, useActionData, redirect } from 'react-router-dom'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import i18n from '../app/i18n'

import useTitlePage from '../hooks/useTitlePage'
import AuthenticateLayout from '../layouts/AuthenticateLayout'
import { redirectIfAuthenticated } from '../utils/auth'

import Input from 'Common/input/Input'
import Button from 'Common/Button'

import { AxiosError } from 'axios'

import loginImages from '../assets/images/jobseeker-auth.jpg'

import registrationService from 'User/Registration'

interface SignUpAction {
  message: string
}

SignUp.loader = function () {
  redirectIfAuthenticated()
  return null
}

SignUp.action = async function ({
  request,
}: {
  request: Request
}): Promise<SignUpAction | Response> {
  const formData = await request.formData()
  const t = i18n.t
  const signUpInfo = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  }

  if (!signUpInfo.name || !signUpInfo.email || !signUpInfo.password)
    return { type: 'error', message: t('toast.errors.provideInformation') }

  try {
    const user = await registrationService.registerJobSeeker(signUpInfo)

    return redirect(`/account/verify?userId=${user.id}&email=${user.email}`)
  } catch (err) {
    const message = (err as AxiosError).response?.status
      ? t(`errors.${(err as AxiosError).response?.status}`)
      : 'Error: Unknow'
    return { type: 'error', message: message }
  }
}

export default function SignUp(): JSX.Element {
  const action = useActionData() as SignUpAction

  const { t } = useTranslation()
  useTitlePage(t('pageTitle.signup'))

  useEffect(() => {
    const errorToastId = toast.error(action?.message)
    return () => toast.dismiss(errorToastId)
  }, [action])

  return (
    <AuthenticateLayout
      welcome={t('signup.jobSeeker.title')}
      intendedFor={t('signup.jobSeeker.intended')}
      backgroundImage={loginImages}
    >
      <Form method="post">
        <div className="flex flex-col gap-4 mt-8">
          <Input
            label={`${t('signup.inputs.name.label')} :`}
            placeholder={t('signup.inputs.name.placeholder')}
            icon={FaUser as IconType}
            type="text"
            color="main"
            iconConfig="text-main-upper"
            id="name"
            name="name"
          />
          <Input
            label={`${t('signup.inputs.email.label')} :`}
            placeholder={t('signup.inputs.email.placeholder')}
            icon={FaEnvelope as IconType}
            type="email"
            color="main"
            iconConfig="text-main-upper"
            id="email"
            name="email"
          />
          <Input
            label={`${t('signup.inputs.password.label')} :`}
            placeholder={t('signup.inputs.password.placeholder')}
            icon={FaLock as IconType}
            type="password"
            color="main"
            iconConfig="text-main-upper"
            id="password"
            name="password"
          />
          <Button className="mt-4" color="main" size="lg" type="submit">
            {t('signup.buttons.submit')}
          </Button>
          <div className="mx-auto mt-2">
            <span className="text-black">{t('signup.signin')}</span>{' '}
            <Link
              to="/signin"
              className="font-semibold cursor-pointer text-main hover:text-main-upper"
            >
              {t('signup.buttons.signin')}
            </Link>
          </div>
        </div>
      </Form>
    </AuthenticateLayout>
  )
}
