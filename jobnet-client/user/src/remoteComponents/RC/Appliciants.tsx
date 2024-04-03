import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import clns from 'classnames'
import { toast } from 'react-toastify'
import { Table } from 'flowbite-react'
import { useTranslation } from 'react-i18next'

import useModal from '../../hooks/useModal'

import Input from 'Common/input/Input'
import Button from 'Common/Button'
import Tabs from 'Common/Tabs'
import Pagination from 'Common/Pagination'
import Modal from 'Common/Modal'
import EmptyTableRow from 'Common/table/EmptyTableRow'

import applicationService from '../../services/applicationService'
import jobSeekerService from '../../services/jobSeekerService'

import ApplicationType, { ApplicationStatus } from '../../types/application'
import PaginationType from '../../types/pagination'
import ErrorType from '../../types/error'

export default function Applicants({
  recruiterId,
}: {
  recruiterId: string | undefined
}): JSX.Element {
  const navigation = useNavigate()

  const [pagination, setPagination] =
    useState<PaginationType<ApplicationType>>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await applicationService.getApplications({ recruiterId })
      setPagination(data)
    }
    fetchData().catch((err) => {
      console.log(err)
    })
  }, [])

  const [criteria, setCriteria] = useState({
    applicationStatuses: undefined as Array<ApplicationStatus> | undefined,
    fromDate: '',
    toDate: '',
  })

  const [selectedApplicationId, setSelectedApplicationId] = useState<string>()
  const selectedApplication = pagination?.data?.find(
    (application) => application.id === selectedApplicationId
  )

  console.log(pagination)

  const { modal, openModal, closeModal } = useModal()

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCriteria((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

  const handleSearchClick = () => {
    void (async () => {
      try {
        const pagination = await applicationService.getApplications({
          ...criteria,
        })
        setPagination(pagination)
      } catch (err) {
        console.error((err as ErrorType).message)
      }
    })()
  }

  const handleTabClick = (applicationStatuses?: Array<ApplicationStatus>) => {
    void (async () => {
      try {
        const pagination = await applicationService.getApplications({
          recruiterId,
          applicationStatuses,
        })
        setPagination(pagination)
        setCriteria({
          applicationStatuses,
          fromDate: '',
          toDate: '',
        })
      } catch (err) {
        console.error((err as ErrorType).message)
      }
    })()
  }

  const handleDetailsClick = (applicationId: string) => {
    setSelectedApplicationId(applicationId)
    openModal('info-view-modal')
  }

  const handleApplicationStatusUpdate = (
    applicationId: string,
    applicationStatus: ApplicationStatus
  ) => {
    void (async () => {
      try {
        await applicationService.updateApplicationStatus(
          applicationId,
          applicationStatus
        )
        const _pagination = await applicationService.getApplications({
          page: pagination?.currentPage,
          recruiterId,
          ...criteria,
        })
        setPagination(_pagination)
        toast.success('Cập nhật trạng thái thành công.')
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handlePageChange = (page: number) => {
    void (async () => {
      try {
        const pagination = await applicationService.getApplications({
          page,
          recruiterId,
          ...criteria,
        })
        setPagination(pagination)
      } catch (err) {
        console.error((err as ErrorType).message)
      }
    })()
  }

  const { t } = useTranslation()

  const applicationElms = pagination?.data.map((application) => (
    <Table.Row
      key={application.id}
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <Table.Cell className="font-medium text-gray-900 truncate w-80 whitespace-nowrap dark:text-white">
        {application.post?.title}
      </Table.Cell>
      <Table.Cell>{application.jobSeeker.name}</Table.Cell>
      <Table.Cell>{application.createdAt}</Table.Cell>
      <Table.Cell>
        <span
          className={clns('px-2 text-white rounded-lg', {
            'bg-cyan-500': application.applicationStatus === 'Submitted',
            'bg-yellow-500': application.applicationStatus === 'Reviewed',
            'bg-red-500': application.applicationStatus === 'Rejected',
            'bg-main': application.applicationStatus === 'Hired',
          })}
        >
          {application.applicationStatus}
        </span>
      </Table.Cell>
      <Table.Cell className="flex items-center gap-2">
        <Button
          size="xs"
          color="cyan"
          onClick={() => handleDetailsClick(application.id)}
        >
          Chi tiết
        </Button>
        {['Submitted', 'Reviewed'].includes(application.applicationStatus) && (
          <>
            <Button
              size="xs"
              color="main"
              onClick={() =>
                handleApplicationStatusUpdate(application.id, 'Hired')
              }
            >
              Phê duyệt
            </Button>
            <Button
              size="xs"
              color="red"
              onClick={() =>
                handleApplicationStatusUpdate(application.id, 'Rejected')
              }
            >
              Từ chối
            </Button>
          </>
        )}
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <>
      <div className="gap-3 applications-page_second">
        <div className="applications-page">
          <Input
            id="fromDate"
            name="fromDate"
            label={t('recruiter.manageCandidate.fromDate')}
            type="date"
            color="main"
            value={criteria.fromDate}
            onChange={handleCriteriaChange}
          />
          <Input
            id="toDate"
            name="toDate"
            label={t('recruiter.manageCandidate.toDate')}
            type="date"
            color="main"
            value={criteria.toDate}
            onChange={handleCriteriaChange}
          />
        </div>
        <div className="mt-6 ml-auto">
          <Button onClick={handleSearchClick}>
            <FaSearch className="w-4 h-4 mr-2" />
            {t('recruiter.manageCandidate.search')}
          </Button>
        </div>
      </div>

      <Tabs>
        <Tabs.Item
          title={t('recruiter.manageCandidate.pending')}
          onTabClick={() => handleTabClick(['Submitted', 'Reviewed'])}
        />
        <Tabs.Item
          title={t('recruiter.manageCandidate.approved')}
          onTabClick={() => handleTabClick(['Hired'])}
        />
        <Tabs.Item
          title={t('recruiter.manageCandidate.rejected')}
          onTabClick={() => handleTabClick(['Rejected'])}
        />
        <Tabs.Item
          title={t('recruiter.manageCandidate.all')}
          onTabClick={() => handleTabClick()}
        />
      </Tabs>

      <Table>
        <Table.Head>
          <Table.HeadCell>
            {t('recruiter.manageCandidate.table.job')}
          </Table.HeadCell>
          <Table.HeadCell>
            {t('recruiter.manageCandidate.table.name')}
          </Table.HeadCell>
          <Table.HeadCell>
            {t('recruiter.manageCandidate.table.createdAt')}
          </Table.HeadCell>
          <Table.HeadCell>
            {t('recruiter.manageCandidate.table.status')}
          </Table.HeadCell>
          <Table.HeadCell>
            {t('recruiter.manageCandidate.table.action')}
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {applicationElms?.length ? applicationElms : <EmptyTableRow />}
        </Table.Body>
      </Table>

      <Pagination
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onPageChange={handlePageChange}
      />

      {selectedApplication && (
        <Modal
          id="info-view-modal"
          show={modal === 'info-view-modal'}
          size="3xl"
          onClose={closeModal}
        >
          <Modal.Header>Chi tiết ứng viên</Modal.Header>
          <Modal.Body className="space-y-5">
            <div className="flex gap-20">
              <div className="w-40 h-40 translate-y-1/4">
                <img
                  loading="lazy"
                  src={jobSeekerService.getJobSeekerProfileImage(
                    selectedApplication.jobSeeker.id
                  )}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="modal-resume_layout grow">
                <div className="space-y-4">
                  <ModalInfo title="Họ và tên:">
                    {selectedApplication.jobSeeker.name}
                  </ModalInfo>
                  <ModalInfo title="Giới tính:">
                    {selectedApplication.jobSeeker.gender || 'Không có'}
                  </ModalInfo>
                  <ModalInfo title="CV Link:">
                    <div
                      className="px-3 text-center text-white rounded cursor-pointer bg-main hover:bg-mainHover"
                      onClick={() =>
                        navigation(
                          `../view-resume/${selectedApplication.resume?.id}`
                        )
                      }
                    >
                      Xem CV
                    </div>
                  </ModalInfo>
                  <ModalInfo title="Ngày sinh:">
                    {selectedApplication.jobSeeker.dateOfBirth || 'Không có'}
                  </ModalInfo>
                </div>
                <div className="space-y-4">
                  <ModalInfo title="Tên công việc:">
                    {selectedApplication.post.title}
                  </ModalInfo>
                  <ModalInfo title="Ngày ứng tuyển:">
                    {selectedApplication.createdAt}
                  </ModalInfo>
                  <ModalInfo title="Trạng thái:">
                    <span
                      className={clns('px-2 text-white rounded-lg', {
                        'bg-cyan-500':
                          selectedApplication.applicationStatus === 'Submitted',
                        'bg-yellow-500':
                          selectedApplication.applicationStatus === 'Reviewed',
                        'bg-red-500':
                          selectedApplication.applicationStatus === 'Rejected',
                        'bg-main':
                          selectedApplication.applicationStatus === 'Hired',
                      })}
                    >
                      {selectedApplication.applicationStatus}
                    </span>
                  </ModalInfo>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                color="main"
                onClick={() =>
                  handleApplicationStatusUpdate(selectedApplication.id, 'Hired')
                }
              >
                Phê duyệt
              </Button>
              <Button
                color="red"
                onClick={() =>
                  handleApplicationStatusUpdate(
                    selectedApplication.id,
                    'Rejected'
                  )
                }
              >
                Hủy
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

function ModalInfo({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <div className="font-semibold">{title}</div>
      <div>{children}</div>
    </div>
  )
}
