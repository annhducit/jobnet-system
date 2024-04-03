import { FaPencil } from 'react-icons/fa6'
import { CgDanger } from 'react-icons/cg'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useTitlePage from '../hooks/useTitlePage'
import { store } from '../app/store'

import {
  getJobSeekerById,
  getJobSeekerProfileImage,
} from 'User/JobSeeker/services'
import Button from 'Common/Button'

import ApplicationType from 'Post/Application'

import vite from '/vite.svg'

import { requireAuth } from '../utils/auth'
import Jobseeker from '../types/jobSeeker'
import PaginationType from '../types/pagination'
import ResumeType from '../types/resume'
// import { getResumesByAuth } from 'User/Resume'

interface JSDashboardLoader {
  jobSeeker: Jobseeker
  application?: PaginationType<ApplicationType>
  resumes?: ResumeType[] | null
}

JSDashboard.loader = async function ({
  request,
}: {
  request: Request
}): Promise<JSDashboardLoader> {
  requireAuth(request, 'JobSeeker')

  const auth = store.getState().auth
  const jobSeeker = await getJobSeekerById(auth.user?.id as string)

  // const application = await getApplications({
  //   jobSeekerId: auth.user?.id as string,
  // })
  // const resumes = await getResumesByAuth()
  return { jobSeeker }
}

export default function JSDashboard(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.dashboard'))

  const loader = useLoaderData() as JSDashboardLoader
  const navigate = useNavigate()

  const jobSeeker = loader.jobSeeker
  // const application = loader.application.data
  const resume = loader.resumes
  // Job Suggessted
  const boxShadow = {
    boxShadow:
      'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
  }

  return (
    <div className="bg-gray-100 dashboard">
      <div className="w-full gap-3 mx-auto overflow-x-hidden layout-jsDashboard lg:gap-1 drop-shadow-lg">
        <div className="w-full lg:w-2/6 bg-mainLower h-fit">
          <div className="flex items-center justify-center p-3 bg-purple-500 gap-x-16">
            <img
              src={
                jobSeeker.profileImageId
                  ? getJobSeekerProfileImage(jobSeeker.id)
                  : 'https://www.w3schools.com/howto/img_avatar2.png'
              }
              alt="img infor"
              className="object-cover w-20 border-2 border-white rounded-md"
            />
            <Link
              to="/jobseeker/profile"
              className="p-2 text-center text-white rounded w-28 bg-main hover:bg-main-upper"
            >
              {t('jobseeker.dashboard.leftColumn.row1.button')}
            </Link>
          </div>
          <table className="ml-3 text-left table-auto bg-mainLower">
            <tr>
              <th className="p-2">
                {t('jobseeker.dashboard.leftColumn.row2.contact')}
              </th>
              <td className="p-2">{jobSeeker?.name}</td>
            </tr>
            <tr>
              <th className="p-2">
                {t('jobseeker.dashboard.leftColumn.row2.phone')}
              </th>
              <td className="p-2">{jobSeeker?.phone}</td>
            </tr>
            <tr>
              <th className="p-2">
                {t('jobseeker.dashboard.leftColumn.row2.email')}
              </th>
              <td className="p-2 break-all">{jobSeeker?.email}</td>
            </tr>
          </table>
          <div className="flex items-center justify-end mr-2 cursor-pointer">
            <FaPencil />
            <a className="italic text-blue-500 underline-offset-2">
              {t('jobseeker.dashboard.leftColumn.row2.tag')}
            </a>
          </div>
          <hr className="mt-5 border-1 border-second" />

          <div className="flex flex-col items-center justify-center">
            <h1>
              <b className="text-2xl">
                {t('jobseeker.dashboard.leftColumn.row3')}
              </b>
            </h1>

            <div
              data-progress="70"
              className="flex items-center justify-center rounded-full bg-mainLower w-44 h-44"
              style={{
                backgroundImage: 'conic-gradient(#1ac880 36deg, #f0f9ff 0deg)',
              }}
            >
              <img
                src={vite}
                alt="img infor"
                className="w-32 border-2 border-white rounded-full outline outline-8 outline-white borer bg-blue-50"
              />
            </div>
          </div>
          <hr className="mt-5 border-1 border-second" />
          <h1 className="mt-3 mb-3 ml-1 text-sm" id="X">
            <b>{t('jobseeker.dashboard.leftColumn.row4.title')}</b>
          </h1>
          <div className="flex flex-col ml-4 gap-y-6 step">
            <div className="relative flex items-center w-full step-1">
              <p className="text-blue-500 text-md lg:text-sm">
                {t('jobseeker.dashboard.leftColumn.row4.setupProfile')}
              </p>
              <Button
                className="absolute right-2 bg-main hover:bg-mainHover"
                onClick={() => navigate('./profile')}
                color="main"
              >
                {t('jobseeker.dashboard.leftColumn.row4.button')}
              </Button>
            </div>
            {!jobSeeker.profileImageId && (
              <span>
                <hr className="border-1 border-second" />
                <div className="relative flex items-center w-full mt-5 step-2 gap-x-18">
                  <p className="text-blue-500 text-md lg:text-sm">
                    Upload your image
                  </p>
                  <Button className="absolute right-2">Get started</Button>
                </div>
              </span>
            )}
          </div>
          <div className="flex flex-col p-4 mt-5 gap-y-2 update-profile">
            <b>{t('jobseeker.dashboard.leftColumn.row5.title')}</b>
            <p className="">
              {t('jobseeker.dashboard.leftColumn.row5.subTitle')}
            </p>
            <Button
              className="w-full"
              color="main"
              onClick={() => navigate('./profile')}
            >
              {t('jobseeker.dashboard.leftColumn.row5.button')}
            </Button>
          </div>
          {resume?.length == 0 && (
            <div className="flex flex-col col-span-2 p-4 mt-2 update-profile bg-mainLower gap-y-2">
              <b className="text-red-500">
                {t('jobseeker.dashboard.leftColumn.row6.title')}
              </b>
              <div className="flex items-center content gap-x-4">
                <p className="">
                  {t('jobseeker.dashboard.leftColumn.row6.subTitle')}
                </p>
                <CgDanger className="text-red-500 text-md" />
              </div>
              <Button
                className="w-full bg-red-500"
                onClick={() => navigate('./resumes')}
              >
                {t('jobseeker.dashboard.leftColumn.row6.button')}
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full overflow-x-hidden js-dashboard h-fit">
          <div className="grid justify-center w-full grid-cols-3 ml-3 text-center xl:grid-cols-3 lg:grid-cols-4 row gap-x-2 gap-y-3">
            <div
              className="flex flex-col employer-view bg-mainLower xl:col-span-1 lg:col-span-2 drop-shadow-lg h-fit gap-y-3 hover:cursor-pointer"
              style={boxShadow}
            >
              <div className="p-2 text-sm text-white break-words bg-purple-600 header-tag">
                {t('jobseeker.dashboard.rightColumn.row1.viewProfile.title')}
              </div>
              <div className="p-4 text-5xl quality text-violet-600">0</div>
              <div className="pb-4 text-sm break-words details text-violet-600">
                <b>
                  {t('jobseeker.dashboard.rightColumn.row1.viewProfile.desc')}
                </b>
              </div>
            </div>
            <div
              className="flex flex-col employer-view lg:col-span-2 xl:col-span-1 bg-mainLower drop-shadow-lg h-fit gap-y-3 hover:cursor-pointer"
              style={boxShadow}
              onClick={() => navigate('./application-recents')}
            >
              <div className="p-2 text-sm text-white break-words bg-purple-600 header-tag">
                {t('jobseeker.dashboard.rightColumn.row1.application.title')}
              </div>
              <div className="p-4 text-5xl quality text-violet-600">
                {/* {application.length} */}4
              </div>
              <div className="pb-4 text-sm break-words details text-violet-600">
                <b>
                  {t('jobseeker.dashboard.rightColumn.row1.application.desc')}
                </b>
              </div>
            </div>
            <div
              className="flex flex-col lg:col-span-2 employer-view xl:col-span-1 bg-mainLower drop-shadow-lg h-fit gap-y-3 hover:cursor-pointer"
              style={boxShadow}
            >
              <div className="p-2 text-sm text-white break-words bg-purple-600 header-tag">
                {t('jobseeker.dashboard.rightColumn.row1.jobNotify.title')}
              </div>
              <div className="p-4 text-5xl quality text-violet-600">0</div>
              <div className="pb-4 text-sm break-words details text-violet-600">
                <b>
                  {t('jobseeker.dashboard.rightColumn.row1.jobNotify.desc')}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
