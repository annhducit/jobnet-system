import { useCallback, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { VscWarning, VscPassFilled } from 'react-icons/vsc'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'

import useTitlePage from '../hooks/useTitlePage'
import useModal from '../hooks/useModal'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { store } from '../app/store'
import { setLoading } from '../features/loading/loadingSlice'
import { requireAuth } from '../utils/auth'
import JobSeekerType from '../types/jobSeeker'

import jobSeekerService from 'User/JobSeeker/services'

import LocationInputChangeEvent from 'Common/type/LocationInputChangeEvent'
import Button from 'Common/Button'
import InfoSection from 'Common/InfoSection'
import ModalForm from 'Common/ModalForm'
import Modal from 'Common/Modal'
import LocationInput from 'Common/input/LocationInput'
import FileUpload from 'Common/FileUpload'
import ListInputChangeEvent from 'Common/type/ListInputChangeEvent'
import Input from 'Common/input/Input'

interface JSProfileLoader {
  jobSeeker: JobSeekerType
}

const initPersonalInfo = (jobSeeker: JobSeekerType) => ({
  name: jobSeeker.name,
  email: jobSeeker.email,
  phone: jobSeeker.phone || '',
  nation: jobSeeker.nation || '',
})

const initProfessionInfo = (jobSeeker: JobSeekerType) => ({
  salary: jobSeeker.salary || '',
  workingFormat: jobSeeker.workingFormat || '',
  profession: jobSeeker.profession || '',
  location: jobSeeker.location,
})

JSProfile.loader = async function ({
  request,
}: {
  request: Request
}): Promise<JSProfileLoader> {
  requireAuth(request, 'JobSeeker')

  const auth = store.getState().auth
  const jobSeeker = await jobSeekerService.getJobSeekerById(
    auth.user?.id as string
  )
  console.log(jobSeeker)
  return { jobSeeker }
}

export default function JSProfile(): React.ReactElement {
  const loader = useLoaderData() as JSProfileLoader
  const auth = useAppSelector((state) => state.auth)

  const { t } = useTranslation()
  useTitlePage(auth.user?.name || t('pageTitle.profile'))

  const jobSeekerId = auth.user?.id as string

  const dispatch = useAppDispatch()

  const [jobSeeker, setJobSeeker] = useState(loader.jobSeeker)

  const [file, setFile] = useState<File>()
  const [personalInfo, setPersonalInfo] = useState(initPersonalInfo(jobSeeker))
  const [professionInfo, setProfessionInfo] = useState(
    initProfessionInfo(jobSeeker)
  )
  const { modal, openModal, closeModal } = useModal()

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    changeInfo(e, setPersonalInfo)

  const handleProfessionInfoChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | ListInputChangeEvent
        | LocationInputChangeEvent
    ) => {
      setProfessionInfo((prev) => ({
        ...prev,
        [e.target.name == 'locations' ? 'location' : e.target.name]:
          e.target.value[e.target.value.length - 1],
      }))
    },
    []
  )

  const changeInfo = <T,>(
    e: React.ChangeEvent<HTMLInputElement>,
    setInfo: React.Dispatch<React.SetStateAction<T>>
  ) =>
    setInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }))

  const handlePersonalInfoModalClose = () => {
    setPersonalInfo(initPersonalInfo(jobSeeker))
    closeModal()
  }

  const handleCloseProfessionInfoModal = () => {
    setProfessionInfo(initProfessionInfo(jobSeeker))
    closeModal()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0])

  const handleImageUpload = () => {
    if (!file) {
      toast.error(t('toast.errors.requireProfileImage'))
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    void (async () => {
      closeModal()
      dispatch(setLoading(true))

      try {
        const jobSeeker = await jobSeekerService.uploadJobSeekerProfileImage(
          jobSeekerId,
          formData
        )
        setJobSeeker(jobSeeker)
        setFile(undefined)
        toast.success(t('toast.success.updateProfileImage'))
      } catch (err) {
        openModal('profile-image-upload-modal')
        const message = (err as AxiosError).response?.status
          ? t(`errors.${(err as AxiosError).response?.status}`)
          : 'Error: Unknow'

        toast.error(message)
      } finally {
        dispatch(setLoading(false))
      }
    })()
  }

  const handlePersonalInfoUpdate = () => {
    if (
      !personalInfo.name ||
      !personalInfo.email ||
      !personalInfo.phone ||
      !personalInfo.nation
    ) {
      toast.error(t('toast.errors.provideInformation'))
      return
    }

    void (async () => {
      closeModal()
      dispatch(setLoading(true))

      try {
        const jobSeeker = await jobSeekerService.updateJobSeekerPersonalInfo(
          jobSeekerId,
          personalInfo
        )
        setJobSeeker(jobSeeker)
        toast.success(t('toast.success.updateProfile'))
      } catch (err) {
        openModal('personal-info-modal')
        const message = (err as AxiosError).response?.status
          ? t(`errors.${(err as AxiosError).response?.status}`)
          : 'Error: Unknow'
        return { type: 'error', message: message }
      } finally {
        dispatch(setLoading(false))
      }
    })()
  }

  const handleProfessionInfoUpdate = () => {
    if (
      !professionInfo.salary ||
      !professionInfo.workingFormat ||
      !professionInfo.profession ||
      !professionInfo.location
    ) {
      toast.error(t('toast.errors.provideInformation'))
      return
    }

    void (async () => {
      closeModal()
      dispatch(setLoading(true))

      try {
        const jobSeeker = await jobSeekerService.updateJobSeekerProfessionInfo(
          jobSeekerId,
          professionInfo
        )
        setJobSeeker(jobSeeker)
        toast.success(t('toast.success.updateProfessionInfo'))
      } catch (err) {
        openModal('profession-info-modal')
        const message = (err as AxiosError).response?.status
          ? t(`errors.${(err as AxiosError).response?.status}`)
          : 'Error: Unknow'
        toast.error(message)
      } finally {
        dispatch(setLoading(false))
      }
    })()
  }

  return (
    <div className="divide-y-2">
      <div className="pb-6">
        <div className="w-full gap-2 layout-js_profile">
          <h1 className="text-2xl font-bold">{t('jsProfile.title')}</h1>
          <div className="flex flex-col">
            <p>
              {t('jsProfile.completion.label')}{' '}
              <b>{t('jsProfile.completion.incomplete')}</b>
            </p>
            <div className="flex">
              <VscWarning
                className="my-auto h-7 "
                style={{
                  color: 'rgb(253 224 71)',
                }}
              />
              <p className="ml-2">{t('jsProfile.completion.warning')}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between gap-2 layout-js_profile">
            <div className="flex flex-row items-center gap-4 layout-js_profile">
              <div className="relative">
                <VscPassFilled className="absolute bottom-0 right-0 grid w-5 h-5 text-main" />
                <img
                  loading="lazy"
                  className="w-20 h-20 border-2 rounded-full"
                  src={
                    jobSeeker.profileImageId
                      ? jobSeekerService.getJobSeekerProfileImage(jobSeeker.id)
                      : 'https://www.w3schools.com/howto/img_avatar2.png'
                  }
                />
              </div>
              <Button onClick={() => openModal('profile-image-upload-modal')}>
                {t('jsProfile.button.uploadImage')}
              </Button>
              <Button
                color="red"
                data-modal-id="delete-modal"
                onClick={() => openModal('delete-modal')}
              >
                {t('jsProfile.button.deleteImage')}
              </Button>
            </div>
            <Button color="slate">
              {t('jsProfile.button.upgradeAccount')}
            </Button>
          </div>
          <h1 className="mt-2 text-xl font-bold">{jobSeeker.name}</h1>
        </div>
      </div>

      <InfoSection
        className="py-6"
        header={
          <InfoSection.HeaderItem
            title={t('jsProfile.personalInfo.title')}
            handleOpenModal={() => openModal('personal-info-modal')}
          />
        }
      >
        <InfoSection.Item
          title={t('jsProfile.personalInfo.items.fullname')}
          content={jobSeeker.name}
        />
        <InfoSection.Item
          title={t('jsProfile.personalInfo.items.email')}
          content={jobSeeker.email}
        />
        <InfoSection.Item
          title={t('jsProfile.personalInfo.items.phone')}
          content={jobSeeker.phone}
        />
        <InfoSection.Item
          title={t('jsProfile.personalInfo.items.nation')}
          content={jobSeeker.nation}
        />
      </InfoSection>

      <InfoSection
        className="pt-6"
        header={
          <InfoSection.HeaderItem
            title={t('jsProfile.careerInfo.title')}
            handleOpenModal={() => openModal('profession-info-modal')}
          />
        }
      >
        <InfoSection.Item
          title={t('jsProfile.careerInfo.items.salary')}
          content={jobSeeker.salary}
        />
        <InfoSection.Item
          title={t('jsProfile.careerInfo.items.workingFormat')}
          content={jobSeeker.workingFormat}
        />
        <InfoSection.Item
          title={t('jsProfile.careerInfo.items.profession')}
          content={jobSeeker.profession}
        />
        <InfoSection.Item
          title={t('jsProfile.careerInfo.items.workplace')}
          content={`${jobSeeker.location?.specificAddress} - ${jobSeeker.location?.provinceName}`}
        />
      </InfoSection>

      <Modal
        id="profile-image-upload-modal"
        show={modal === 'profile-image-upload-modal'}
        onClose={closeModal}
      >
        <Modal.Header>
          {t('jsProfile.modal.profileImageUpload.title')}
        </Modal.Header>
        <Modal.Body>
          <FileUpload
            subtitle={t('jsProfile.modal.profileImageUpload.subtitle')}
            onFileSelect={handleFileSelect}
            onFileUpload={handleImageUpload}
            onModalClose={closeModal}
          />
        </Modal.Body>
      </Modal>

      <Modal
        id="delete-modal"
        show={modal === 'delete-modal'}
        size="lg"
        popup
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body className="py-10 space-y-4">
          <HiOutlineExclamationCircle className="w-16 h-16 mx-auto text-white-400 dark:text-second-lower" />
          <div className="text-lg font-normal text-center text-gray-500 dark:text-gray-400">
            {t('jsProfile.modal.delete.title')}
          </div>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={closeModal}>
              {t('jsProfile.modal.delete.button.sure')}
            </Button>
            <Button color="slate" onClick={closeModal}>
              {t('jsProfile.modal.delete.button.cancel')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        id="personal-info-modal"
        show={modal === 'personal-info-modal'}
        size="2xl"
        onClose={handlePersonalInfoModalClose}
      >
        <Modal.Body>
          <ModalForm
            title={t('jsProfile.modal.personalInfo.title')}
            onInfoUpdate={handlePersonalInfoUpdate}
            onModalClose={handlePersonalInfoModalClose}
          >
            <ModalForm.Input
              title={t('jsProfile.modal.personalInfo.inputs.fullName.title')}
              name="name"
              placeholder={t(
                'jsProfile.personalInfo.modal.inputs.fullName.placeholder'
              )}
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
            <ModalForm.Input
              title={t('jsProfile.modal.personalInfo.inputs.email.title')}
              name="email"
              placeholder={t(
                'jsProfile.modal.personalInfo.inputs.email.placeholder'
              )}
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
            <ModalForm.Input
              title={t('jsProfile.modal.personalInfo.inputs.phone.title')}
              name="phone"
              placeholder={t(
                'jsProfile.modal.personalInfo.inputs.phone.placeholder'
              )}
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
            <ModalForm.Input
              title={t('jsProfile.modal.personalInfo.inputs.nation.title')}
              name="nation"
              placeholder={t(
                'jsProfile.personalInfo.modal.inputs.nation.placeholder'
              )}
              value={personalInfo.nation}
              onChange={handlePersonalInfoChange}
            />
          </ModalForm>
        </Modal.Body>
      </Modal>

      <Modal
        id="profession-info-modal"
        size="2xl"
        show={modal === 'profession-info-modal'}
        onClose={handleCloseProfessionInfoModal}
      >
        <Modal.Header>{t('jsProfile.modal.professionInfo.title')}</Modal.Header>
        <Modal.Body className="space-y-5">
          <Input
            label={t('jsProfile.modal.professionInfo.inputs.salary.title')}
            name="salary"
            placeholder={t(
              'jsProfile.modal.professionInfo.inputs.salary.placeholder'
            )}
            value={professionInfo.salary}
            onChange={handleProfessionInfoChange}
          />
          <Input
            label={t(
              'jsProfile.modal.professionInfo.inputs.workingFormat.title'
            )}
            name="workingFormat"
            placeholder={t(
              'jsProfile.modal.professionInfo.inputs.workingFormat.placeholder'
            )}
            value={professionInfo.workingFormat}
            onChange={handleProfessionInfoChange}
          />
          <Input
            label={t('jsProfile.modal.professionInfo.inputs.profession.title')}
            name="profession"
            placeholder={t(
              'jsProfile.modal.professionInfo.inputs.profession.placeholder'
            )}
            value={professionInfo.profession}
            onChange={handleProfessionInfoChange}
          />
          <LocationInput
            label={t('jsProfile.modal.professionInfo.inputs.location.title')}
            value={professionInfo.location}
            onLocationsChange={handleProfessionInfoChange}
          />
          <div className="flex justify-end gap-4">
            <Button onClick={handleProfessionInfoUpdate}>
              {t('jsProfile.modal.professionInfo.button.update')}
            </Button>
            <Button color="red" onClick={handleCloseProfessionInfoModal}>
              {t('jsProfile.modal.professionInfo.button.cancel')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
