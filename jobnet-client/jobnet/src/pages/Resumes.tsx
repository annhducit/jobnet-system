import { useState, useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import useTitlePage from '../hooks/useTitlePage'

import { useAppDispatch } from '../app/hooks'
import { setLoading } from '../features/loading/loadingSlice'

import useModal from '../hooks/useModal'

import resumeService from 'User/Resume'

import { requireAuth } from '../utils/auth'

import { Badge, Table } from 'flowbite-react'
import Button from 'Common/Button'
import Modal from 'Common/Modal'
import FileUpload from 'Common/FileUpload'
import Radio from 'Common/input/Radio'
import EmptyTableRow from 'Common/table/EmptyTableRow'

import ResumeType from '../types/resume'
import { FaEye } from 'react-icons/fa6'

import recruiterService from 'User/Recruiter/services'
import { AxiosError } from 'axios'
interface ResumesLoader {
  resumes: Array<ResumeType>
}

Resumes.loader = async function ({
  request,
}: {
  request: Request
}): Promise<ResumesLoader> {
  requireAuth(request, 'JobSeeker')

  const resumes = await resumeService.getResumesByAuth()
  return { resumes }
}

export default function Resumes(): React.ReactElement {
  const loader = useLoaderData() as ResumesLoader

  const { t } = useTranslation()
  useTitlePage(t('pageTitle.resumes'))

  const dispatch = useAppDispatch()

  const [resumes, setResumes] = useState(loader.resumes)

  const [viewerId, setViewerId] = useState<Array<string>>()

  const [file, setFile] = useState<File>()

  const [recruiterViewed, setRecruiterViewed] = useState<Array<any>>()

  const navigate = useNavigate()

  const initPermission = (resume?: ResumeType) => ({
    id: resume?.id,
    accessPermission: resume?.accessPermission,
    supportPermission: resume?.supportPermission,
  })

  const [permission, setPermission] = useState(initPermission())

  const { modal, openModal, closeModal } = useModal()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0])

  const handleCvUpload = () => {
    if (!file) {
      toast.error(t('toast.applyCV.noneFileUpload'))
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    void (async () => {
      closeModal()
      dispatch(setLoading(true))

      try {
        const resume = await resumeService.createResume(formData)
        setResumes((prev) => [...prev, resume])
        setFile(undefined)
        toast.success(t('toast.applyCV.uploadCVSucess'))
      } catch (err) {
        openModal('cv-upload-modal')
        const message = (err as AxiosError).response?.status
          ? t(`errors.${(err as AxiosError).response?.status}`)
          : 'Error: Unknow'
        toast.error(message)
      } finally {
        dispatch(setLoading(false))
      }
    })()
  }

  const handleEditClick = (resumeId: string) => {
    const resume = resumes.find((resume) => resume.id === resumeId)
    setPermission(initPermission(resume))
    openModal('permission-update-modal')
  }

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPermission((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handlePermissionUpdate = () => {
    const resumeId = permission.id
    const req = {
      accessPermission: permission.accessPermission,
      supportPermission: permission.supportPermission,
    }

    resumeId &&
      void (async () => {
        closeModal()
        dispatch(setLoading(true))

        try {
          const _resume = await resumeService.updateResume(resumeId, req)
          setResumes((prev) =>
            prev.map((resume) => (resume.id === _resume.id ? _resume : resume))
          )
          setPermission(initPermission())
          toast.success(t('toast.CV.permission.success'))
        } catch (err) {
          openModal('permission-update-modal')
          const message = (err as AxiosError).response?.status
            ? t(`errors.${(err as AxiosError).response?.status}`)
            : 'Error: Unknow'
          toast.error(message)
        } finally {
          dispatch(setLoading(false))
        }
      })()
  }

  const handleDeleteClick = (resumeId: string) => {
    void (async () => {
      dispatch(setLoading(true))

      try {
        await resumeService.deleteResumeById(resumeId)
        setResumes((prev) => prev.filter((resume) => resume.id !== resumeId))
        toast.success(t('toast.CV.remove'))
      } catch (err) {
        const message = (err as AxiosError).response?.status
          ? t(`errors.${(err as AxiosError).response?.status}`)
          : 'Error: Unknow'
        toast.error(message)
      } finally {
        dispatch(setLoading(false))
      }
    })()
  }

  const handleCvUploadModalClose = () => {
    setFile(undefined)
    closeModal()
  }

  const handlePermissionUpdateModalClose = () => {
    setPermission(initPermission())
    closeModal()
  }

  const handleShowListViewer = (id: string) => {
    openModal('viewed-recruiter-modal')
    void (async () => {
      const data = await resumeService.getResumesById(id)
      setViewerId(data.viewerIds)
    })()
  }

  useEffect(() => {
    const fetchRecruiters = async () => {
      const promises = viewerId?.map(async (item) => {
        const data = await recruiterService.getRecruiterById(item)
        return (
          <RecruiterViewedResumeItem
            key={data.id}
            image={data.id}
            business={data.business.name}
            id={data.business.id}
            name={data.name}
          />
        )
      })

      if (promises) {
        const resolvedComponents = await Promise.all(promises)
        setRecruiterViewed(resolvedComponents)
      }
    }
    void fetchRecruiters()
  }, [viewerId])

  const resumeElms = resumes.map((resume, i) => (
    <Table.Row key={resume.id}>
      <Table.Cell>{i + 1}</Table.Cell>
      <Table.Cell>{resume.createdAt}</Table.Cell>
      <Table.Cell>{resume.accessPermission}</Table.Cell>
      <Table.Cell>{resume.supportPermission}</Table.Cell>
      <Table.Cell className="flex items-center gap-2">
        <Button
          size="xs"
          color="main"
          onClick={() => navigate(`../../view-resume/${resume.id}`)}
        >
          {t('resumes.uploadedCVs.button.view')}
        </Button>
        <Button
          size="xs"
          color="cyan"
          onClick={() => handleEditClick(resume.id)}
        >
          {t('resumes.uploadedCVs.button.edit')}
        </Button>
        <Button
          size="xs"
          color="red"
          onClick={() => handleDeleteClick(resume.id)}
        >
          {t('resumes.uploadedCVs.button.delete')}
        </Button>
      </Table.Cell>
      <Table.Cell className="text-center">
        <div className="flex items-center gap-x-3">
          <p>{resume.totalViews}</p>
          <Badge
            color="green"
            className="transition-all cursor-pointer hover:bg-[#aaf4d4]"
            onClick={() => handleShowListViewer(resume.id)}
          >
            Chi tiết
          </Badge>
        </div>
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <>
      <main className="space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{t('resumes.title')}</h2>
          <div className="font-semibold text-slate-500">
            {t('resumes.subtitle')}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h4 className="text-xl font-semibold">
                {t('resumes.uploadedCVs.title')}
              </h4>
              <Badge color="success">
                {t('resumes.uploadedCVs.count', { count: 5 })}
              </Badge>
            </div>
            <Button size="sm" onClick={() => openModal('cv-upload-modal')}>
              {t('resumes.uploadedCVs.button.uploadCV')}
            </Button>
          </div>

          <ResumeTableSection>
            {resumeElms.length ? resumeElms : <EmptyTableRow />}
          </ResumeTableSection>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h4 className="text-xl font-semibold">
                {t('resumes.smartCVs.title')}
              </h4>
              <Badge color="success">
                {t('resumes.smartCVs.count', { count: 5 })}
              </Badge>
            </div>
            <Button size="sm">{t('resumes.smartCVs.button.chooseCV')}</Button>
          </div>

          <ResumeTableSection>
            <EmptyTableRow />
          </ResumeTableSection>
        </div>
      </main>

      {/* Modal upload CV */}
      <Modal
        id="cv-upload-modal"
        show={modal === 'cv-upload-modal'}
        onClose={handleCvUploadModalClose}
      >
        <Modal.Header>{t('resumes.modal.cvUpload.title')}</Modal.Header>
        <Modal.Body>
          <FileUpload
            subtitle={t('resumes.modal.cvUpload.subtitle')}
            onFileSelect={handleFileSelect}
            onFileUpload={handleCvUpload}
            onModalClose={handleCvUploadModalClose}
          />
        </Modal.Body>
      </Modal>

      {/* Modal edit permission */}
      <Modal
        show={modal === 'permission-update-modal'}
        size="lg"
        onClose={handlePermissionUpdateModalClose}
      >
        <Modal.Header>{t('resumes.modal.permissionUpdate.title')}</Modal.Header>
        <Modal.Body className="space-y-6">
          <ResumeUpdateSection
            title={t('resumes.modal.permissionUpdate.access.title')}
          >
            <Radio
              id="Private"
              name="accessPermission"
              label={t('resumes.modal.permissionUpdate.access.private')}
              value="Private"
              checked={permission.accessPermission === 'Private'}
              onChange={handlePermissionChange}
            />
            <Radio
              id="Public"
              name="accessPermission"
              label={t('resumes.modal.permissionUpdate.access.public')}
              value="Public"
              checked={permission.accessPermission === 'Public'}
              onChange={handlePermissionChange}
            />
            <Radio
              id="OnlyRegisteredEmployers"
              name="accessPermission"
              label={t(
                'resumes.modal.permissionUpdate.access.onlyRegisteredEmployers'
              )}
              value="OnlyRegisteredEmployers"
              checked={
                permission.accessPermission === 'OnlyRegisteredEmployers'
              }
              onChange={handlePermissionChange}
            />
            <Radio
              id="OnlyVerifiedRecruiters"
              name="accessPermission"
              label={t(
                'resumes.modal.permissionUpdate.access.onlyVerifiedRecruiters'
              )}
              value="OnlyVerifiedRecruiters"
              checked={permission.accessPermission === 'OnlyVerifiedRecruiters'}
              onChange={handlePermissionChange}
            />
          </ResumeUpdateSection>

          <ResumeUpdateSection
            title={t('resumes.modal.permissionUpdate.support.title')}
          >
            <Radio
              id="Enable"
              name="supportPermission"
              label={t('resumes.modal.permissionUpdate.support.enable')}
              value="Enable"
              checked={permission.supportPermission === 'Enable'}
              onChange={handlePermissionChange}
            />
            <Radio
              id="Disable"
              name="supportPermission"
              label={t('resumes.modal.permissionUpdate.support.disable')}
              value="Disable"
              checked={permission.supportPermission === 'Disable'}
              onChange={handlePermissionChange}
            />
            <Radio
              id="UnderReview"
              name="supportPermission"
              label={t('resumes.modal.permissionUpdate.support.underReview')}
              value="UnderReview"
              checked={permission.supportPermission === 'UnderReview'}
              onChange={handlePermissionChange}
            />
          </ResumeUpdateSection>

          <div className="flex items-center justify-end gap-4">
            <Button color="main" onClick={() => handlePermissionUpdate()}>
              {t('resumes.modal.permissionUpdate.button.update')}
            </Button>
            <Button color="red" onClick={handlePermissionUpdateModalClose}>
              {t('resumes.modal.permissionUpdate.button.cancel')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal view recruiter list */}
      <Modal
        show={modal === 'viewed-recruiter-modal'}
        size="xl"
        onClose={closeModal}
      >
        <Modal.Header>Nhà tuyển dụng đã xem</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col pr-4 overflow-y-scroll gap-y-6 h-96">
            {recruiterViewed}
          </div>
        </Modal.Body>
        <hr />
        <Modal.Footer>
          <Button
            color="red"
            size="sm"
            className="ml-auto"
            onClick={() => closeModal()}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function ResumeTableSection({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  const { t } = useTranslation()

  return (
    <Table className="table-fixed">
      <Table.Head>
        <Table.HeadCell className="w-1/12">
          {t('resumes.table.no')}
        </Table.HeadCell>
        <Table.HeadCell className="w-3/12">
          {t('resumes.table.createdAt')}
        </Table.HeadCell>
        <Table.HeadCell className="w-3/12">
          {t('resumes.table.access')}
        </Table.HeadCell>
        <Table.HeadCell className="w-4/12">
          {t('resumes.table.support')}
        </Table.HeadCell>
        <Table.HeadCell className="w-5/12">
          {' '}
          {t('resumes.table.action')}
        </Table.HeadCell>
        <Table.HeadCell className="w-3/12">
          <div className="flex items-center gap-x-2">
            Lượt xem <FaEye />
          </div>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table>
  )
}

function ResumeUpdateSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-5">
      <h5>{title}</h5>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function RecruiterViewedResumeItem({ id, image, name, business }: ViewerType) {
  const navigation = useNavigate()

  return (
    <>
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center px-2 gap-x-4">
          <div className="object-cover border-2 rounded-full w-11 h-11 border-emerald-500">
            <img
              loading="lazy"
              src={recruiterService.getRecruiterProfileImage(image)}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">{name}</p>
            <span className="text-sm text-gray-600 font-normal truncate w-[280px]">
              {business}
            </span>
          </div>
        </div>
        <Badge
          color="green"
          className="transition-all cursor-pointer hover:bg-emerald-300"
          onClick={() => navigation(`../../businesses/${id}`)}
        >
          Doanh nghiệp
        </Badge>
      </div>
      <hr />
    </>
  )
}

type ViewerType = {
  id: string
  image: string
  name: string
  business: string
}
