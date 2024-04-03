import React, { useEffect, useState } from 'react'
import { Link, Form, redirect, useActionData, json } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelope, FaHouse, FaLock, FaPhone, FaUser } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import clns from 'classnames'
import { useTranslation } from 'react-i18next'

import registerImage from '../assets/images/recruiter-auth.png'
import defaultBusiness from '../assets/images/profile.png'

import useTitlePage from '../hooks/useTitlePage'
import useModal from '../hooks/useModal'
import useDebounce from '../hooks/useDebounce'

import AuthenticateLayout from '../layouts/AuthenticateLayout'

import Input from 'Common/input/Input'
import Button from 'Common/Button'
import Modal from 'Common/Modal'

import registrationService from '../services/registrationService'

import { redirectIfAuthenticated } from '../utils/auth'
import ErrorType from '../types/error'
import BusinessType from '../types/business'
import businessService from '../services/businessService'

interface RecruiterSignUpAction {
  message?: string
}

RecruiterSignUp.loader = function () {
  redirectIfAuthenticated()
  return null
}

type IntentType = 'registerWithNewBusiness' | 'registerWithSelectedBusiness'

RecruiterSignUp.action = async function ({ request }: { request: Request }) {
  const formData = await request.formData()
  const intent = formData.get('intent') as IntentType

  if (intent === 'registerWithNewBusiness') {
    const registerRequest = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      phone: formData.get('phone'),
      businessName: formData.get('businessName'),
    }
    if (
      !registerRequest.name ||
      !registerRequest.email ||
      !registerRequest.phone ||
      !registerRequest.password ||
      !registerRequest.businessName
    )
      return { message: 'Please provide all information.' }
    else if (registerRequest.password != formData.get('confirmPassword'))
      return { message: 'Confirm password does not match' }

    try {
      const user = await registrationService.registerRecruiterWithNewBusiness(
        registerRequest
      )
      return redirect(
        `/account/verify?userId=${user.id}&email=${user.email}&baseUrl=/recruiter`
      )
    } catch (err) {
      return { message: (err as ErrorType).message }
    }
  }

  if (intent === 'registerWithSelectedBusiness') {
    const registerRequest = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      phone: formData.get('phone'),
      businessId: formData.get('businessId'),
    }

    if (
      !registerRequest.name ||
      !registerRequest.email ||
      !registerRequest.phone ||
      !registerRequest.password ||
      !registerRequest.businessId
    )
      return { message: 'Please provide all information.' }
    else if (registerRequest.password != formData.get('confirmPassword'))
      return { message: 'Confirm password does not match' }

    try {
      const user =
        await registrationService.registerRecruiterWithSelectedBusiness(
          registerRequest
        )
      return redirect(
        `/account/verify?userId=${user.id}&email=${user.email}&baseUrl=/recruiter`
      )
    } catch (err) {
      return { message: (err as ErrorType).message }
    }
  }

  throw json({ message: 'Invalid intent' }, { status: 400 })
}

export default function RecruiterSignUp(): React.ReactElement {
  const action = useActionData() as RecruiterSignUpAction
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.signup'))

  const [recruiterSignUp, setRecruiterSignUp] = useState({
    intent: 'registerWithNewBusiness' as IntentType,
    selectedBusiness: undefined as BusinessType | undefined,
  })

  const { modal, openModal, closeModal } = useModal()

  useEffect(() => {
    const errorToastId = toast.error(action?.message)
    return () => toast.dismiss(errorToastId)
  }, [action])

  const handleBusinessChange = (business: BusinessType) =>
    setRecruiterSignUp({
      intent: 'registerWithSelectedBusiness',
      selectedBusiness: business,
    })

  const handleBusinessCreateClick = () =>
    setRecruiterSignUp({
      intent: 'registerWithNewBusiness',
      selectedBusiness: undefined,
    })

  return (
    <AuthenticateLayout
      welcome={t('signup.recruiter.title')}
      intendedFor={t('signup.recruiter.intended')}
      padding="py-4"
      backgroundImage={registerImage}
      layoutSize="lg"
    >
      <Form method="post" className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-col lg:gap-x-4 lg:flex-row lg:gap-y-0 gap-y-4">
            <Input
              id="name"
              name="name"
              label={`${t('signup.inputs.name.label')} :`}
              placeholder={t('signup.inputs.name.placeholder')}
              type="text"
              color="main"
              icon={FaUser as IconType}
              iconConfig="text-main"
            />
            <Input
              id="phone"
              name="phone"
              label={`${t('signup.inputs.phone.label')} :`}
              placeholder={t('signup.inputs.phone.placeholder')}
              type="text"
              color="main"
              icon={FaPhone as IconType}
              iconConfig="text-main"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              label={`${t('signup.inputs.email.label')} :`}
              placeholder={t('signup.inputs.email.placeholder')}
              type="text"
              color="main"
              icon={FaEnvelope as IconType}
              iconConfig="text-main"
            />
            <div className="text-xs text-rose-500">
              {t('signup.require.email')}
            </div>
          </div>
          <div className="flex flex-col lg:gap-x-4 lg:flex-row lg:gap-y-0 gap-y-4">
            <Input
              id="password"
              name="password"
              label={`${t('signup.inputs.password.label')} :`}
              placeholder={t('signup.inputs.password.placeholder')}
              type="password"
              color="main"
              icon={FaLock as IconType}
              iconConfig="text-main"
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              label={`${t('signup.inputs.repassword.label')} :`}
              placeholder={t('signup.inputs.repassword.placeholder')}
              type="password"
              color="main"
              icon={FaLock as IconType}
              iconConfig="text-main"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-main">
            {t('signup.business.session')}
          </h2>

          {recruiterSignUp.selectedBusiness ? (
            <Button size={'sm'} onClick={handleBusinessCreateClick}>
              {t('signup.buttons.createBusiness')}
            </Button>
          ) : (
            <Button
              size={'sm'}
              onClick={() => openModal('business-search-modal')}
            >
              {t('signup.buttons.selectBusiness')}
            </Button>
          )}
        </div>

        {!recruiterSignUp.selectedBusiness && (
          <div className="space-y-2">
            <Input
              id="businessName"
              name="businessName"
              label={`${t('signup.inputs.businessName.label')} :`}
              placeholder={t('signup.inputs.businessName.placeholder')}
              type="text"
              icon={FaHouse as IconType}
              color="main"
            />
          </div>
        )}
        {recruiterSignUp.selectedBusiness && (
          <div>
            <input
              type="hidden"
              name="businessId"
              value={recruiterSignUp.selectedBusiness.id}
            />
            <Link to={`/businesses/${recruiterSignUp.selectedBusiness.id}`}>
              <BusinessSearchItem business={recruiterSignUp.selectedBusiness} />
            </Link>
          </div>
        )}
        <Button
          type="submit"
          name="intent"
          value={recruiterSignUp.intent}
          className="w-full translate-y-4"
          color="main"
          size="lg"
        >
          {t('signup.buttons.submit')}
        </Button>

        <div className="flex justify-center">
          <span className="text-sm text-black">{t('signup.signin')}</span>
          <Link
            to="/recruiter/signin"
            className="ml-2 text-sm font-semibold cursor-pointer text-main hover:underline"
          >
            {t('signup.buttons.signin')}
          </Link>
        </div>
      </Form>

      <Modal
        id="business-search-modal"
        show={modal === 'business-search-modal'}
        onClose={closeModal}
        size="2xl"
      >
        <Modal.Header>{t('signup.business.modalHeader')}</Modal.Header>
        <Modal.Body>
          <BusinessSearch
            key={recruiterSignUp.selectedBusiness?.id}
            closeModal={closeModal}
            selectedBusiness={recruiterSignUp.selectedBusiness}
            onBusinessChange={handleBusinessChange}
          />
        </Modal.Body>
      </Modal>
    </AuthenticateLayout>
  )
}

function BusinessSearch({
  closeModal,
  selectedBusiness,
  onBusinessChange,
}: {
  closeModal: () => void
  selectedBusiness?: BusinessType
  onBusinessChange: (business: BusinessType) => void
}): React.ReactElement {
  const [businessSearch, setBusinessSearch] = useState({
    search: '',
    results: [] as BusinessType[],
    selectedBusiness: selectedBusiness,
    isFocus: false,
  })
  const { t } = useTranslation()

  const debounce = useDebounce(businessSearch.search, 500)

  useEffect(() => {
    void (async () => {
      const pagination = await businessService.getBusinesses({
        name: debounce,
      })
      setBusinessSearch((prev) => ({
        ...prev,
        results: pagination.data,
      }))
    })()
  }, [debounce])

  useEffect(() => {
    selectedBusiness !== undefined &&
      setBusinessSearch((prev) => ({
        ...prev,
        selectedBusiness,
      }))
  }, [selectedBusiness, businessSearch.selectedBusiness])

  useEffect(() => {
    const disableFocus = (e: MouseEvent) => {
      !(e.target as HTMLElement).closest('[id=business]') &&
        setBusinessSearch((prev) => ({
          ...prev,
          isFocus: false,
        }))
    }
    window.addEventListener('click', disableFocus)
    return () => window.removeEventListener('click', disableFocus)
  }, [])

  const handleItemClick = (business: BusinessType) =>
    setBusinessSearch((prev) => ({
      ...prev,
      selectedBusiness: business,
      results: [],
      isFocus: false,
    }))

  const handleConfirmClick = () => {
    businessSearch?.selectedBusiness &&
      onBusinessChange(businessSearch.selectedBusiness)

    closeModal()
  }

  const businessSearchElms = businessSearch.results.map((business) => (
    <BusinessSearchItem
      key={business.id}
      business={business}
      onClick={() => handleItemClick(business)}
      className={clns({
        'bg-second-lower': selectedBusiness?.id === business.id,
      })}
    />
  ))

  return (
    <div className="space-y-6">
      <div id="business" className="space-y-6">
        <Input
          label={`${t('signup.inputs.businessName.label')} :`}
          placeholder={t('signup.inputs.businessName.placeholder')}
          type="text"
          color="main"
          autoComplete="false"
          value={businessSearch.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBusinessSearch((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
          onFocus={() =>
            setBusinessSearch((prev) => ({ ...prev, isFocus: true }))
          }
        />
        {businessSearch.results.length >= 0 && businessSearch.isFocus && (
          <div>
            <p className="p-2 pt-0 text-sm font-semibold">
              {t('signup.businessSearch.title') + ' :'}
            </p>
            <div className="shadow-md max-h-[265px] overflow-y-scroll divide-y-2">
              {businessSearch.results.length ? (
                businessSearchElms
              ) : (
                <p className="p-2 text-sm font-semibold text-center">
                  {t('signup.businessSearch.result')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {businessSearch.selectedBusiness && (
        <div className="mt-4 space-y-4">
          <h2 className="text-sm font-semibold text-main">
            {`${t('signup.businessSearch.selected')} :`}
          </h2>
          <BusinessSearchItem business={businessSearch.selectedBusiness} />
        </div>
      )}
      <div className="flex justify-end gap-4">
        <Button color="main" onClick={handleConfirmClick}>
          {t('signup.buttons.confirm')}
        </Button>
        <Button color="red" onClick={closeModal}>
          {t('signup.buttons.Cancel')}
        </Button>
      </div>
    </div>
  )
}

function BusinessSearchItem({
  business,
  onClick,
  className,
}: {
  business: BusinessType
  onClick?: () => void
  className?: string
}): React.ReactElement {
  return (
    <div
      onClick={onClick}
      className={`${className} p-4 cursor-pointer transition-all rounded hover:bg-second-lower border-second-lower`}
    >
      <div className="flex items-center gap-x-4">
        <img
          loading="lazy"
          className="object-cover rounded w-14 h-14"
          // src={
          //   business.profileImageId
          //     ? businessService.getBusinessProfileImage(business.id)
          //     : defaultBusiness
          // }
          src={defaultBusiness}
        />
        <div className="flex flex-col">
          <p className="font-semibold truncate w-96 text-md">{business.name}</p>
          <div className="flex items-center text-sm gap-x-4">
            <span>{business.type}</span>
            <Link
              to={business.website}
              onClick={(e) => e.stopPropagation()}
              className="overflow-hidden hover:underline hover:text-main"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              Website: {business.website}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
