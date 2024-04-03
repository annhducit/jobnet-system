import { Outlet } from 'react-router'
import {
  FaAddressCard,
  FaCheck,
  FaIdCard,
  FaPalette,
  FaPenToSquare,
  FaSliders,
} from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

import Sidebar from 'Common/SideBar'

import type { IconType } from 'react-icons'

export default function JSProfileLayout(): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="flex pt-20">
      <div
        className="sticky flex top-20"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <Sidebar className="block">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item to="." end icon={FaPalette as IconType}>
                {t('sidebar.jobSeeker.manageProfile')}
              </Sidebar.Item>
              <Sidebar.Item to="profile" icon={FaAddressCard as IconType}>
                {t('sidebar.jobSeeker.profile')}
              </Sidebar.Item>
              <Sidebar.Item to="resumes" icon={FaIdCard as IconType}>
                {t('sidebar.jobSeeker.myCV')}
              </Sidebar.Item>
              <Sidebar.Item
                to="favorite-posts"
                icon={FaPenToSquare as IconType}
              >
                {t('sidebar.jobSeeker.favoriteJobs')}
              </Sidebar.Item>
              <Sidebar.Item to="recent-applications" icon={FaCheck as IconType}>
                {t('sidebar.jobSeeker.appliedJobs')}
              </Sidebar.Item>

              <Sidebar.Item to="settings" icon={FaSliders as IconType}>
                {t('sidebar.jobSeeker.settings')}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="grow main-layout">
        <Outlet />
      </div>
    </div>
  )
}
