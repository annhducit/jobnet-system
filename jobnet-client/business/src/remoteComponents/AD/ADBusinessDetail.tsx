import { useState, useEffect } from 'react'
import { Modal } from 'flowbite-react'
import { useParams } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'

import Button from 'Common/Button'
import { setLoad } from 'Common/setLoad'

import BusinessInfo from '../../components/BusinessInfo'

import businessService from '../../services/businessService'

import useModal from '../../hooks/useModal'

import type BusinessType from '../../types/business'

export default function ADBusinessDetail(): JSX.Element {
  const { id } = useParams()

  const [updateData, setUpdateData] = useState<boolean>(true)

  const { modal, openModal, closeModal } = useModal()

  const [business, setBusiness] = useState<BusinessType>()

  useEffect(() => {
    const loadData = async () => {
      const data: BusinessType = await businessService.getBusinessById(
        id as string
      )
      setBusiness(data)
    }

    loadData().catch(() => {
      toast.error('Không thể cập nhật dữ liệu')
    })
  }, [id, updateData])

  async function deleteBusiness() {
    closeModal()
    setLoad(true)
    try {
      await businessService.deleteBusinessById(id)

      toast.success('Đã khóa công ty')
      setUpdateData(!updateData)
    } catch (err) {
      toast.error('Không thể khóa công ty')
    }
    setLoad(false)
  }

  return (
    <div className="h-screen py-6 overflow-y-scroll">
      {business && (
        <BusinessInfo business={business} openModal={openModal} mode="admin" />
      )}
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
              Bạn có chắc muốn khóa công ty này không?
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
                Tôi chắc chắn
              </Button>
              <Button color="gray" onClick={closeModal}>
                Hủy
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
