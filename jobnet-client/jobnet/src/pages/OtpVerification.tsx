import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useTitlePage from '../hooks/useTitlePage'
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from 'react-router-dom'
import { IconType } from 'react-icons'
import { FaCheckCircle } from 'react-icons/fa'
import { TypeOptions, toast } from 'react-toastify'

import AuthenticateLayout from '../layouts/AuthenticateLayout'
import ErrorType from '../types/error'

import Button from 'Common/Button'
import Input from 'Common/input/Input'

import otpBg from '../assets/otp-layout.png'

import registrationService from 'User/Registration'

interface OTPVerificationLoader {
  userId: string
  email: string
}

OTPVerification.loader = function ({
  request,
}: {
  request: Request
}): OTPVerificationLoader {
  const searchParams = new URL(request.url).searchParams
  const userId = searchParams.get('userId')
  const email = searchParams.get('email')

  // TODO: Check user ID and email
  if (!userId || !email) {
    throw json({}, { status: 404 })
  }

  return { userId, email }
}

interface OTPVerificationAction {
  type: TypeOptions
  message: string
}

OTPVerification.action = async function ({
  request,
}: {
  request: Request
}): Promise<OTPVerificationAction | Response> {
  const searchParams = new URL(request.url).searchParams
  const baseUrl = searchParams.get('baseUrl') || ''
  const formData = await request.formData()

  const req = {
    userId: searchParams.get('userId'),
    otpToken: formData.get('otpToken'),
  }

  if (!req.otpToken) {
    return { type: 'error', message: 'Please provide the OTP token.' }
  } else if (req.otpToken.toString().length !== 6) {
    return { type: 'error', message: 'The OTP token must be 6 characters.' }
  }

  try {
    await registrationService.verifyUser(req)

    return redirect(
      `${baseUrl}/signin?type=success&message=Account verified successfull.`
    )
  } catch (err) {
    return { type: 'error', message: (err as ErrorType).message }
  }
}

export default function OTPVerification(): React.ReactElement {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.verification'))

  const loader = useLoaderData() as OTPVerificationLoader
  const action = useActionData() as OTPVerificationAction | undefined

  useEffect(() => {
    const toastId =
      action &&
      toast(action.message, {
        type: action.type,
      })
    return () => toast.dismiss(toastId)
  }, [action])

  return (
    <AuthenticateLayout
      welcome="Xác thực tài khoản của bạn để hoàn tất việc tạo tài khoản nhà tuyển dụng"
      intendedFor="Xác thực tài khoản nhà tuyển dụng"
      padding="py-6"
      backgroundImage={otpBg}
      layoutSize="xs"
      verify={true}
    >
      <h2>
        Chúng tôi vừa gữi mã OTP tới email <br />{' '}
        <span className="font-semibold text-second-upper">{loader.email}</span>
      </h2>
      <Form method="post" replace className="my-14">
        <div className="flex flex-col gap-y-4">
          <Input
            id="otpToken"
            name="otpToken"
            label="Mã xác thực"
            icon={FaCheckCircle as IconType}
            placeholder="Nhập mã OTP"
            color="main"
            iconConfig="text-main-upper"
            type="text"
          />

          <Button className="mt-10" type="submit" color="main" size="lg">
            Xác thực
          </Button>
        </div>
      </Form>
    </AuthenticateLayout>
  )
}
