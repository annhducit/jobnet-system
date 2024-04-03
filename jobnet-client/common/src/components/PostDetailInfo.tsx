import React, { ReactNode,useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBusinessTime,
  FaCertificate,
  FaCircleDollarToSlot,
  FaClock,
  FaHourglassStart,
  FaIndustry,
  FaLocationDot,
  FaLock,
  FaPeopleGroup,
  FaPhone,
  FaRankingStar,
  FaUserGroup,
} from 'react-icons/fa6'
import clns from 'classnames'
import { useTranslation } from 'react-i18next'

import useIsInWishlist from '../hooks/useIsInWishlist'
import businessService from 'Business/services'
import Button from '../components/Button'

import PostType from '../types/post'
import BusinessType from '../types/business'

export function PostDetailsInfo({
  type = 'View',
  post,
  isSubmitted,
  openModal = () => undefined,
  handleClickUpdateHeading,
  handleClickUpdateGeneral,
  handleClickUpdateDetails,
}: {
  type?: 'View' | 'Update' | 'Admin' | 'Preview'
  post: PostType
  isSubmitted?: boolean
  openModal?: (id: string) => void
  handleClickUpdateHeading?: () => void
  handleClickUpdateGeneral?: () => void
  handleClickUpdateDetails?: () => void
}): React.ReactElement {
  const [business, setBusiness] = useState<BusinessType>()
  const { t } = useTranslation()

  const { isInWishlist, addToWishlist } = useIsInWishlist(post.id)

  useEffect(() => {
    void (async () => {
      const data = await businessService.getBusinessById(post.business.id)
      setBusiness(data)
    })()
  }, [post.business.id])

  // const locationElms = post.business.locations.map((location, index) => (
  //   <p key={index}>
  //     {location.provinceName} - {location.specificAddress}
  //   </p>
  // ))

  return (
    <div className="space-y-4">
      <PostDetailsSection>
        <div className="col-span-1 p-6 border rounded bg-second-lower">
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <img
                src={businessService.getBusinessProfileImage(post.business?.id)}
                className="object-cover w-24 h-24 border rounded border-second-lower"
              />
              <h2 className="text-lg font-semibold">{post.business?.name}</h2>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-4">
                <div className="flex items-center gap-x-4">
                  <FaUserGroup className="text-main" />
                  <span className="w-20 font-semibold">
                    {t('postDetails.BusinessInfor.scale.title')}:
                  </span>
                </div>
                <p>
                  {t('postDetails.BusinessInfor.scale.total', {
                    total: business?.employeeQuantity,
                  })}
                </p>
              </div>
              <div className="flex gap-x-4">
                <div className="flex items-center gap-x-4">
                  <FaLocationDot className="text-main" />
                  <span className="w-20 font-semibold">
                    {t('postDetails.BusinessInfor.address')}:
                  </span>
                </div>
                {/* {locationElms} */}
              </div>
            </div>
            {type !== 'Preview' && (
              <Link
                to={`/businesses/${post.business?.id}`}
                className="font-semibold text-center text-main hover:underline"
              >
                {t('postDetails.BusinessInfor.viewDetailBusiness')}
              </Link>
            )}
          </div>
        </div>

        <div className="p-6 col-span-2 h-[auto] border rounded bg-second-lower">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl font-bold">{post?.title}</h1>
            <div className="flex flex-col lg:items-center lg:flex-row gap-y-10 gap-x-4">
              <ItemPostHeading
                icon={<FaIndustry />}
                title={t('postDetails.aboutJob.industry')}
                content={post?.profession?.name}
                size="large"
              />
              <ItemPostHeading
                icon={<FaHourglassStart />}
                title={t('postDetails.aboutJob.experience')}
                content={post?.yearsOfExperience}
                size="large"
              />
              <ItemPostHeading
                icon={<FaCircleDollarToSlot />}
                title={t('postDetails.aboutJob.salary')}
                content={`${post?.minSalaryString} - ${post?.maxSalaryString}`}
                size="large"
              />
              <ItemPostHeading
                icon={<FaPeopleGroup />}
                title={t('postDetails.aboutJob.numberApply')}
                content={`${post?.requisitionNumber} người`}
                size="large"
              />
            </div>
            <span className="flex items-center px-2 mt-4 rounded w-60 gap-x-2 bg-second-lower">
              <FaClock className="text-second" />
              <span>
                {t('postDetails.aboutJob.appDeadline', {
                  deadline: post?.applicationDeadline,
                })}
              </span>
            </span>
            {type === 'Update' && (
              <Button className="ml-auto" onClick={handleClickUpdateHeading}>
                Cập nhật
              </Button>
            )}
            {type !== 'Preview' && (
              <div className="flex items-center pt-4 gap-x-2">
                {type === 'View' && (
                  <Button
                    disabled={isSubmitted}
                    className="flex-1"
                    onClick={() => openModal('application-modal')}
                  >
                    {isSubmitted
                      ? t('postDetails.aboutJob.button.apply.js.applied')
                      : t('postDetails.aboutJob.button.apply.js.notApply')}
                  </Button>
                )}
                {type === 'Admin' && post.activeStatus === 'Pending' && (
                  <Button
                    className="w-40 ml-auto"
                    color={'warning'}
                    onClick={() => openModal('approval-post')}
                  >
                    Xét duyệt
                  </Button>
                )}
                {type === 'Admin' &&
                  !['Pending', 'Blocked', 'Rejected'].includes(
                    post.activeStatus
                  ) && (
                    <Button
                      className="w-40 ml-auto"
                      color={'red'}
                      onClick={() => openModal('lock-post-modal')}
                    >
                      <FaLock className="mr-2" />
                      Khóa bài đăng
                    </Button>
                  )}

                {type === 'View' && (
                  <Button
                    className={clns('border flex-2', {
                      'text-white bg-red-600 hover:border-red-700':
                        isInWishlist,
                      'border-main hover:border-main-upper hover:bg-second-lower':
                        !isInWishlist,
                    })}
                    color="empty"
                    onClick={(e) => {
                      addToWishlist(), e.stopPropagation()
                    }}
                  >
                    {!isInWishlist
                      ? t('postDetails.aboutJob.button.save')
                      : t('postDetails.aboutJob.button.unsave')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </PostDetailsSection>

      <PostDetailsSection>
        <div
          className={clns('col-span-1 p-6 rounded', {
            'bg-second-lower border h-auto':
              type === 'Update' || type === 'Preview',
            'bg-white border': type !== 'Update',
          })}
        >
          <div className="flex items-center gap-x-4">
            <p className="h-8 w-[6px] bg-main"></p>
            <h1 className="text-lg font-semibold">
              {t('postDetails.requirements.title')}:
            </h1>
          </div>
          <div className="flex flex-col pt-4 gap-y-6">
            <ItemPostHeading
              icon={<FaCertificate />}
              title={t('postDetails.requirements.degree')}
              // content={post.degrees?.map((item, index) => (
              //   <span key={index}>
              //     {item.name}
              //     {index !== post.degrees.length - 1 && ', '}
              //   </span>
              // ))}
              content=""
            />
            <ItemPostHeading
              icon={<FaRankingStar />}
              title={t('postDetails.requirements.level')}
              content={post.levels?.map((item, index) => (
                <span key={index}>
                  {item.name}
                  {/* {index !== post.degrees.length - 1 && ', '} */}
                </span>
              ))}
            />
            <ItemPostHeading
              icon={<FaBusinessTime />}
              title={t('postDetails.requirements.workForm')}
              content={post.workingFormat}
            />

            <ItemPostHeading
              icon={<FaPhone />}
              title={t('postDetails.requirements.contact')}
              // content={post.internalContact}
              content=""
            />
            <ItemPostHeading
              type="list"
              icon={<FaLocationDot />}
              title={t('postDetails.requirements.location')}
              content={post.locations.map((location, index) => (
                <li key={index}>
                  {`${location.specificAddress}, ${location.provinceName}`}
                  {index !== post.locations.length - 1 && <br />}
                </li>
              ))}
            />
          </div>
          {type === 'Update' && (
            <div className="block float-right pt-6">
              <Button onClick={handleClickUpdateGeneral}>Cập nhật</Button>
            </div>
          )}
        </div>

        <div
          className={clns('w-full col-span-2 p-6', {
            'bg-second-lower border': type === 'Update' || type === 'Preview',
            'bg-white border': type !== 'Update',
          })}
        >
          <div className="flex items-center gap-x-4">
            <p className="h-8 w-[6px] bg-main"></p>
            <h2 className="text-xl font-bold">
              {t('postDetails.requirements.detail')}
            </h2>
          </div>
          <div className="flex flex-col gap-y-6">
            <div
              className="flex flex-col pt-4 gap-y-3"
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></div>
            {type === 'View' && (
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-4">
                  <p className="h-8 w-[6px] bg-main"></p>
                  <h3 className="text-lg font-semibold">
                    {t('postDetails.requirements.instructApply.title')}
                  </h3>
                </div>
                <p>{t('postDetails.requirements.instructApply.subTitle')}</p>
                <div className="flex items-center gap-x-2">
                  <Button>
                    {t('postDetails.aboutJob.button.apply.js.notApply')}
                  </Button>

                  <Button
                    className="border flex-2 border-main hover:border-main-upper hover:bg-second-lower"
                    color="empty"
                  >
                    {t('postDetails.aboutJob.button.save')}
                  </Button>
                </div>
              </div>
            )}
            {type === 'Update' && (
              <div className="ml-auto">
                <Button onClick={handleClickUpdateDetails}>Cập nhật</Button>
              </div>
            )}
          </div>
        </div>
      </PostDetailsSection>
    </div>
  )
}

function PostDetailsSection({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4 gap-y-2">
      {children}
    </div>
  )
}


type TypeShowItem = 'normal' | 'list'
export function ItemPostHeading({
  icon,
  title,
  content,
  type = 'normal',
  size,
}: {
  icon: ReactNode
  title: string
  content: React.ReactNode
  type?: TypeShowItem
  size?: string
}) {
  return (
    <div
      className={clns('flex gap-x-4', {
        'items-start': type === 'list',
        'items-center': type !== 'list',
      })}
    >
      <span
        className={clns('text-white rounded-full bg-main', {
          'p-4': size === 'large',
          'p-3': size !== 'large',
        })}
      >
        {icon}
      </span>
      <div
        className={clns('flex flex-col translate-y-0', {
          'translate-y-2': type === 'list',
        })}
      >
        <p className="font-semibold">{title}</p>
        <p
          className={clns('font-normal', {
            'pt-2 -translate-x-2': type === 'list',
          })}
        >
          {content}
        </p>
      </div>
    </div>
  )
}
