import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { Modal } from 'flowbite-react'
import { useTranslation } from 'react-i18next'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

import useModal from '../../hooks/useModal'

import businessService from 'Business/services'

import recruiterService from '../../services/recruiterService'

import Button from 'Common/Button'
import { setLoad } from 'Common/setLoad'

import { RCAccountComponent } from '../../components/RCAccountComponent'
import BusinessInfo from '../../components/BusinessInfo'

import Recruiter from '../../types/recruiter'

export default function ADRecuiterDetail() {
  const recruiterId = useParams().recruiterId || ''

  const [recruiter, setRecruiter] = useState<Recruiter>()
  const { modal, openModal, closeModal } = useModal()

  const [updateData, setUpdateData] = useState<boolean>(true)

  const { t } = useTranslation()

  useEffect(() => {
    async function getRecruiter(): Promise<void> {
      const Recruiter = await recruiterService.getRecruiterById(recruiterId)
      setRecruiter(Recruiter)
    }
    getRecruiter().catch(() => {
      toast.error('Không thể cập nhật dữ liệu')
    })
  }, [recruiterId, updateData])

  const deleteRecruiter = (): void => {
    closeModal()
    setLoad(true)
    recruiterService
      .deleteRecruiterById(recruiterId)
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

  async function deleteBusiness() {
    closeModal()
    setLoad(true)
    try {
      await businessService.deleteBusinessById(recruiter?.business.id)

      toast.success('Đã khóa công ty')
      setUpdateData(!updateData)
    } catch (err) {
      toast.error('Không thể khóa công ty')
    }
    setLoad(false)
  }

  return (
    <div className="max-h-screen py-6 pr-6 overflow-y-scroll">
      <RCAccountComponent
        type="Admin"
        getProfileImage={recruiterService.getRecruiterProfileImage(
          recruiter?.id
        )}
        data={recruiter}
        openModel={openModal}
      />
      <p className="text-xl font-semibold text-main">
        {t('recruiter.profile.adminRole.informationBusiness')}
      </p>
      <hr className="my-4 border-second-lower" />
      {recruiter?.business && (
        <BusinessInfo
          business={recruiter.business}
          openModal={openModal}
          mode="admin"
        />
      )}
      {/* Lock account */}
      <Modal
        id="delete-account"
        show={modal === 'delete-account'}
        size="md"
        popup
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {t('recruiter.profile.adminRole.modalBlock.recruiter.title')}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteRecruiter}>
                {t('recruiter.profile.adminRole.modalBlock.recruiter.confirm')}
              </Button>
              <Button color="gray" onClick={closeModal}>
                {t('recruiter.profile.adminRole.modalBlock.recruiter.cancel')}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Lock business */}
      <Modal
        id="modal-lock-account"
        show={modal === 'modal-lock-account'}
        size="md"
        popup
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {t('recruiter.profile.adminRole.modalBlock.business.title')}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  deleteBusiness().catch(() => {
                    toast.error('Không thể xóa doanh nghiệp')
                  })
                }}
              >
                {t('recruiter.profile.adminRole.modalBlock.business.confirm')}
              </Button>
              <Button color="gray" onClick={closeModal}>
                {t('recruiter.profile.adminRole.modalBlock.business.cancel')}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
