import { useState } from 'react'
import useTitlePage from '../hooks/useTitlePage'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { FaArrowRight, FaLocationDot } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import homeBackground from '../../src/assets/images/home/main-section.svg'
import live from '../../src/assets/images/home/Icon-3.svg'
import companies from '../../src/assets/images/home/Icon-1.svg'
import candidates from '../../src/assets/images/home/Icon-2.svg'
import newjob from '../../src/assets/images/home/Icon.svg'

import add from '../../src/assets/images/home/add.svg'
import verify from '../../src/assets/images/home/verify.svg'
import friend from '../../src/assets/images/home/friend.svg'
import cloud from '../../src/assets/images/home/cloud.svg'
import arrow from '../../src/assets/images/home/arrows.svg'
import arrowRotate from '../../src/assets/images/home/arrows-rotate.svg'

import graphic from '../../src/assets/images/home/pen.svg'
import code from '../../src/assets/images/home/code.svg'
import digital from '../../src/assets/images/home/social.svg'
import video from '../../src/assets/images/home/video.svg'
import music from '../../src/assets/images/home/music.svg'
import account from '../../src/assets/images/home/analyc.svg'
import health from '../../src/assets/images/home/job.svg'
import data from '../../src/assets/images/home/data.svg'

import candidate from '../../src/assets/images/recruiter-bg.png'
import recruiter from '../../src/assets/images/candidate-bg.png'

import Button from 'Common/Button'
import Input from 'Common/input/Input'

import Category from 'Post/Category'
import FeatureJobs from 'Post/FeatureJobs'
import { getCategories } from 'Post/Category'

import BusinessesSlider from 'Business/components/BusinessesSlider'

import UploadCVGif from '../components/UploadCVGif'

interface HomeLoader {
  categories: Category[]
}

interface HomeSliderProps {
  title: string
}

Home.loader = async function (): Promise<HomeLoader> {
  const categories = await getCategories()
  return { categories }
}

export default function Home(): React.ReactElement {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.home'))

  return (
    <>
      <HomeSectionOne />
      <HomeSectionTwo />
      <HomeSectionThree />
      <HomeSectionFour />
      <hr />
      <HomeSectionFive />
      <HomeSlider title="Top companies" />
      <HomeSectionSeven />
      <UploadCVGif />
    </>
  )
}
function HomeSectionOne() {
  const navigate = useNavigate()
  const [search, setSearch] = useState(
    localStorage.getItem('lastSearchKeyword') || ''
  )

  const { t } = useTranslation()

  const handleJobsSearch = () => {
    if (search) localStorage.setItem('lastSearchKeyword', search)
    if (search) {
      navigate(`/posts?search=${search}`)
    } else {
      toast.error(t('toast.errors.requireKeyword'))
    }
  }
  return (
    <div className="flex flex-col items-center bg-gray-100 home-layout bg-opacity-60">
      <div className="w-full mt-12 home-layout_second max-md:max-w-full max-md:mt-10">
        <div className="flex gap-10 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-3/5 max-md:w-full max-md:ml-0">
            <span className="flex flex-col items-start px-5 my-auto gap-y-4 max-md:max-w-full max-md:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
                className="text-zinc-900 text-6xl font-medium leading-[64px] self-stretch max-md:max-w-full max-md:text-4xl max-md:leading-[51px]"
              >
                {t('home.welcome.title')}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
                className="self-stretch mt-6 text-lg leading-7 text-gray-500 max-md:max-w-full"
              >
                {t('home.welcome.subtitle')}
              </motion.div>
              <motion.div
                className="flex items-center self-stretch justify-between gap-3 mt-8 bg-white border border-solid rounded-lg shadow-sm lg:px-3 max-md:max-w-full max-md:flex-wrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeInOut' }}
              >
                <div className="flex items-stretch justify-between gap-0 max-md:max-w-full max-md:flex-wrap">
                  <span className="flex items-center justify-between gap-3 px-5 py-3 bg-white rounded-md max-md:pr-5">
                    <FaSearch className="text-lg text-main" />
                    <Input
                      color="none"
                      placeholder={t('home.welcome.searchBar.placeholder')}
                      className="self-center my-auto text-base leading-6 text-gray-400 grow whitespace-nowrap"
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                      }
                    />
                  </span>
                  <span className="flex items-center justify-between gap-3 px-5 py-4 bg-white rounded-md max-md:pr-5">
                    <FaLocationDot className="text-lg text-main" />
                    <Input
                      color="none"
                      placeholder=" Your Location"
                      className="self-center my-auto text-base leading-6 text-gray-400 grow whitespace-nowrap"
                    />
                  </span>
                </div>
                <Button
                  className="items-center justify-center px-6 py-2 text-base font-semibold leading-6 text-white capitalize transition-all rounded button-section bg-main hover:bg-mainHover whitespace-nowrap max-md:px-5"
                  color="empty"
                  onClick={handleJobsSearch}
                >
                  {t('home.welcome.searchBar.button')}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2, ease: 'easeInOut' }}
                className="flex items-center self-start gap-0 mt-6 gap-x-1 max-md:max-w-full max-md:flex-wrap"
              >
                <div className="text-sm leading-5 text-center text-gray-400 grow whitespace-nowrap">
                  {t('home.welcome.emphasis')}
                </div>
                <div className="text-sm leading-5 text-center text-gray-600">
                  Designer, Programing,{' '}
                  <span className="text-main">Digital Marketing</span>, Video,
                  Animation.
                </div>
              </motion.div>
            </span>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -120 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 1 }}
            className="flex flex-col items-stretch w-2/5 ml-5 max-md:w-full max-md:ml-0"
          >
            <img
              loading="lazy"
              src={homeBackground}
              className="aspect-[1.29] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
            />
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col items-center self-stretch justify-center w-full mt-24 mb-12 max-md:max-w-full max-md:my-10 max-md:px-5">
        <div className="w-full max-w-[1320px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-3/12 transition-all shadow-sm cursor-pointer hover:shadow-2xl max-md:w-full max-md:ml-0">
              <div className="flex items-stretch justify-between w-full gap-5 p-5 bg-white rounded-lg grow max-md:mt-6">
                <div className="items-center rounded bg-sky-100 flex aspect-square w-[72px] h-[72px] flex-col justify-center  px-4">
                  <img
                    loading="lazy"
                    src={live}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <span className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                  <div className="text-2xl font-medium leading-8 text-zinc-900 whitespace-nowrap">
                    1,75,324
                  </div>
                  <div className="text-gray-500 text-base leading-6 whitespace-nowrap mt-1.5">
                    {t('home.exploration.job')}
                  </div>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-3/12 ml-5 transition-all shadow-sm cursor-pointer hover:shadow-2xl max-md:w-full max-md:ml-0">
              <div className="flex items-stretch justify-between w-full gap-5 p-5 bg-white rounded-lg grow max-md:mt-6">
                <div className="items-center rounded bg-blue-700 flex aspect-square flex-col justify-center w-[72px] h-[72px] px-4">
                  <img
                    loading="lazy"
                    src={companies}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <span className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                  <div className="text-2xl font-medium leading-8 text-zinc-900 whitespace-nowrap">
                    97,354
                  </div>
                  <div className="text-gray-500 text-base leading-6 whitespace-nowrap mt-1.5">
                    {t('home.exploration.company')}
                  </div>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-3/12 ml-5 transition-all shadow-sm cursor-pointer md:flex hover:shadow-2xl md:flex-col max-md:w-full max-md:ml-0">
              <div className="flex items-stretch justify-between w-full gap-5 p-5 bg-white rounded-lg grow max-md:mt-6">
                <div className="items-center rounded bg-sky-100 flex aspect-square flex-col justify-center w-[72px] h-[72px] px-4">
                  <img
                    loading="lazy"
                    src={candidates}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <span className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                  <div className="text-2xl font-medium leading-8 text-zinc-900 whitespace-nowrap">
                    38,47,154
                  </div>
                  <div className="text-gray-500 text-base leading-6 whitespace-nowrap mt-1.5">
                    {t('home.exploration.candidate')}
                  </div>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-3/12 ml-5 transition-all shadow-sm cursor-pointer hover:shadow-2xl max-md:w-full max-md:ml-0">
              <div className="flex items-stretch justify-between w-full gap-5 p-5 bg-white rounded-lg grow max-md:mt-6">
                <div className="items-center rounded bg-sky-100 flex aspect-square flex-col justify-center w-[72px] h-[72px] px-4">
                  <img
                    loading="lazy"
                    src={newjob}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <span className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                  <div className="text-2xl font-medium leading-8 text-zinc-900 whitespace-nowrap">
                    7,532
                  </div>
                  <div className="text-gray-500 text-base leading-6 whitespace-nowrap mt-1.5">
                    {t('home.exploration.newJob')}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeSectionTwo() {
  const { t } = useTranslation()

  return (
    <div className="bg-white layout-section_two">
      <div className="text-4xl font-medium leading-10 text-zinc-900 max-md:max-w-full">
        <p className="h-20 border-l-4 border-main xl:w-[480px] mt-4 pl-6">
          {' '}
          {t('home.vacancies.heading')}
        </p>
      </div>
      <div className="grid mt-12 layout-grid gap-y-6">
        {dataVacancies.map((item) => (
          <div key={item.id} className="col-span-1">
            <span className="flex flex-col items-start">
              <div className="text-lg font-medium leading-7 text-gray-900 transition-all cursor-pointer whitespace-nowrap hover:underline hover:text-main">
                {item.name}
              </div>
              <div className="mt-2 text-sm leading-5 text-gray-500 whitespace-nowrap">
                {item.numberHiring}
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HomeSectionThree() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-100 home-layout_second max-md:px-5">
      <span className="flex w-full max-w-[1320px] flex-col items-center my-12 max-md:max-w-full max-md:my-10">
        <div className="text-4xl font-medium leading-10 text-center text-zinc-900 whitespace-nowrap">
          {t('home.howToWork.heading')}
        </div>
        <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
          <div className="flex items-center gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="relative flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
              <span className="flex flex-col items-center p-6 grow rounded-xl max-md:mt-6 max-md:px-5">
                <div className="flex flex-col items-center justify-center bg-white rounded-full aspect-square">
                  <img
                    loading="lazy"
                    src={friend}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <div className="self-stretch mt-6 text-lg font-medium leading-7 text-center text-zinc-900 whitespace-nowrap">
                  {t('home.howToWork.account.title')}
                </div>
                <div className="self-stretch mt-3 text-sm leading-5 text-center text-gray-500">
                  {t('home.howToWork.account.hint')}
                </div>
              </span>
              <img
                loading="lazy"
                src={arrow}
                alt=""
                className="absolute top-0 z-10 hidden -right-2/4 md:block"
              />
            </div>
            <div className="relative flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <span className="flex flex-col items-center w-full p-6 bg-white grow rounded-xl max-md:mt-6 max-md:px-5">
                <div className="flex flex-col items-center justify-center bg-blue-700 rounded-full aspect-square">
                  <img
                    loading="lazy"
                    src={cloud}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <div className="self-stretch mt-6 text-lg font-medium leading-7 text-center text-zinc-900 whitespace-nowrap">
                  {t('home.howToWork.uploadCV.title')}
                </div>
                <div className="self-stretch mt-3 text-sm leading-5 text-center text-gray-500">
                  {t('home.howToWork.uploadCV.hint')}
                </div>
              </span>
              <img
                loading="lazy"
                src={arrowRotate}
                alt=""
                className="absolute z-10 hidden bottom-2/4 -right-2/4 md:block"
              />
            </div>
            <div className="relative flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <span className="flex flex-col items-center p-6 grow rounded-xl max-md:mt-6 max-md:px-5">
                <div className="flex flex-col items-center justify-center bg-white rounded-full aspect-square">
                  <img
                    loading="lazy"
                    src={add}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <div className="self-stretch mt-6 text-lg font-medium leading-7 text-center text-zinc-900 whitespace-nowrap">
                  {t('home.howToWork.findJob.title')}
                </div>
                <div className="self-stretch mt-3 text-sm leading-5 text-center text-gray-500">
                  {t('home.howToWork.findJob.hint')}
                </div>
              </span>
              <img
                loading="lazy"
                src={arrow}
                alt=""
                className="absolute top-0 hidden -right-2/4 md:block"
              />
            </div>
            <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
              <span className="flex flex-col items-center justify-center p-6 grow rounded-xl max-md:mt-6 max-md:px-5">
                <div className="flex flex-col items-center justify-center bg-white rounded-full aspect-square">
                  <img
                    loading="lazy"
                    src={verify}
                    className="object-contain object-center w-full overflow-hidden aspect-square"
                  />
                </div>
                <div className="self-stretch mt-6 text-lg font-medium leading-7 text-center text-zinc-900 whitespace-nowrap">
                  {t('home.howToWork.apply.title')}
                </div>
                <div className="self-stretch mt-3 text-sm leading-5 text-center text-gray-500">
                  {t('home.howToWork.uploadCV.hint')}
                </div>
              </span>
            </div>
          </div>
        </div>
      </span>
    </div>
  )
}

function HomeSectionFour() {
  const { t } = useTranslation()

  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-sm home-layout_second">
      <div className="flex flex-col items-stretch w-full my-12 max-md:max-w-full max-md:my-10">
        <span className="flex items-stretch justify-between w-full gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="text-4xl font-medium leading-10 text-justify text-zinc-900 grow shrink basis-auto">
            {t('home.category.heading')}
          </div>
          <Button
            color="none"
            className="px-2 py-1 font-semibold text-blue-700 border rounded button-more border-slate-200"
            onClick={() => navigate('../categories')}
          >
            {t('home.category.button')}

            <FaArrowRight className="ml-2 text-lg text-blue-700" />
          </Button>
        </span>
        <div className="grid mt-8 layout-grid">
          {dataCategories.map((item) => (
            <div
              key={item.id}
              className="flex items-center col-span-1 gap-4 p-4"
            >
              <img
                loading="lazy"
                src={item.image}
                className="w-[68px] h-[68px]"
                alt=""
              />
              <div>
                <div className="text-lg font-medium leading-7 text-zinc-900 whitespace-nowrap">
                  {item.name}
                </div>
                <div className="mt-2 text-sm leading-5 text-gray-500 whitespace-nowrap">
                  {item.openPositions}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HomeSectionFive() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center py-12 bg-white shadow-sm home-layout_second max-md:px-5">
      <div className="flex flex-col items-stretch w-full my-12 max-md:max-w-full max-md:my-10">
        <span className="flex items-stretch justify-between w-full gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="text-4xl font-medium leading-10 text-justify text-zinc-900 grow shrink basis-auto">
            {t('home.featureJob.heading')}
          </div>
          <Button
            color="none"
            className="px-2 py-1 font-semibold text-blue-700 border rounded button-more border-slate-200"
            onClick={() => navigate('/posts')}
          >
            {t('home.featureJob.button')}

            <FaArrowRight className="ml-2 text-lg text-blue-700" />
          </Button>
        </span>
      </div>
      <FeatureJobs />
    </div>
  )
}

function HomeSectionSeven() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-12 home-layout_second max-md:px-5">
      <div className="w-full my-12 max-md:max-w-full max-md:my-10">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0 rounded-xl">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0 bg-background-candidate">
            <div className="flex-col overflow-hidden relative flex min-h-[290px] grow p-12 items-start max-md:max-w-full max-md:mt-6 max-md:px-5">
              <img
                loading="lazy"
                srcSet={candidate}
                className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
              />
              <div className="relative self-stretch text-3xl font-medium leading-10 text-gray-800 max-md:max-w-full">
                {t('home.lastSection.candidates.heading')}
              </div>
              <div className="relative self-stretch mt-4 text-sm leading-5 text-gray-600 w-96 max-md:max-w-full">
                {t('home.lastSection.candidates.description')}
              </div>
              <Button
                color="none"
                onClick={() => navigate('signup')}
                className="relative flex items-center justify-center px-2 py-1 bg-white rounded mt-7 max-md:px-5"
              >
                <div className="text-base font-semibold leading-6 text-blue-700 capitalize grow whitespace-nowrap">
                  {t('home.lastSection.candidates.button')}
                </div>
                <FaArrowRight className="ml-2 text-blue-700" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0 rounded-xl">
            <div className="flex-col overflow-hidden relative flex min-h-[290px] grow p-12 items-start max-md:max-w-full max-md:mt-6 max-md:px-5">
              <img
                loading="lazy"
                srcSet={recruiter}
                className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
              />
              <div className="relative self-stretch text-3xl font-medium leading-10 text-white max-md:max-w-full">
                {t('home.lastSection.employer.heading')}
              </div>
              <div className="relative self-stretch mt-4 text-sm leading-5 text-white w-96 max-md:max-w-full">
                {t('home.lastSection.employer.description')}
              </div>
              <Button
                onClick={() => {
                  return (window.location.href = 'http://localhost:3001/signup')
                }}
                color="none"
                className="relative flex items-center justify-center px-2 py-1 bg-white rounded mt-7 max-md:px-5"
              >
                <div className="text-base font-semibold leading-6 text-blue-700 capitalize grow whitespace-nowrap">
                  {t('home.lastSection.employer.button')}
                </div>
                <FaArrowRight className="ml-2 text-blue-700" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeSlider({ title }: HomeSliderProps): React.ReactElement {
  return (
    <>
      <BusinessesSlider title={title}></BusinessesSlider>
    </>
  )
}

const dataVacancies = [
  {
    id: 1,
    name: 'Orthodontists',
    numberHiring: '12,875 Open Positions',
  },
  {
    id: 2,
    name: 'Doctor',
    numberHiring: '74,210 Open Positions',
  },
  {
    id: 3,
    name: 'Software Developer',
    numberHiring: '52,425 Open Positions',
  },
  {
    id: 4,
    name: 'Management Analysis',
    numberHiring: '35,741 Open Positions',
  },
  {
    id: 5,
    name: 'Financial Manager',
    numberHiring: '72,457 Open Positions',
  },
  {
    id: 6,
    name: 'IT Manager',
    numberHiring: '74,875 Open Positions',
  },
  {
    id: 7,
    name: 'Data Scientist',
    numberHiring: '43359 Open Positions',
  },
  {
    id: 8,
    name: 'Operations Research Analysis',
    numberHiring: '93,046 Open Positions',
  },
  {
    id: 9,
    name: 'Psychiatrists',
    numberHiring: '50,963 Open Positions',
  },
  {
    id: 10,
    name: 'Surgeons',
    numberHiring: '18,599 Open Positions',
  },
  {
    id: 11,
    name: 'Banking',
    numberHiring: '4,339 Open Positions',
  },
  {
    id: 12,
    name: 'Civil Engineering',
    numberHiring: '20,079 Open Positions',
  },
]

const dataCategories = [
  {
    id: 1,
    name: 'Graphics & Design',
    openPositions: '312 Open position',
    image: graphic,
  },
  {
    id: 2,
    name: 'Code & Programing',
    openPositions: '382 Open position',
    image: code,
  },
  {
    id: 3,
    name: 'Digital Marketing',
    openPositions: '256 Open position',
    image: digital,
  },
  {
    id: 4,
    name: 'Video & Animation',
    openPositions: '421 Open position',
    image: video,
  },
  {
    id: 5,
    name: 'Music & Audio',
    openPositions: '325 Open position',
    image: music,
  },
  {
    id: 6,
    name: 'Account & Finance',
    openPositions: '654 Open position',
    image: account,
  },
  {
    id: 7,
    name: 'Health & Care',
    openPositions: '742 Open position',
    image: health,
  },
  {
    id: 8,
    name: 'Data & Science',
    openPositions: '802 Open position',
    image: data,
  },
]
