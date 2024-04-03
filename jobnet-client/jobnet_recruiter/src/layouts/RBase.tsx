import { Outlet } from 'react-router'
import { FaBriefcase, FaCampground, FaPaste, FaUsers } from 'react-icons/fa6'

import Sidebar from 'Common/SideBar'

import type { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

export default function BaseRecruiter(): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="flex pt-20">
      <div
        className="sticky flex top-20 sm:hidden"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item to="dashboard" end icon={FaBriefcase as IconType}>
                {t('sidebar.recruiter.dashboard')}
              </Sidebar.Item>
              <Sidebar.Item to="posts" icon={FaPaste as IconType}>
                {t('sidebar.recruiter.managePosts')}
              </Sidebar.Item>
              <Sidebar.Item to="campaigns" icon={FaCampground as IconType}>
                {t('sidebar.recruiter.camping')}
              </Sidebar.Item>
              <Sidebar.Item to="applicants" icon={FaUsers as IconType}>
                {t('sidebar.recruiter.candidate')}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="flex-1 bg-white main-layout">
        <Outlet />
      </div>
    </div>
  )
}
