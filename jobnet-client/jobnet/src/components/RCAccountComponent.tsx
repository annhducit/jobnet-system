import { FaLock, FaUpload } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '../app/store'

import RecruiterType from '../types/recruiter'
import bgImage from '../assets/images/recruiter-auth.png'
import Button from 'Common/Button'
import JobseekerType from '../types/jobSeeker'
import { Badge } from 'flowbite-react'

type AccountType = 'Admin' | 'Recruiter' | 'Jobseeker'
export const RCAccountComponent = ({
  data,
  type = 'Recruiter',
  openModel,
  getProfileImage,
}: {
  data: RecruiterType | JobseekerType | undefined
  type?: AccountType
  openModel: (id: string) => void
  getProfileImage: string
}) => {
  const auth = useSelector((state: RootState) => state.auth)

  const { t } = useTranslation()
  return (
    <>
      {' '}
      <div className="relative w-full h-56 bg-second-lower">
        <img src={bgImage} className="object-cover w-full h-full" alt="" />
      </div>
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-x-4">
          <div className="relative pl-6 rounded-full -translate-y-2/4">
            <img
              src={
                data?.profileImageId
                  ? getProfileImage
                  : `https://www.w3schools.com/howto/img_avatar2.png`
              }
              className="object-cover w-40 h-40 border-4 border-white rounded-full"
            />
            {type === 'Recruiter' && (
              <div
                onClick={() => openModel('upload-profile-image-modal')}
                className="absolute p-2 transition-all rounded-full cursor-pointer bottom-2 right-2 bg-second-lower hover:bg-second"
              >
                <FaUpload className="text-xl text-second" />
              </div>
            )}
          </div>
          <h2 className="flex-1 -mt-10 text-sm font-semibold lg:text-lg text-second-upper">
            {data?.name}
          </h2>
        </div>
        {type === 'Recruiter' && (
          <div className="flex gap-x-2 lg:-mt-10 lg:flex">
            <p className="">{t('recruiter.profile.authenticate')}</p>
            <Badge color="failure" className="text-sm text-center">
              {t('recruiter.profile.status.unCompleted')}
            </Badge>
          </div>
        )}

        {type === 'Admin' && (
          <div className="-mt-10">
            <Button
              color={'red'}
              size={'sm'}
              disabled={data?.locked}
              className="ml-auto"
              onClick={() => openModel('delete-account')}
            >
              <FaLock className="mr-2" />
              {t('recruiter.profile.adminRole.lockAccount')}
            </Button>
          </div>
        )}
        {type === 'Jobseeker' && (
          <div className="-mt-10">
            <Button
              color={'red'}
              size={'sm'}
              disabled={data?.locked}
              className="ml-auto"
              onClick={() => openModel('delete-account-jobseeker')}
            >
              <FaLock className="mr-2" />
              {t('recruiter.profile.adminRole.lockAccount')}
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col -translate-y-10 gap-y-4">
        <div className="flex lg:items-center lg:gap-y-0 gap-y-4 lg:flex-row  flex-col gap-x-[155px]">
          <p className="text-lg font-semibold text-main">
            {t('recruiter.profile.title')}
          </p>
          <div className="flex items-center gap-x-2">
            <p>{t('recruiter.profile.status.title')}:</p>
            {auth.user?.email && auth.user.name ? (
              <Badge color="success" className="text-sm text-center">
                {t('recruiter.profile.status.completed')}
              </Badge>
            ) : (
              <Badge color="failure" className="text-sm text-center">
                {t('recruiter.profile.status.unCompleted')}
              </Badge>
            )}
          </div>
          {type === 'Recruiter' && (
            <div
              onClick={() => openModel('update-recruiter-info-modal')}
              className="px-2 py-1 text-sm text-center text-white transition-all rounded cursor-pointer lg:ml-auto bg-main hover:bg-main-upper"
            >
              {t('recruiter.profile.update.button')}
            </div>
          )}
          {type === 'Admin' && (
            <div className="flex ml-auto gap-x-2">
              {t('recruiter.profile.adminRole.accountStatus.label')}
              {!data?.locked ? (
                <Badge color="success" className="px-2 text-sm">
                  {t('recruiter.profile.adminRole.accountStatus.normal')}
                </Badge>
              ) : (
                <Badge color="failure" className="px-2 text-sm">
                  {t('recruiter.profile.adminRole.accountStatus.locked')}
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <hr className=" border-second-lower" />
          <div className="flex flex-col lg:flex-row">
            <table className="text-left">
              <tbody>
                <tr>
                  <th className="py-2">
                    {t('recruiter.profile.information.labelFullname')}:{' '}
                  </th>
                  <td className="py-2 lg:pl-44">{data?.name}</td>
                </tr>
                <tr>
                  <th className="py-2">Email: </th>
                  <td className="py-2 lg:pl-44">{data?.email}</td>
                </tr>
                <tr>
                  <th className="py-2">
                    {t('recruiter.profile.information.labelPhonenumber')}:{' '}
                  </th>
                  <td className="py-2 lg:pl-44">{data?.phone}</td>
                </tr>
                <tr>
                  <th className="py-2">
                    {t('recruiter.profile.information.labelCountry')}:{' '}
                  </th>
                  <td className="py-2 lg:pl-44">{data?.nation}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
