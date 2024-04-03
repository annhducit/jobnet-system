import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaPlusCircle,
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import business from '../../src/assets/images/business-main-profile.png'

import useSlider from '../hooks/useSlider'

import BusinessCardSkeleton from 'Common/skeleton/BusinessCard'
import Button from 'Common/Button'
import Slider from 'Common/Slider'
import { getAuth } from 'Common/auth'

import postService from '../services/postService'
import businessService from '../services/businessService'
import jobSeekerService from '../services/jobSeekerService'

import Business from '../types/business'
import PostType from '../types/post'

export default function BusinessesSlider({ title }: { title: string }) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const { moveToNextSlide, moveToPrevSlide } = useSlider()
  const [businessCards, setElms] = useState<JSX.Element[]>(() =>
    Array.from({ length: 6 }, (_, i) => <BusinessCardSkeleton key={i} />)
  )

  useEffect(() => {
    const loadData = async () => {
      const data = await businessService.getBusinesses()
      setElms(() =>
        data.data.map((topBusiness) => (
          <BusinessCard key={topBusiness.id} data={topBusiness} />
        ))
      )
    }
    loadData().catch((err) => {
      console.log(err)
      // en/vi
      toast.error('Load data fail!')
    })
  }, [])
  return (
    <div className="space-y-2 slider">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-medium leading-10 text-justify text-zinc-900 grow shrink basis-auto">
          {title}
        </h2>
        <div className="flex items-center">
          <div
            className="p-2 text-main hover:text-main-upper hover:cursor-pointer"
            onClick={() => moveToPrevSlide(sliderRef)}
          >
            <FaRegArrowAltCircleLeft className="w-8 h-8" />
          </div>
          <div
            className="p-2 text-2xl md:text-3xl text-main hover:text-main-upper hover:cursor-pointer"
            onClick={() => moveToNextSlide(sliderRef)}
          >
            <FaRegArrowAltCircleRight className="w-8 h-8" />
          </div>
        </div>
      </div>
      <Slider ref={sliderRef} elms={businessCards} className="px-4 gap-x-6" />
    </div>
  )
}

function BusinessCard({ data }: { data: Business }) {
  const { t } = useTranslation()

  const [totalJobsOfBusiness, setTotalJobsOfBusiness] = useState<PostType[]>()
  const auth = getAuth()
  const [follow, setFollow] = useState(false)
  const jobSeekerId = auth.user?.id as string

  useEffect(() => {
    void (async () => {
      const pagination = await postService.getPosts({
        businessId: data.id,
        activeStatus: 'Opening',
        isExpired: false,
      })
      setTotalJobsOfBusiness(pagination.data)
    })()
  }, [data.id])

  if (jobSeekerId) {
    data.followers?.forEach((i) => {
      if (i == jobSeekerId && !follow) {
        setFollow(true)
      }
    })
  }

  const handleFollowClick = () => {
    void (async () => {
      if (!jobSeekerId) {
        toast.error('Error: You need to Login')
        return
      }
      const jobSeekerRes =
        await jobSeekerService.updateJobSeekerBusinessFollowed(jobSeekerId, {
          status: 'FOLLOW',
          businessId: data.id,
        })
      if (!jobSeekerRes) {
        return toast.error('Error: ')
      }
      const business = await businessService.updateBusinessFollowers(data.id, {
        status: 'FOLLOW',
        userId: jobSeekerId,
      })
      if (business) {
        setFollow(true)
        toast.success(t('toast.follow.followed'))
      }
    })()
  }

  const handleUnFollowClick = () => {
    void (async () => {
      const jobSeekerRes =
        await jobSeekerService.updateJobSeekerBusinessFollowed(jobSeekerId, {
          status: 'UNFOLLOW',
          businessId: data.id,
        })
      if (!jobSeekerRes) {
        return toast.error('Error: ')
      }
      const business = await businessService.updateBusinessFollowers(data.id, {
        status: 'UNFOLLOW',
        userId: jobSeekerId,
      })
      if (business) {
        setFollow(false)
        toast.success(t('toast.follow.unfollow'))
      }
    })()
  }
  return (
    <div className="items-stretch border p-6 border-[color:var(--Gray-100,#E4E5E8)] shadow-sm bg-white flex max-w-[424px] flex-col px-4 rounded-lg border-solid">
      <div className="flex flex-col items-stretch justify-between">
        <div className="w-64 h-40 rounded">
          <img
            loading="lazy"
            src={`http://localhost:3012${business}`}
            className="object-cover w-full h-full rounded"
          />
        </div>
        <div className="items-stretch flex grow py-4 basis-[0%] flex-col self-start">
          <span className="flex items-stretch justify-between gap-2">
            <Link
              to={`/businesses/${data.id}`}
              className="w-40 text-lg font-medium leading-7 text-gray-800 truncate"
            >
              {data?.name}
            </Link>
            <span className="text-red-500 text-sm leading-5 items-stretch bg-rose-50 grow justify-center px-3 py-1 rounded-[52px] self-start">
              Featured
            </span>
          </span>
          <span className="flex justify-between items-center gap-3 mt-1.5 ">
            <FaLocationDot className="text-gray-500" />
            <div className="self-stretch text-sm leading-5 text-gray-500 grow whitespace-nowrap">
              {data?.country || 'Dhaka, Bangladesh'}
            </div>
            <span className="self-start justify-center text-sm text-main items-stretchgrow">
              {t('home.company.position')} ({totalJobsOfBusiness?.length})
            </span>
          </span>
        </div>

        {!follow ? (
          <Button
            color="none"
            className="items-center justify-center px-16 py-2 mt-5 text-base font-semibold leading-6 text-blue-700 capitalize rounded whitespace-nowrap bg-sky-100"
            onClick={() => handleFollowClick()}
          >
            {t('home.company.button.follow')}
          </Button>
        ) : (
          <Button color={'red'} onClick={() => handleUnFollowClick()}>
            <FaPlusCircle className="w-5 h-5 mr-2" />
            {t('home.company.button.unfollow')}
          </Button>
        )}
      </div>
    </div>
  )
}
