import { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import clns from 'classnames'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import {
  FaEnvelope,
  FaLink,
  FaLocationDot,
  FaLock,
  FaPhone,
  FaUpload,
} from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import businessService from '../services/businessService'
import jobSeekerService from '../services/jobSeekerService'

import businessBackground from '../assets/images/business-profile.png'
import businessProfle from '../assets/images/business-main-profile.png'

import Button from 'Common/Button'
import ItemPostHeading from 'Common/ItemPostHeading'

import BusinessType from '../types/business'

import { getAuth } from 'Common/auth'
interface BusinessInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: 'view' | 'update' | 'admin'
  business: BusinessType
  openModal?: (id: string) => void
}

export default function BusinessInfo({
  className,
  mode = 'view',
  business,
  openModal = () => undefined,
}: BusinessInfoProps) {
  const { t } = useTranslation()

  const auth = getAuth()

  const jobSeekerId = auth.user?.id as string
  const businessId = business.id
  const [follow, setFollow] = useState(false)
  if (jobSeekerId) {
    business.followers?.forEach((i) => {
      if (i == jobSeekerId && !follow) {
        setFollow(true)
      }
    })
  }

  const handleFollowClick = () => {
    void (async () => {
      if (!jobSeekerId) {
        toast.error('Error: You need to Login')
        return
      }
      const jobSeekerRes =
        await jobSeekerService.updateJobSeekerBusinessFollowed(jobSeekerId, {
          status: 'FOLLOW',
          businessId: businessId,
        })
      if (!jobSeekerRes) {
        return toast.error('Error: ')
      }
      const business = await businessService.updateBusinessFollowers(
        businessId,
        {
          status: 'FOLLOW',
          userId: jobSeekerId,
        }
      )
      if (business) {
        setFollow(true)
        toast.success(t('toast.follow.followed'))
      }
    })()
  }

  const handleUnFollowClick = () => {
    void (async () => {
      const jobSeekerRes =
        await jobSeekerService.updateJobSeekerBusinessFollowed(jobSeekerId, {
          status: 'UNFOLLOW',
          businessId: businessId,
        })
      if (!jobSeekerRes) {
        return toast.error('Error: ')
      }
      const business = await businessService.updateBusinessFollowers(
        businessId,
        {
          status: 'UNFOLLOW',
          userId: jobSeekerId,
        }
      )
      if (business) {
        setFollow(false)
        toast.success(t('toast.follow.unfollow'))
      }
    })()
  }
  return (
    <div className={clns(className, 'space-y-4')}>
      <div className="heading-business">
        <div className="relative h-56 background-business">
          <img
            loading="lazy"
            src={`http://localhost:3012${businessBackground}`}
            className="object-cover w-full h-full rounded-t"
          />
          {mode === 'update' && (
            <div
              onClick={() => openModal('background-image-upload-modal')}
              className="absolute bottom-0 right-0 p-2 text-sm font-semibold text-white transition-all rounded-tl cursor-pointer hover:bg-main-upper bg-main"
            >
              Cập nhật ảnh bìa
            </div>
          )}
        </div>
        <div className="relative gap-8 p-8 bg-white border rounded-b layout-business_second">
          {mode === 'update' ? (
            <div className="relative w-40 h-40 rounded-full">
              <img
                loading="lazy"
                src={`http://localhost:3012${businessProfle}`}
                className="object-center w-full h-full border-2 border-white rounded-full"
              />
              <div
                onClick={() => openModal('profile-image-upload-modal')}
                className="absolute bottom-0 right-0 p-2 transition-all cursor-pointer bg-main hover:bg-main-upper"
              >
                <FaUpload className="w-5 h-5 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-40 h-40 rounded-full">
              <img
                loading="lazy"
                src={`http://localhost:3012${businessProfle}`}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          )}

          <div className="grow">
            <div className="item-flex">
              <h4 className="text-2xl font-bold truncate business-name">
                {business.name}
              </h4>
              {mode === 'view' && (
                <div className="flex gap-4">
                  {!follow ? (
                    <Button onClick={() => handleFollowClick()}>
                      <FaPlusCircle className="w-5 h-5 mr-2" />
                      {t('businessDetail.businessInfo.btnFollow.follow')}
                    </Button>
                  ) : (
                    <Button color={'red'} onClick={() => handleUnFollowClick()}>
                      <FaPlusCircle className="w-5 h-5 mr-2" />
                      {t('businessDetail.businessInfo.btnFollow.unfollow')}
                    </Button>
                  )}
                </div>
              )}

              {mode === 'admin' && (
                <Button
                  color={'red'}
                  size={'sm'}
                  disabled={business?.isDeleted}
                  className="absolute right-[40px]"
                  onClick={() => openModal('modal-lock-account')}
                >
                  <FaLock className="mr-2" />
                  {t('recruiter.profile.adminRole.lockAccount')}
                </Button>
              )}
            </div>
            <div className="gap-4 mt-8 layout-info">
              <div className="flex">
                <div className="font-semibold">
                  {t('businessDetail.businessInfo.type')}:
                </div>
                <div className="ml-4">Ngoài nhà nước</div>
              </div>
              <div className="flex">
                <div className="font-semibold">
                  {t('businessDetail.businessInfo.region')}:
                </div>
                <div className="ml-4">{business.country}</div>
              </div>
              <div className="flex">
                <div className="font-semibold">
                  {t('businessDetail.businessInfo.scale.title')}:
                </div>
                <div className="ml-4">
                  {t('businessDetail.businessInfo.scale.total', {
                    total: business.employeeQuantity,
                  })}
                </div>
              </div>
              <div className="flex">
                <div className="font-semibold">
                  {t('businessDetail.businessInfo.foundedYear')}:
                </div>
                <div className="ml-4">{business.foundedYear || '2002'}</div>
              </div>
            </div>
          </div>
          {mode === 'update' && (
            <div
              onClick={() => openModal('general-info-update-modal')}
              className="absolute bottom-0 right-0 p-2 text-sm font-semibold text-white transition-all rounded-tl cursor-pointer hover:bg-main-upper bg-main"
            >
              {t('recruiter.business.updatebusinessInfo')}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-0 gap-y-4">
        <div className="col-span-2 bg-white border rounded">
          <div className="p-6 rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <p className="h-8 w-[6px] bg-main"></p>
                <div className="text-lg font-bold">
                  {t('businessDetail.businessInfo.descBusiness')}
                </div>
              </div>
              {mode === 'update' && (
                <Button
                  size="sm"
                  onClick={() => openModal('introduction-info-update-modal')}
                >
                  {t('recruiter.business.editDescription')}
                </Button>
              )}
            </div>
            {business.description ? (
              <p
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: business.description }}
              />
            ) : (
              <div className="flex items-center justify-center h-24 text-2xl">
                {t('recruiter.business.emptyInfo')}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-white border rounded gap-y-3">
          <div className="flex flex-col p-6 rounded gap-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <p className="h-8 w-[6px] bg-main"></p>
                <div className="text-lg font-bold">
                  {t('businessDetail.businessInfo.contact.title')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <ItemPostHeading
                icon={<FaEnvelope />}
                title="Email"
                content={business.emailDomain || 'trongduc@gmail.com'}
              />
            </div>
            <div className="flex items-center gap-x-4">
              <ItemPostHeading
                icon={<FaPhone />}
                title={t('businessDetail.businessInfo.contact.phone')}
                content={business.phone || '0355852444'}
              />
            </div>
            <div className="flex items-center gap-x-4">
              <ItemPostHeading
                icon={<FaLink />}
                title="Website"
                content={
                  <Link
                    to={business.website}
                    className="transition-all cursor-pointer hover:underline hover:text-main"
                  >
                    {business.website}
                  </Link>
                }
              />
            </div>
            <div className="pb-4 space-y-2">
              <ItemPostHeading
                type="list"
                icon={<FaLocationDot />}
                title={t('businessDetail.businessInfo.contact.address')}
                content={business.locations?.map((location, i) => (
                  <li key={i}>{location}</li>
                ))}
              />
            </div>
            {mode === 'update' && (
              <Button
                size="sm"
                onClick={() => openModal('contact-info-update-modal')}
              >
                {t('recruiter.business.updateContact')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
