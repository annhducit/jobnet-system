import { useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import useTitlePage from '../hooks/useTitlePage'
import { RootState } from '../app/store'

import useSlider from '../hooks/useSlider'

import Button from 'Common/Button'

RecruiterHome.loader = async function () {
  return Promise.resolve(null)
}

export default function RecruiterHome(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.home'))

  const parnerSliderRef = useRef<HTMLDivElement>(null)
  const auth = useSelector((state: RootState) => state.auth)

  const { moveToNextSlide, moveToPrevSlide } = useSlider()

  return (
    <div className="pt-[100px] px-3">
      <div className="my-2">
        <img loading="lazy" src="/banner.png" alt="banner" />
      </div>
      <div className="flex justify-center my-10">
        <Link to={`${auth.user ? '/posts/new' : '/signin'}`}>
          <Button size="lg">{t('recruiter.home.button.hiring')}</Button>
        </Link>
      </div>
      <div className="lg:px-[150px] my-10">
        <div className="my-5 text-center">
          <h2 className=" text-[20px] font-semibold my-3">
            {t('recruiter.home.intro.title')}
          </h2>
          <p>{t('recruiter.home.intro.subtitle')}</p>
        </div>
        <div className="grid gap-6 my-10 grid-layout ">
          <Item
            title={t('recruiter.home.features.feature1.title')}
            desc={t('recruiter.home.features.feature1.desc')}
          />
          <Item
            title={t('recruiter.home.features.feature2.title')}
            desc={t('recruiter.home.features.feature2.desc')}
          />
          <Item
            title={t('recruiter.home.features.feature3.title')}
            desc={t('recruiter.home.features.feature3.desc')}
          />
          <Item
            title={t('recruiter.home.features.feature4.title')}
            desc={t('recruiter.home.features.feature4.desc')}
          />
          <Item
            title={t('recruiter.home.features.feature5.title')}
            desc={t('recruiter.home.features.feature5.desc')}
          />
          <Item
            title={t('recruiter.home.features.feature6.title')}
            desc={t('recruiter.home.features.feature6.desc')}
          />
        </div>

        <div className="flex flex-col-reverse h-auto my-10 lg:flex-row gap-y-5">
          <div>
            <div className="mb-5">
              <span className="text-[28px] font-semibold">
                {t('recruiter.home.aboutUs.title')}
              </span>
              <div className="w-[120px] h-[4px] bg-main"></div>
            </div>
            <p className="pr-3 text-justify">
              {t('recruiter.home.aboutUs.desc')}
            </p>
          </div>
          <div className="h-full">
            <img
              loading="lazy"
              className="h-full"
              src="Coding2.jpg"
              alt="logo"
            />
          </div>
        </div>

        <div className="h-auto my-10">
          <div className="mb-5">
            <span className="text-[28px] font-semibold">
              {t('recruiter.home.partners')}
            </span>
          </div>
          <div className="flex items-center justify-between w-full h-[100px]">
            <div
              className="text-3xl"
              onClick={() => moveToPrevSlide(parnerSliderRef)}
            >
              <FaAngleLeft />
            </div>

            <div
              className="flex h-full mt-6 overflow-hidden lg:-mx-4 justify-evenly flex-nowrap"
              ref={parnerSliderRef}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div
                  key={num}
                  className="flex justify-center flex-none lg:basis-1/5 basis-2/5"
                >
                  <img
                    loading="lazy"
                    className="h-[100px] w-[100px] "
                    src="square.png"
                    alt="logo"
                  />
                </div>
              ))}
            </div>

            <div
              className="ml-2 text-3xl"
              onClick={() => moveToNextSlide(parnerSliderRef)}
            >
              <FaAngleRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Item({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-center gap-2 p-6 rounded lg:gap-0 bg-mainLower">
      <img
        loading="lazy"
        className="w-[100px] h-[100px]"
        src="/square.png"
        alt="logo"
      />
      <div className="flex flex-col ml-3 justify-evenly">
        <span className="text-[18px] font-semibold">{title}</span>
        <p>{desc}</p>
      </div>
    </div>
  )
}
