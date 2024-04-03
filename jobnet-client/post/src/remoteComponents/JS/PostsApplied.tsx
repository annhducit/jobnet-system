import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendar, FaFile } from 'react-icons/fa6'
import { Badge } from 'flowbite-react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import usePagination from '../../hooks/usePagination'
import useModal from '../../hooks/useModal'

import applicationService from '../../services/applicationService'
import jobSeekerService from '../../services/jobSeekerService'
import resumeService from '../../services/resumeService'

import profileImage from '../../assets/images/business-main-profile.png'

import Button from 'Common/Button'
import Selection from 'Common/input/Selection'
import Pagination from 'Common/Pagination'
import Modal from 'Common/Modal'
import { getAuth } from 'Common/auth'
import { setLoad } from 'Common/setLoad'

import type PaginationType from '../../types/pagination'
import type ApplicationType from '../../types/application'
import type ErrorType from '../../types/error'
import { BusinessTypeMF } from '../../types/business'
import businessService from '../../services/businessService'

export default function PostsApplied({
  applicationPagination,
}: {
  applicationPagination: PaginationType<ApplicationType>
}): React.ReactElement {
  const [business, setBusiness] = useState<BusinessTypeMF>()

  const { t } = useTranslation()

  const auth = getAuth()
  const jobSeekerId = auth.user?.id

  const { pagination, setPagination } = usePagination(applicationPagination)

  const [selectedApplicationId, setSelectedApplicationId] = useState<string>()
  const selectedApplication = pagination.data.find(
    (application) => application.id === selectedApplicationId
  )

  const { modal, openModal, closeModal } = useModal()

  const handleDetailsClick = (applicationId: string) => {
    setSelectedApplicationId(applicationId)
    openModal('details-modal')
  }

  const handleViewCVClick = (resumeId: string) => {
    void (async () => {
      closeModal()
      setLoad(true)

      try {
        const resumeBlob = await resumeService.getResumeFile(resumeId)
        const resumeBlobURL = URL.createObjectURL(resumeBlob)
        window.open(resumeBlobURL)
      } catch (err) {
        toast.error((err as ErrorType).message)
      } finally {
        openModal('details-modal')
        setLoad(false)
      }
    })()
  }

  const handlePageChange = (page: number) => {
    void (async () => {
      setLoad(true)

      try {
        const pagination = await applicationService.getApplications({
          page,
          jobSeekerId,
        })
        setPagination(pagination)
      } catch (err) {
        console.log((err as ErrorType).message)
      } finally {
        setLoad(false)
      }
    })()
  }

  const handleDetailsModalClose = () => {
    closeModal()
  }

  const applicationElms = pagination.data.map((application) => (
    <Application
      key={application.id}
      application={application}
      onDetailsClick={() => handleDetailsClick(application.id)}
    />
  ))

  useEffect(() => {
    void (async () => {
      if (selectedApplication?.post.business.id) {
        const data = await businessService.getBusinessById(
          selectedApplication?.post.business.id
        )
        setBusiness(data)
      }
    })()
  }, [selectedApplication?.post.business.id])

  return (
    <>
      <main className="p-2 pt-2 space-y-8">
        <div className="space-y-6">
          <div className="justify-between gap-2 recent-applications">
            <div className="font-semibold">
              {t('recentApplications.filter.applied')}:{' '}
              <span className="underline text-main">
                {t('recentApplications.filter.totalApplied', {
                  total: pagination.totalElements,
                })}
              </span>
            </div>
            <div className="flex items-center gap-4 ">
              <label className="font-semibold" htmlFor="sortBy">
                {t('recentApplications.filter.sort.title')}:
              </label>
              <Selection
                id="sortBy"
                name="sortBy"
                className="w-40"
                options={[
                  {
                    id: 1,
                    name: t('recentApplications.filter.sort.mostRecentUpdate'),
                  },
                  {
                    id: 2,
                    name: t(
                      'recentApplications.filter.sort.mostNeededRecruitment'
                    ),
                  },
                  {
                    id: 3,
                    name: t('recentApplications.filter.sort.topSalary'),
                  },
                ]}
              />
            </div>
          </div>
          <div className="gap-6 mt-5 recent-applications_layout">
            {applicationElms}
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {selectedApplication && (
        <Modal
          id="details-modal"
          show={modal === 'details-modal'}
          size="3xl"
          onClose={handleDetailsModalClose}
        >
          <Modal.Header>
            {t('recentApplications.post.detailModal.title')}
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="space-y-6">
                <DetailsFrame
                  title={t(
                    'recentApplications.post.detailModal.personInfo.title'
                  )}
                >
                  <div className="application-img">
                    <img
                      loading="lazy"
                      src={
                        selectedApplication.jobSeeker.profileImageId
                          ? jobSeekerService.getJobSeekerProfileImage(
                              selectedApplication.jobSeeker.id
                            )
                          : 'https://www.w3schools.com/howto/img_avatar2.png'
                      }
                      alt=""
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>

                  <div className="items-baseline recent-applications_layout grow gap-x-2">
                    <div className="space-y-4">
                      <DetailsSection
                        title={
                          t(
                            'recentApplications.post.detailModal.personInfo.name'
                          ) + ':'
                        }
                      >
                        {selectedApplication.jobSeeker.name}
                      </DetailsSection>
                      <DetailsSection
                        title={
                          t(
                            'recentApplications.post.detailModal.personInfo.gender'
                          ) + ':'
                        }
                      >
                        {selectedApplication.jobSeeker.gender || 'Nam'}
                      </DetailsSection>
                      <DetailsSection title="CV Link:">
                        <div
                          className="flex items-center justify-center rounded cursor-pointer w-28 gap-x-2 bg-second-lower hover:bg-second"
                          onClick={() =>
                            handleViewCVClick(selectedApplication.resumeId)
                          }
                        >
                          <FaFile className="text-main" />
                          Xem CV
                        </div>
                      </DetailsSection>
                      <DetailsSection
                        title={
                          t(
                            'recentApplications.post.detailModal.personInfo.BirthDate'
                          ) + ':'
                        }
                      >
                        {selectedApplication.jobSeeker.dateOfBirth ||
                          'Không có'}
                      </DetailsSection>
                    </div>
                    <div className="space-y-4">
                      <DetailsSection
                        title={
                          t(
                            'recentApplications.post.detailModal.personInfo.postName'
                          ) + ':'
                        }
                      >
                        <Link
                          to={`/posts/${selectedApplication.post.id}`}
                          className="hover:text-main hover:underline"
                        >
                          {selectedApplication.post.title}
                        </Link>
                      </DetailsSection>
                      <DetailsSection
                        title={
                          t(
                            'recentApplications.post.detailModal.personInfo.createdAt'
                          ) + ':'
                        }
                      >
                        {selectedApplication.createdAt}
                      </DetailsSection>
                      <DetailsSection
                        title={
                          t(
                            'recentApplications.post.detailModal.personInfo.position'
                          ) + ':'
                        }
                      >
                        {/* {selectedApplication.post.levels.toString() || */}
                        Employee
                      </DetailsSection>
                      <DetailsSection
                        title={
                          t(
                            'recentApplications.post.detailModal.personInfo.statusApp'
                          ) + ':'
                        }
                      >
                        <Badge className="w-min" color="success" size="sm">
                          {selectedApplication.applicationStatus}
                        </Badge>
                      </DetailsSection>
                    </div>
                  </div>
                </DetailsFrame>

                <DetailsFrame
                  title={t(
                    'recentApplications.post.detailModal.recruiterInfo.title'
                  )}
                >
                  <div className="flex items-center gap-10">
                    <img
                      loading="lazy"
                      src={`http://localhost:3012${profileImage}`}
                      className="object-cover w-20 h-20 rounded"
                    />
                    <div className="flex flex-col gap-y-2">
                      <Link
                        to={`/businesses/${selectedApplication.post.business.id}`}
                        className="text-lg font-semibold hover:text-main"
                      >
                        {selectedApplication.post.business.name}
                      </Link>
                      <div className="flex gap-4">
                        <div className="font-semibold">
                          {t(
                            'recentApplications.post.detailModal.recruiterInfo.industry'
                          )}
                          :
                        </div>
                        <div>{business?.type || 'Công ty ngoài nhà nước'}</div>
                      </div>
                      <div className="flex gap-4">
                        <div className="font-semibold">Website:</div>
                        <div>
                          {business?.website && (
                            <Link
                              to={business?.website}
                              className="hover:text-main hover:underline"
                            >
                              {business?.website}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </DetailsFrame>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex items-center ml-auto gap-x-2">
              <Button color="red" onClick={handleDetailsModalClose}>
                Đóng
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
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
        className={`w-full  flex flex-col gap-3 ${
          type === 'Admin' ? 'bg-mainLower' : 'bg-mainLower'
        } p-4 rounded-md`}
      >
        <div className="flex justify-between">
          <div>
            <Link
              to={`../../posts/${application?.post?.id}`}
              className="text-lg font-bold hover:text-main hover:underline"
            >
              {application.post.title.length > 32
                ? `${application.post.title.slice(0, 32)}...`
                : application.post.title}
            </Link>
            <div className="application-deadline_recent">
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
            <div className="px-2 text-sm text-white rounded-lg bg-main">
              {application.applicationStatus}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <img
            loading="lazy"
            src={`http://localhost:3012${profileImage}`}
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
          <div className="application-deadline_recent">
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

function DetailsFrame({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-main">{title}</h1>
      <div className="flex gap-10">{children}</div>
    </div>
  )
}

function DetailsSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-1">
      <div className="font-semibold">{title}</div>
      <div>{children}</div>
    </div>
  )
}
