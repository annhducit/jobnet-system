import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBell,
  FaRegUser,
  FaArrowRightFromBracket,
  FaGear,
} from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { BsBoxArrowRight } from 'react-icons/bs'
import type { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

import { getAuth } from 'Common/auth'
import Dropdown from 'Common/Dropdown'
import Button from 'Common/Button'
import Modal from 'Common/Modal'

import jobseekersService from '../services/jobSeekerService'
import notificationService, {
  Notification,
} from '../services/notificationService'

import UserType from '../types/user'
import useModal from '../hooks/useModal'

export default function AuthHeaderComponent({
  logout,
}: {
  logout: () => void
}) {
  const { modal, openModal, closeModal } = useModal()

  const { t } = useTranslation()
  const user = getAuth().user
  const handleLogout = () => {
    closeModal()
    logout()
  }
  return (
    <div className="items-center gap-2 auth-header">
      {user ? (
        <AuthRightControls
          openModal={() => openModal('logout-modal')}
          auth={user}
          modal={modal}
          closeModal={closeModal}
          logout={handleLogout}
        />
      ) : (
        <NoAuthRightControls translate={t} />
      )}{' '}
    </div>
  )
}

export function AuthRightControls({
  auth,
  openModal,
  modal,
  closeModal,
  logout,
}: {
  auth: UserType
  openModal: () => void
  modal: string | undefined
  closeModal: () => void
  logout: () => void
}): JSX.Element {
  const { t } = useTranslation()
  // const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  //   `flex p-2 transition hover:text-main ${isActive ? 'text-main' : ''}`
  const [notifications, setNot] = useState<Notification[]>(
    notificationService.getNotificationsByAuthTemp()
  )
  const handleStatus = (id: number) => {
    const temp = notifications
    temp[id].status = true
    setNot(temp)
  }

  return (
    <>
      <Dropdown
        render={
          <div className={'flex p-2 transition hover:text-main'}>
            <FaBell className="w-5 h-5" />
          </div>
        }
        type="hover"
        position="bottomRight"
      >
        {notifications.map((e, idx) => {
          return (
            <span
              className="flex w-full px-4 py-1"
              key={idx}
              onClick={() => {
                handleStatus(idx)
              }}
            >
              <span
                className={`flex-1 ${
                  idx !== notifications.length - 1
                    ? 'border-b-1 border-mainLower'
                    : ''
                }`}
              >
                {e.title}
              </span>
              {!e.status && (
                <span className="flex items-center justify-center ml-2 text-blue-500">
                  <GoDotFill />
                </span>
              )}
            </span>
          )
        })}
      </Dropdown>

      <Dropdown
        render={
          <div className="w-10 h-10 rounded-full header-profile">
            <img
              loading="lazy"
              src={jobseekersService.getJobSeekerProfileImage(auth?.id)}
              className="block w-full h-full border rounded-full"
            />
          </div>
        }
        type="hover"
        position="bottomRight"
      >
        <Dropdown.Header>
          <div className="text-lg font-bold text-main-lower">{auth?.name}</div>
          <div className="text-sm font-semibold">{auth?.email}</div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item to="jobseeker" icon={FaRegUser as IconType}>
          {t('header.jobSeeker.user.dropdown.account')}
        </Dropdown.Item>
        <Dropdown.Item to="jobseeker/settings" icon={FaGear as IconType}>
          {t('header.jobSeeker.user.dropdown.settings')}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon={FaArrowRightFromBracket as IconType}>
          <div className="w-full cursor-pointer" onClick={openModal}>
            {t('header.jobSeeker.user.dropdown.logout')}
          </div>{' '}
        </Dropdown.Item>
      </Dropdown>
      <Modal
        id="logout-modal"
        show={modal === 'logout-modal'}
        size="md"
        popup
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsBoxArrowRight className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {t('header.jobSeeker.modal.logout.title')}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="main" onClick={logout}>
                {t('header.jobSeeker.modal.logout.button.logout')}
              </Button>
              <Button color="red" onClick={closeModal}>
                {t('header.jobSeeker.modal.logout.button.cancel')}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export function NoAuthRightControls({
  translate,
}: {
  translate: TFunction<'translation', undefined>
}): JSX.Element {
  return (
    <div className="no-auth">
      <Link to="signin" className="block">
        <Button
          color="empty"
          className="border border-main text-main hover:bg-second-lower"
          size="md"
        >
          {translate('header.jobSeeker.unRegister.login')}
        </Button>
      </Link>
      <Link to="signup" className="block">
        <Button size="md">
          {translate('header.jobSeeker.unRegister.register')}
        </Button>
      </Link>
    </div>
  )
}
