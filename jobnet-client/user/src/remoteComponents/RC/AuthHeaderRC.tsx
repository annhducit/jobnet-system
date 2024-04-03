import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { FaBell, FaEnvelope } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Tooltip } from 'flowbite-react'
import {
  FaArrowRightFromBracket,
  FaBars,
  FaBriefcase,
  FaBusinessTime,
  FaCampground,
  FaClipboard,
  FaFile,
  FaGear,
  FaPaste,
  FaRegUser,
  FaUsers,
  FaXmark,
} from 'react-icons/fa6'
import { BsBoxArrowRight } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

import recruiterService from '../../services/recruiterService'

import Button from 'Common/Button'
import Dropdown from 'Common/Dropdown'
import Modal from 'Common/Modal'
import { clearAuth, getAuth } from 'Common/auth'

import AuthType from '../../types/auth'
import useModal from '../../hooks/useModal'
import { MenuItem } from '../../types/headerSmall'
import HeaderItemSmall from '../../components/HeaderSmall'

import logo from '../../assets/images/logo.png'

export default function AuthHeaderRC(): JSX.Element {
  const [openFly, setOpenFly] = useState<boolean>(false)
  const navigate = useNavigate()
  const { modal, openModal, closeModal } = useModal()

  const auth = getAuth()
  useEffect(() => {
    if (!auth.user) {
      navigate('/posts')
    }
  }, [])
  const { t } = useTranslation()

  const handleLogout = () => {
    clearAuth()
    navigate('/')
  }

  const handleOpenFly = () => {
    setOpenFly(!openFly)
  }

  const dataForHeader: MenuItem[] = [
    {
      id: 1,
      item: t('sidebar.recruiter.dashboard'),
      icon: <FaBriefcase />,
      navigate: '/dashboard',
    },
    {
      id: 2,
      item: t('sidebar.recruiter.managePosts'),
      icon: <FaPaste />,
      navigate: '/posts',
    },
    {
      id: 3,
      item: t('sidebar.recruiter.camping'),
      icon: <FaCampground />,
      navigate: '/campaigns',
    },
    {
      id: 4,
      item: t('sidebar.recruiter.candidate'),
      icon: <FaUsers />,
      navigate: '/applicants',
    },

    {
      id: 5,
      item: t('sidebar.recruiter.interview'),
      icon: <FaClipboard />,
      navigate: '/interviews',
    },
    {
      id: 6,
      item: auth.user?.name || t('header.recruiter.accountPopup.account'),
      hidden: !auth.user,
      subItem: [
        {
          id: 1,
          item: t('header.recruiter.accountPopup.account'),
          icon: <FaRegUser />,
          navigate: '/profile',
        },
        {
          id: 2,
          item: t('header.recruiter.accountPopup.businessInfo'),
          icon: <FaBusinessTime />,
          navigate: '/business',
        },
        {
          id: 3,
          item: t('header.recruiter.accountPopup.setting'),
          icon: <FaGear />,
          navigate: '/',
        },
        {
          id: 4,
          item: t('header.recruiter.accountPopup.email'),
          icon: <FaEnvelope />,
          navigate: '/',
        },
        {
          id: 5,
          item: t('header.recruiter.accountPopup.notifications'),
          icon: <FaBell />,
          navigate: '/',
        },
        {
          id: 6,
          item: t('header.recruiter.accountPopup.logout'),
          icon: <FaArrowRightFromBracket />,
          onClick: () => openModal('recruiter-logout-modal'),
        },
      ],
    },
  ]
  return (
    <>
      <RecruiterRegister
        translate={t}
        openModal={() => openModal('recruiter-logout-modal')}
        auth={auth}
      />

      {/*  Fly menu */}

      <div
        onClick={handleOpenFly}
        className="p-2 rounded-full cursor-pointer lg:hidden text-main bg-mainLower"
      >
        <FaBars className="w-5 h-5" />
      </div>

      <div
        className={`h-screen transition-all lg:hidden overflow-y-scroll absolute flex flex-col top-0 -right-3 w-[320px] bg-[#f2f2f2] border-2 border-mainBorder dark:bg-gray-950 ${
          openFly ? 'opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b ">
          <img src={logo} className="object-cover" />
          <div
            onClick={handleOpenFly}
            className="p-2 rounded-full cursor-pointer bg-mainLower"
          >
            <FaXmark alt="" className="w-5 h-5 text-main" />
          </div>
        </div>
        <div className="flex flex-col py-4 gap-y-2">
          <div className="flex flex-col px-2 text-base">
            <HeaderItemSmall data={dataForHeader} />
          </div>
        </div>
      </div>

      <Modal
        id="recruiter-logout-modal"
        show={modal === 'recruiter-logout-modal'}
        size="md"
        popup
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsBoxArrowRight className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {t('header.recruiter.modal.logout.title')}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="main" onClick={handleLogout}>
                {t('header.recruiter.modal.logout.button.logout')}
              </Button>
              <Button color="red" onClick={closeModal}>
                {t('header.recruiter.modal.logout.button.cancel')}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

const RecruiterRegister = ({
  auth,
  openModal,
  translate,
}: {
  auth: AuthType
  openModal: (modal: string) => void
  translate: TFunction<'translation', undefined>
}) => {
  return (
    <>
      <div className="flex items-center gap-x-4">
        <Tooltip
          className="block"
          content={translate('header.recruiter.email')}
          style="light"
        >
          <NavLink to="/chat" className={`${recruiterNavLink} hidden-item`}>
            <FaEnvelope className="w-5 h-5" />
          </NavLink>
        </Tooltip>

        <Tooltip
          className="block"
          content={translate('header.recruiter.notifications')}
          style="light"
        >
          <NavLink
            to="/notifications"
            className={`${recruiterNavLink} hidden-item`}
          >
            <FaBell className="w-5 h-5" />
          </NavLink>
        </Tooltip>
      </div>
      {auth.user && (
        <Link to={'../../posts/new'} className="header-authenticated">
          <Button size="sm">
            {' '}
            <FaFile className="mr-2" />
            {translate('header.recruiter.button')}
          </Button>
        </Link>
      )}

      <Dropdown
        className="p-2 cursor-pointer header-authenticated_second"
        render={
          <img
            className="block w-10 h-10 rounded-full hover:border-2 border-mainBorder"
            src={
              recruiterService.getRecruiterProfileImage(auth.user?.id) ||
              `https://www.w3schools.com/howto/img_avatar2.png`
            }
          />
        }
        type="hover"
        position="bottomRight"
      >
        <Dropdown.Header>
          <div className="text-lg font-bold text-main-lower">
            {auth.user?.name}
          </div>
          <div className="text-sm font-semibold">{auth.user?.email}</div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item to="profile" icon={FaRegUser as IconType}>
          {translate('header.recruiter.accountPopup.account')}
        </Dropdown.Item>
        <Dropdown.Item to="business" icon={FaBusinessTime as IconType}>
          {translate('header.recruiter.accountPopup.businessInfo')}
        </Dropdown.Item>
        <Dropdown.Item to="jobseeker/settings" icon={FaGear as IconType}>
          {translate('header.recruiter.accountPopup.setting')}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon={FaArrowRightFromBracket as IconType}>
          <div
            className="w-full cursor-pointer"
            onClick={() => openModal('recruiter-logout-modal')}
          >
            {translate('header.recruiter.accountPopup.logout')}
          </div>{' '}
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}

const recruiterNavLink = ({ isActive }: { isActive: boolean }) =>
  `transition-all hover:text-main relative ${isActive ? 'text-main' : ''}`
