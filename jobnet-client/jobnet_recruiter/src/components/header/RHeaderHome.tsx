import { Link, NavLink } from 'react-router-dom'
import vite from '/vite.svg'
import Button from 'Common/Button'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { useEffect, useState } from 'react'

import LanguageSelector from 'Common/LanguageSelector'

import logo from '../../assets/images/logo.png'
import { RootState } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { FaBars, FaXmark } from 'react-icons/fa6'
import HeaderItemSmall from './HeaderSmall'
import { MenuItem } from '../../types/headerSmall'
import { getLanguage } from '../../utils/language'

export default function RHeaderHome(): JSX.Element {
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth)

  const [openFly, setOpenFly] = useState<boolean>(false)

  const handleOpenFly = () => {
    setOpenFly(!openFly)
  }
  useEffect(() => {
    if (auth.user) {
      navigate('/dashboard')
    }
  }, [])

  const { t } = useTranslation()

  const dataForHeader: MenuItem[] = [
    {
      id: 1,
      item: t('header.recruiter.auth.register'),
      navigate: '.../../signup',
      hidden: auth.user,
    },
    {
      id: 2,
      item: t('header.recruiter.auth.login'),
      navigate: '../../signin',
      hidden: auth.user,
    },
    {
      id: 3,
      item: t('header.recruiter.home.about.label'),
    },
    {
      id: 4,
      item: t('header.recruiter.home.service.label'),
    },
    {
      id: 5,
      item: t('header.recruiter.home.support.label'),
    },
    {
      id: 6,
      item: t('header.recruiter.unRegister.candidate'),
    },
    {
      id: 7,
      item: t('header.jobSeeker.logout'),
      hidden: !auth.user,
    },
  ]
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 bg-white shadow header-home hover:shadow-lg">
        <div>
          <div className="flex items-center">
            <Link to="../../" className="flex items-center">
              <img src={logo} className="object-cover" />
            </Link>
            <nav className="items-center ml-6 font-semibold header-item">
              <NavLink to="../" className={recruiterNavLink}>
                {t('header.recruiter.home.about.label')}
              </NavLink>

              <NavLink to="service" className={recruiterNavLink}>
                {t('header.recruiter.home.service.label')}
              </NavLink>

              <NavLink to="support" className={recruiterNavLink}>
                {t('header.recruiter.home.support.label')}
              </NavLink>

              <NavLink to={'resume'} className={recruiterNavLink}>
                {t('header.recruiter.unRegister.candidate')}
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2 lg:gap-x-4">
            <LanguageSelector init={getLanguage().code} />
            <RecruiterUnregister translate={t} />
          </div>

          {/* Fly menu */}
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
              <img src={vite} className="h-10" />
              <div
                onClick={handleOpenFly}
                className="p-2 rounded-full cursor-pointer bg-mainLower"
              >
                <FaXmark alt="" className="w-5 h-5 text-main" />
              </div>
            </div>
            <div className="flex flex-col py-4 gap-y-2">
              <div className="flex flex-col px-2 text-base">
                <HeaderItemSmall data={dataForHeader} auth={auth.user} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

function RecruiterUnregister({
  translate,
}: {
  translate: TFunction<'translation', undefined>
}): JSX.Element {
  return (
    <>
      <Link to="signin" className="header-unregister">
        <Button
          color="empty"
          className="border border-main text-main"
          size="md"
        >
          {translate('header.recruiter.unRegister.login')}
        </Button>
      </Link>
      <Link to="signup" className="header-unregister">
        <Button size="md">
          {translate('header.recruiter.unRegister.register')}
        </Button>
      </Link>
    </>
  )
}

const recruiterNavLink = ({ isActive }: { isActive: boolean }) =>
  `transition-all hover:text-main relative ${isActive ? 'text-main' : ''}`
