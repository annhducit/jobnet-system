import { NavLink } from 'react-router-dom'
import {
  FaArrowRightFromBracket,
  FaGear,
  FaBars,
  FaHeart,
  FaSuitcase,
  FaListCheck,
  FaFile,
  FaStar,
  FaClipboard,
  FaXmark,
  FaAddressCard,
  FaCheck,
  FaIdCard,
  FaPalette,
  FaPenToSquare,
  FaSliders,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { FaSearch } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import useModal from '../../hooks/useModal'
import logo from '../../assets/images/logo.png'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { authActions } from '../../features/auth/authSlice'

import Dropdown from 'Common/Dropdown'
import LanguageSelector from 'Common/LanguageSelector'

import { useState } from 'react'
import HeaderItemSmall from './HeaderSmall'
import { MenuItem } from '../../types/headerSmall'
import AuthHeaderComponent from 'User/AuthHeaderComponent'

import { BsBoxArrowRight } from 'react-icons/bs'

import Button from 'Common/Button'
import Modal from 'Common/Modal'
import { getLanguage } from '../../utils/language'

export default function JSHeader(): JSX.Element {
  const [openFly, setOpenFly] = useState<boolean>(false)
  const { modal, openModal, closeModal } = useModal()

  const { t } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    closeModal()
    dispatch(authActions.clearAuth())
  }

  const handleOpenFly = () => {
    setOpenFly(!openFly)
  }

  const dataForHeader: MenuItem[] = [
    {
      id: 1,
      item: t('header.jobSeeker.auth.register'),
      navigate: '../../signup',
      hidden: user,
    },
    {
      id: 2,
      item: t('header.jobSeeker.auth.login'),
      navigate: '../../signin',
      hidden: user,
    },
    {
      id: 3,
      item: t('header.jobSeeker.search.label'),
      subItem: [
        {
          id: 1,
          item: t('header.jobSeeker.search.dropdown.searchJobs'),
          icon: <FaSearch />,
          navigate: '../../posts',
        },
        {
          id: 2,
          item: t('header.jobSeeker.search.dropdown.appliedJobs'),
          icon: <FaGear />,
          navigate: '../../applications',
        },
        {
          id: 3,
          item: t('header.jobSeeker.search.dropdown.bookmarkedJobs'),
          icon: <FaHeart />,
          navigate: '../../jobseeker/favorite-posts',
        },
        {
          id: 4,
          item: t('header.jobSeeker.search.dropdown.suitableJobs'),
          icon: <FaSuitcase />,
        },
      ],
    },
    {
      id: 4,
      item: t('header.jobSeeker.profileAndCV.label'),
      subItem: [
        {
          id: 1,
          item: t('header.jobSeeker.profileAndCV.dropdown.CVs'),
          icon: <FaListCheck />,
        },
        {
          id: 2,
          item: t('header.jobSeeker.profileAndCV.dropdown.coverLetters'),
          icon: <FaFile />,
        },
        {
          id: 3,
          item: t('header.jobSeeker.profileAndCV.dropdown.cvTemplate'),
          icon: <FaClipboard />,
        },
        {
          id: 4,
          item: t('header.jobSeeker.profileAndCV.dropdown.topCVProfile'),
          icon: <FaStar />,
        },
      ],
    },
    {
      id: 5,
      item: t('header.jobSeeker.business.label'),
      subItem: [
        {
          id: 1,
          item: t('header.jobSeeker.business.dropdown.businessList'),
          icon: <FaListCheck />,
          navigate: '../../businesses',
        },
        {
          id: 2,
          item: t('header.jobSeeker.business.dropdown.topBusinesses'),
          icon: <FaStar />,
        },
      ],
    },
    {
      id: 6,
      item: t('header.jobSeeker.contact'),
    },
    {
      id: 7,
      item: t('header.jobSeeker.unRegister.recruiter'),
    },
    {
      id: 8,
      item: t('header.jobSeeker.user.dropdown.account'),
      hidden: !user,
      subItem: [
        {
          id: 1,
          item: t('header.jobSeeker.user.dropdown.managementProfile'),
          icon: <FaPalette />,
          navigate: '/jobseeker',
        },
        {
          id: 2,
          item: t('header.jobSeeker.user.dropdown.profile'),
          icon: <FaAddressCard />,
          navigate: '/jobseeker/profile',
        },
        {
          id: 3,
          item: t('header.jobSeeker.user.dropdown.mycv'),
          icon: <FaIdCard />,
          navigate: '/jobseeker/resumes',
        },
        {
          id: 4,
          item: t('header.jobSeeker.user.dropdown.favoriteJobs'),
          icon: <FaPenToSquare />,
          navigate: '/jobseeker/favorite-posts',
        },
        {
          id: 5,
          item: t('header.jobSeeker.user.dropdown.appliedJobs'),
          icon: <FaCheck />,
          navigate: '/jobseeker/recent-applications',
        },
        {
          id: 6,
          item: t('header.jobSeeker.user.dropdown.settings'),
          icon: <FaSliders />,
          navigate: '/jobseeker/settings',
        },
        {
          id: 7,
          item: t('header.jobSeeker.user.dropdown.logout'),
          icon: <FaArrowRightFromBracket />,
          onClick: () => openModal('logout-modal'),
        },
      ],
    },
  ]

  return (
    <>
      <header className="fixed z-50 flex items-center justify-between w-full h-20 bg-white shadow header hover:shadow-lg">
        <div className="flex items-center gap-6">
          <NavLink to="." className="flex items-center">
            <img src={logo} className="object-cover" />
          </NavLink>

          <nav className="items-center font-semibold navbar-header">
            <Dropdown
              width="w-[220px]"
              render={
                <NavLink to="posts" className={navLinkCls}>
                  {t('header.jobSeeker.search.label')}
                </NavLink>
              }
              type="hover"
            >
              <Dropdown.Item to="posts" icon={FaSearch as IconType}>
                {t('header.jobSeeker.search.dropdown.searchJobs')}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item to="recent-applications" icon={FaGear as IconType}>
                {t('header.jobSeeker.search.dropdown.appliedJobs')}
              </Dropdown.Item>
              <Dropdown.Item
                to="jobseeker/favorite-jobs"
                icon={FaHeart as IconType}
              >
                {t('header.jobSeeker.search.dropdown.bookmarkedJobs')}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item to="" icon={FaSuitcase as IconType}>
                {t('header.jobSeeker.search.dropdown.suitableJobs')}
              </Dropdown.Item>
            </Dropdown>

            <Dropdown
              width="w-[220px]"
              render={
                <NavLink to="#" className="transition hover:text-main">
                  {t('header.jobSeeker.profileAndCV.label')}
                </NavLink>
              }
              type="hover"
            >
              <Dropdown.Item to="" icon={FaListCheck as IconType}>
                {t('header.jobSeeker.profileAndCV.dropdown.CVs')}
              </Dropdown.Item>
              <Dropdown.Item to="" icon={FaFile as IconType}>
                {t('header.jobSeeker.profileAndCV.dropdown.coverLetters')}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                to="jobseeker/favorite-jobs"
                icon={FaClipboard as IconType}
              >
                {t('header.jobSeeker.profileAndCV.dropdown.cvTemplate')}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={FaStar as IconType}>
                {t('header.jobSeeker.profileAndCV.dropdown.topCVProfile')}
              </Dropdown.Item>
            </Dropdown>

            <Dropdown
              width="w-[210px]"
              render={
                <NavLink to="businesses" className={navLinkCls}>
                  {t('header.jobSeeker.business.label')}
                </NavLink>
              }
              type="hover"
            >
              <Dropdown.Item to="businesses" icon={FaListCheck as IconType}>
                {t('header.jobSeeker.business.dropdown.businessList')}
              </Dropdown.Item>
              <Dropdown.Item to="" icon={FaStar as IconType}>
                {t('header.jobSeeker.business.dropdown.topBusinesses')}
              </Dropdown.Item>
            </Dropdown>

            <NavLink to="#" className="transition hover:text-main">
              {t('header.jobSeeker.contact')}
            </NavLink>

            {!user && (
              <NavLink
                to={'http://localhost:3001'}
                className="px-4 py-2 font-semibold transition-all hover:text-main"
              >
                {t('header.jobSeeker.unRegister.recruiter')}
              </NavLink>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSelector init={getLanguage().code} />
            <AuthHeaderComponent logout={handleLogout} />
          </div>

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
          {/* /// */}
        </div>
      </header>
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
              <Button color="main" onClick={handleLogout}>
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

const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  `flex p-2 transition hover:text-main ${isActive ? 'text-main' : ''}`
