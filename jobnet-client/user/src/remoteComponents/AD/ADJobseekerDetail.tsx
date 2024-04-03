import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Modal } from 'flowbite-react'
import { FaCalendar } from 'react-icons/fa6'

import jobseekersService from '../../services/jobSeekerService'
import applicationService from '../../services/applicationService'
import jobSeekerService from '../../services/jobSeekerService'

import businessService from 'Business/services'

import Button from 'Common/Button'
import { setLoad } from 'Common/setLoad'

import { RCAccountComponent } from '../../components/RCAccountComponent'

import useModal from '../../hooks/useModal'
import business from '../../assets/images/business.png'

import Jobseeker from '../../types/jobSeeker'
import ErrorType from '../../types/error'
import ApplicationType from '../../types/application'

export default function ADJobSeekerDetail({
  jobseekerId,
}: {
  jobseekerId: string
}) {
  const [jobseeker, setJobseeker] = useState<Jobseeker>()
  const [appRecents, setAppRecents] = useState<ApplicationType[]>()
  const [updateData, setUpdateData] = useState<boolean>(true)

  const { modal, openModal, closeModal } = useModal()

  useEffect(() => {
    async function getJobSeeker(): Promise<void> {
      const Jobseeker = await jobseekersService.getJobSeekerById(
        jobseekerId || ''
      )
      if (!Jobseeker.dateOfBirth)
        Jobseeker.dateOfBirth = 'Ngày sinh chưa cập nhật'
      if (!Jobseeker.gender) Jobseeker.gender = 'Chưa cập nhật'
      if (!Jobseeker.phone) Jobseeker.phone = 'Chưa cập nhật'
      if (!Jobseeker.address) Jobseeker.address = 'Chưa cập nhật'
      setJobseeker(Jobseeker)
    }
    getJobSeeker().catch(() => {
      toast.error('Không thể cập nhật dữ liệu')
    })
  }, [jobseekerId, updateData])

  const deleteJobseeker = (): void => {
    closeModal()
    setLoad(true)
    jobseekersService
      .deleteJobSeekerById(jobseekerId)
      .then(() => {
        toast.success('Đã khóa người dùng')
        setLoad(false)
        setUpdateData(!updateData)
      })
      .catch(() => {
        toast.error('Không thể khóa người dùng')
        setLoad(false)
      })
  }

  useEffect(() => {
    void (async () => {
      try {
        const pagination = await applicationService.getApplications({
          jobSeekerId: jobseekerId,
        })
        setAppRecents(pagination.data)
      } catch (err) {
        console.log((err as ErrorType).message)
      }
    })()
  }, [jobseekerId])

  return (
    <div className="max-h-screen py-6 pr-4 overflow-y-scroll">
      <RCAccountComponent
        type="Jobseeker"
        openModel={openModal}
        getProfileImage={jobSeekerService.getJobSeekerProfileImage(jobseekerId)}
        data={jobseeker}
      />

      <div>
        <h2 className="font-semibold text-md text-main">Lịch sử ứng tuyển</h2>
        <hr className="mt-4 border-second-lower" />
        <div className="grid grid-cols-2 gap-4 py-4">
          {appRecents?.map((application) => (
            <Application
              application={application}
              key={application.id}
              type="Admin"
            />
          ))}
        </div>
      </div>
      <Modal
        id="delete-account-jobseeker"
        show={modal === 'delete-account-jobseeker'}
        size="md"
        popup
        onClose={() => closeModal()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn khóa tài khoản này không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteJobseeker}>
                Tôi chắc chắn
              </Button>
              <Button color="gray" onClick={() => closeModal()}>
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

type ViewMode = 'Admin' | 'Jobseeker'
export function Application({
  application,
  onDetailsClick,
  type = 'Jobseeker',
}: {
  application: ApplicationType
  onDetailsClick?: () => void
  type?: ViewMode
}): React.ReactElement {
  const { t } = useTranslation()
  return (
    <>
      <div
        className={`w-full h-[200px] flex flex-col gap-3 ${
          type === 'Admin' ? 'bg-second-lower' : 'bg-second-lower'
        } p-6 rounded-md`}
      >
        <div className="flex justify-between">
          <div>
            <Link
              to={`../../posts/${application.post?.id}`}
              className="text-lg font-bold hover:text-main hover:underline"
            >
              {application.post.title.length > 32
                ? `${application.post.title.slice(0, 32)}...`
                : application.post.title}
            </Link>
            <div className="flex items-center gap-4">
              <p>
                {application.post.minSalaryString} -{' '}
                {application.post.maxSalaryString} triệu
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold">
              {t('recentApplications.post.status')}:
            </p>
            <div className="px-2 text-sm text-white rounded-lg bg-main-lower">
              {application.applicationStatus}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <img
            loading="lazy"
            src={
              application.post.business.profileImageId
                ? businessService.getBusinessProfileImage(
                    application.post.business.id
                  )
                : business
            }
            className="object-cover w-12 h-12 rounded"
          />

          <Link
            to={`/businesses/${application.post.business.id}`}
            className="font-semibold hover:text-main"
          >
            {application.post.business?.name}
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>
              <FaCalendar className="text-main" />
            </span>
            <p className="text-sm">
              {t('recentApplications.post.applicationDate')}:{' '}
              {application.createdAt}
            </p>
          </div>
          {type === 'Jobseeker' && (
            <div className="flex items-center gap-2 ">
              <Button size="sm" onClick={onDetailsClick}>
                {t('recentApplications.post.button.detail')}
              </Button>
              {application.applicationStatus === 'Submitted' && (
                <Button color="red" size="sm">
                  {t('recentApplications.post.button.cancel')}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
