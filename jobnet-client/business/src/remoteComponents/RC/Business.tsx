import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

import businessService from '../../services/businessService'

import type BusinessType from '../../types/business'
import useModal from '../../hooks/useModal'

import Modal from 'Common/Modal'
import Button from 'Common/Button'
import Input from 'Common/input/Input'
import ListInputChangeEvent from 'Common/type/ListInputChangeEvent'
import SelectChangeEvent from 'Common/type/SelectChangeEvent'
import LocationInputChangeEvent from 'Common/type/LocationInputChangeEvent'
import Selection from 'Common/input/Selection'
import LocationInput from 'Common/input/LocationInput'
import Textarea from 'Common/input/Textarea'
import FileUpload from 'Common/FileUpload'
import BusinessInfo from '../../components/BusinessInfo'

import ErrorType from '../../types/error'

const initGeneralInfo = (business: BusinessType) => ({
  name: business?.name,
  type: business?.type,
  country: business?.country || '',
  employeeQuantity: business?.employeeQuantity,
  foundedYear: business?.foundedYear || '',
})

const initIntroductionInfo = (business: BusinessType) => ({
  description: business?.description || '',
})

const initContactInfo = (business: BusinessType) => ({
  phone: business?.phone,
  website: business?.website,
  locations: business?.locations,
})

interface MyBusinessLoader {
  business: BusinessType
}

export default function Business({
  loader,
}: {
  loader: MyBusinessLoader
}): JSX.Element {
  const [business, setBusiness] = useState(loader.business)

  const [backgroundImage, setBackgroundImage] = useState<File>()
  const [profileImage, setProfileImage] = useState<File>()
  const [generalInfo, setGeneralInfo] = useState(initGeneralInfo(business))
  const [introductionInfo, setIntroductionInfo] = useState(
    initIntroductionInfo(business)
  )
  const [contactInfo, setContactInfo] = useState(initContactInfo(business))

  const { modal, openModal, closeModal } = useModal()

  const handleBackgroundImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setBackgroundImage(e.target.files?.[0])

  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfileImage(e.target.files?.[0])

  const handleGeneralInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) =>
      setGeneralInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    []
  )

  const handleIntroductionInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setIntroductionInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

  const handleContactInfoChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | ListInputChangeEvent
        | LocationInputChangeEvent
    ) => {
      setContactInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    },
    []
  )

  const handleBackgroundImageUpload = () => {
    if (!backgroundImage) {
      toast.error('Vui lòng chọn ảnh nền!')
      return
    }

    const formData = new FormData()
    formData.append('file', backgroundImage)

    void (async () => {
      try {
        const business = await businessService.uploadBusinessBackgroundImage(
          loader.business?.id,
          formData
        )
        setBusiness(business)
        setBackgroundImage(undefined)
        closeModal()
        toast.success('Cập nhật ảnh nền thành công.')
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handleProfileImageUpload = () => {
    if (!profileImage) {
      toast.error('Vui lòng chọn ảnh đại diện!')
      return
    }

    const formData = new FormData()
    formData.append('file', profileImage)

    void (async () => {
      try {
        const business = await businessService.uploadBusinessProfileImage(
          loader.business.id,
          formData
        )
        setBusiness(business)
        setProfileImage(undefined)
        closeModal()
        toast.success('Cập nhật ảnh nền thành công.')
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handleGeneralInfoUpdate = () => {
    if (
      !generalInfo.name ||
      !generalInfo.type ||
      !generalInfo.country ||
      !generalInfo.employeeQuantity ||
      !generalInfo.foundedYear
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    void (async () => {
      try {
        const business = await businessService.updateBusinessGeneralInfo(
          loader.business.id,
          generalInfo
        )
        setBusiness(business)
        closeModal()
        toast.success('Cập nhật thông tin thành công.')
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handleIntroductionInfoUpdate = () => {
    if (!introductionInfo.description) {
      toast.error('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    void (async () => {
      try {
        const business = await businessService.updateBusinessIntroductionInfo(
          loader.business.id,
          introductionInfo
        )
        setBusiness(business)
        closeModal()
        toast.success('Cập nhật thông tin thành công.')
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handleContactInfoUpdate = () => {
    if (!contactInfo.phone || !contactInfo.website) {
      toast.error('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    void (async () => {
      try {
        const business = await businessService.updateBusinessContactInfo(
          loader.business.id,
          contactInfo
        )
        setBusiness(business)
        closeModal()
        toast.success('Cập nhật thông tin thành công.')
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handleGeneralInfoModalClose = () => {
    setGeneralInfo(initGeneralInfo(business))
    closeModal()
  }

  const handleIntroductionInfoModalClose = () => {
    setIntroductionInfo(initIntroductionInfo(business))
    closeModal()
  }

  const handleContactInfoModalClose = () => {
    setContactInfo(initContactInfo(business))
    closeModal()
  }

  return (
    <>
      <BusinessInfo mode="update" business={business} openModal={openModal} />

      <Modal
        id="background-image-upload-modal"
        show={modal === 'background-image-upload-modal'}
        onClose={closeModal}
      >
        <Modal.Header>Cập nhật ảnh bìa</Modal.Header>
        <Modal.Body>
          <FileUpload
            onFileSelect={handleBackgroundImageSelect}
            onFileUpload={handleBackgroundImageUpload}
            onModalClose={closeModal}
          />
        </Modal.Body>
      </Modal>

      <Modal
        id="profile-image-upload-modal"
        show={modal === 'profile-image-upload-modal'}
        onClose={closeModal}
      >
        <Modal.Header>Cập nhật ảnh đại diện</Modal.Header>
        <Modal.Body>
          <FileUpload
            onFileSelect={handleProfileImageSelect}
            onFileUpload={handleProfileImageUpload}
            onModalClose={closeModal}
          />
        </Modal.Body>
      </Modal>

      <Modal
        id="general-info-update-modal"
        show={modal === 'general-info-update-modal'}
        onClose={handleGeneralInfoModalClose}
        size="xl"
      >
        <Modal.Header>Cập nhật thông tin công ty</Modal.Header>
        <Modal.Body className="space-y-5">
          <Input
            id="name"
            name="name"
            label="Tên công ty:"
            placeholder="Nhập tên công ty"
            type="text"
            color="main"
            value={generalInfo.name}
            onChange={handleGeneralInfoChange}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <Selection
              id="type"
              name="type"
              label="Loại hình doanh nghiệp:"
              options={[
                { id: 'Product', name: 'Product' },
                { id: 'Outsource', name: 'Outsource' },
              ]}
              value={generalInfo.type}
              onSelectChange={handleGeneralInfoChange}
            />
            <Selection
              id="country"
              name="country"
              label="Quốc gia:"
              options={[{ id: 'Việt Nam', name: 'Việt Nam' }]}
              value={generalInfo.country}
              onSelectChange={handleGeneralInfoChange}
            />
          </div>
          <Input
            id="employeeQuantity"
            name="employeeQuantity"
            label="Quy mô nhân viên:"
            placeholder="Nhập số lượng nhân viên"
            type="text"
            color="main"
            value={generalInfo.employeeQuantity}
            onChange={handleGeneralInfoChange}
          />
          <Input
            id="foundedYear"
            name="foundedYear"
            label="Năm thành lập:"
            placeholder="Nhập năm thành lập"
            type="text"
            color="main"
            value={generalInfo.foundedYear}
            onChange={handleGeneralInfoChange}
          />

          <div className="flex justify-end gap-4">
            <Button color="main" onClick={handleGeneralInfoUpdate}>
              Cập nhật
            </Button>
            <Button color="red" onClick={handleGeneralInfoModalClose}>
              Hủy
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        id="introduction-info-update-modal"
        show={modal === 'introduction-info-update-modal'}
        onClose={handleIntroductionInfoModalClose}
        size="3xl"
      >
        <Modal.Header>Cập nhật thông tin giới thiệu</Modal.Header>
        <Modal.Body className="space-y-5">
          <Textarea
            id="description"
            name="description"
            label="Nhập mô tả về công ty:"
            rows={12}
            value={introductionInfo.description}
            onChange={handleIntroductionInfoChange}
          />
          <div className="flex justify-end gap-4">
            <Button color="main" onClick={handleIntroductionInfoUpdate}>
              Cập nhật
            </Button>
            <Button color="red" onClick={handleIntroductionInfoModalClose}>
              Hủy
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        id="contact-info-update-modal"
        show={modal === 'contact-info-update-modal'}
        onClose={handleContactInfoModalClose}
        size="xl"
      >
        <Modal.Header>Cập nhật thông tin liên hệ</Modal.Header>
        <Modal.Body className="space-y-5">
          <Input
            id="phone"
            name="phone"
            label="Số điện thoại:"
            placeholder="Nhập số điện thoại công ty"
            type="text"
            color="main"
            value={contactInfo.phone}
            onChange={handleContactInfoChange}
          />
          <Input
            id="website"
            name="website"
            label="Liên kết đến website:"
            placeholder="Nhập liên kết website"
            type="text"
            color="main"
            value={contactInfo.website}
            onChange={handleContactInfoChange}
          />
          <LocationInput
            values={contactInfo.locations}
            onLocationsChange={handleContactInfoChange}
          />
          <div className="flex justify-end gap-4">
            <Button onClick={handleContactInfoUpdate}>Cập nhật</Button>
            <Button color="red" onClick={handleContactInfoModalClose}>
              Hủy
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
