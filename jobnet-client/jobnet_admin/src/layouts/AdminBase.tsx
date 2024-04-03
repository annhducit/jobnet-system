import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { HiArrowSmRight } from 'react-icons/hi'
import {
  FaBriefcase,
  FaCampground,
  FaPaste,
  FaUsers,
  FaHotjar,
  FaArrowsSpin,
  FaCircleCheck,
  FaCircleXmark,
  FaBuildingUser,
  FaEarthAsia,
} from 'react-icons/fa6'
import { FcOvertime } from 'react-icons/fc'
import { GrDocumentTime } from 'react-icons/gr'
import { IoDocumentLock, IoSettings } from 'react-icons/io5'
import { BiSolidCategory } from 'react-icons/bi'
import { BsBoxArrowRight } from 'react-icons/bs'
import { MdOutlineAccountCircle, MdOutlineChangeCircle } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'

import { authActions } from '../features/auth/authSlice'
import useModal from '../hooks/useModal'

import logo from '../assets/images/logo.png'

import Sidebar from 'Common/SideBar'

import { Modal, Button } from 'flowbite-react'

export default function AdminBage(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const logout = () => {
    dispatch(authActions.clearAuth())
    navigate('/signin')
  }
  const { modal, openModal, closeModal } = useModal()

  return (
    <div className="flex h-screen bg-mainLower">
      <div className="sticky flex h-screen">
        <Sidebar className="overflow-y-scroll">
          <Sidebar.Logo img={logo}></Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item to="." end icon={FaBriefcase as IconType}>
                {t('sidebar.admin.dashboard')}
              </Sidebar.Item>
              <Sidebar.Collapse
                className="cursor-pointer"
                label={t('sidebar.admin.managePosts.label')}
                icon={FaPaste as IconType}
              >
                <Sidebar.Item
                  to="posts/all"
                  icon={FaPaste as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.managePosts.collapse.allPosts')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="posts/pending"
                  icon={GrDocumentTime as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.managePosts.collapse.pendingPosts')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="posts/opened"
                  icon={GrDocumentTime as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.managePosts.collapse.openningPosts')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="posts/expired"
                  icon={FcOvertime as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.managePosts.collapse.expriedPosts')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="posts/blocked"
                  icon={IoDocumentLock as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.managePosts.collapse.blockedPosts')}
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Item to="recruiters" icon={FaUsers as IconType}>
                {t('sidebar.admin.recruiter.label')}
              </Sidebar.Item>
              <Sidebar.Item to="jobseekers" icon={FaUsers as IconType}>
                {t('sidebar.admin.jobSeeker.label')}
              </Sidebar.Item>

              <Sidebar.Collapse
                className="cursor-pointer"
                label={t('sidebar.admin.business.label')}
                icon={FaBuildingUser as IconType}
              >
                <Sidebar.Item
                  to="businesses/all"
                  icon={FaEarthAsia as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.business.collapse.allBusinesses')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="businesses/Pending"
                  icon={FaArrowsSpin as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.business.collapse.pendingBusinesses')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="businesses/Approved"
                  icon={FaCircleCheck as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.business.collapse.aprrovedBusinesses')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="businesses/Rejected"
                  icon={FaCircleXmark as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.business.collapse.rejectedBusinesses')}
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                className="cursor-pointer"
                label={t('sidebar.admin.setting.label')}
                icon={IoSettings as IconType}
              >
                <Sidebar.Item
                  to="categories"
                  icon={BiSolidCategory as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.setting.collapse.category')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="professions"
                  icon={FaCampground as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.setting.collapse.industry')}
                </Sidebar.Item>
                <Sidebar.Item
                  to="levels-benefits"
                  icon={FaHotjar as IconType}
                  className="ml-5"
                >
                  {t('sidebar.admin.setting.collapse.benefitAndLevel')}
                </Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Collapse
                className="cursor-pointer"
                label={t('sidebar.admin.account.label')}
                icon={MdOutlineAccountCircle as IconType}
              >
                <Sidebar.Item
                  icon={MdOutlineChangeCircle as IconType}
                  className="ml-5 cursor-pointer"
                >
                  {t('sidebar.admin.account.collapse.changePassword')}
                </Sidebar.Item>
                <div
                  onClick={() => {
                    openModal('admin-logout')
                  }}
                >
                  <Sidebar.Item
                    icon={HiArrowSmRight as IconType}
                    className="ml-5 cursor-pointer"
                  >
                    {t('sidebar.admin.account.collapse.logout')}
                  </Sidebar.Item>
                </div>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="flex-1 mx-4">
        <Outlet />
      </div>

      <Modal
        id="admin-logout"
        show={modal === 'admin-logout'}
        size="md"
        popup
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsBoxArrowRight className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc muốn đăng xuất?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="purple" onClick={logout}>
                Đăng xuất
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
