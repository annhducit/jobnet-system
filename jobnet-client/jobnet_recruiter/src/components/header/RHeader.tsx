import { Link, NavLink } from 'react-router-dom'
import { IconType } from 'react-icons'

import logo from '../../assets/images/logo.png'
import {
  FaBars,
  FaFile,
  FaHeart,
  FaUser,
} from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Dropdown from 'Common/Dropdown'
import LanguageSelector from 'Common/LanguageSelector'

import { RootState } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AuthHeaderRC from 'User/RC/AuthHeaderRC'
import { getLanguage } from '../../utils/language'

export default function RHeader(): JSX.Element {
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (!auth.user) {
      navigate('/posts')
    }
  }, [])
  const { t } = useTranslation()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-4 bg-white shadow lg:px-8 hover:shadow-lg">
        <div>
          <div className="flex items-center">
            <Link to="../../" className="flex items-center">
            <img src={logo} className="object-cover" />
            </Link>
            <nav className="items-center hidden ml-6 font-semibold lg:ml-8 md:gap-2 lg:gap-6 md:flex">
              <Dropdown
                className="p-2"
                width="w-[220px]"
                render={
                  <NavLink to="jobseekers" className={recruiterNavLink}>
                    {t('header.recruiter.candidate.label')}
                  </NavLink>
                }
                type="hover"
                position="bottomLeft"
              >
                <Dropdown.Item to="jobseekers" icon={FaBars as IconType}>
                  {t('header.recruiter.candidate.dropdown.managementCandidate')}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item to="jobseekers" icon={FaUser as IconType}>
                  {t('header.recruiter.candidate.dropdown.rightCandidate')}
                </Dropdown.Item>
                <Dropdown.Item to="jobseeker" icon={FaHeart as IconType}>
                  {t('header.recruiter.candidate.dropdown.appliedCandiate')}
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                className="p-2"
                width="w-[190px]"
                render={
                  <NavLink to="posts" className={recruiterNavLink}>
                    {t('header.recruiter.posts.label')}
                  </NavLink>
                }
                type="hover"
                position="bottomLeft"
              >
                <Dropdown.Item to="posts" icon={FaBars as IconType}>
                  {t('header.recruiter.posts.dropdown.managementPosts')}
                </Dropdown.Item>
                <Dropdown.Item
                  to="../../posts/new"
                  icon={FaFile as IconType}
                >
                  {t('header.recruiter.posts.dropdown.createPost')}
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                className="p-2"
                render={
                  <NavLink to="campaigns" className={recruiterNavLink}>
                    {t('header.recruiter.cv.label')}
                  </NavLink>
                }
                type="hover"
                position="bottomLeft"
              >
                <Dropdown.Item to="campaigns" icon={FaBars as IconType}>
                  {t('header.recruiter.cv.dropdown.rightCV')}
                </Dropdown.Item>
              </Dropdown>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-4 ">
            <LanguageSelector init={getLanguage().code}/>
            <AuthHeaderRC />
          </div>
        </div>
      </header>
    </>
  )
}
const recruiterNavLink = ({ isActive }: { isActive: boolean }) =>
  `transition-all hover:text-main relative ${isActive ? 'text-main' : ''}`
