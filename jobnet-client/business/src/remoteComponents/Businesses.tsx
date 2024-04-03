import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import useScroll from '../hooks/useScroll'

import BusinessItemSkeleton from 'Common/skeleton/BusinessItem'
import Pagination from 'Common/Pagination'
import Button from 'Common/Button'

import businessBackground from '../assets/images/business-profile.png'
import businessProfle from '../assets/images/business-main-profile.png'
import imageSector from '../assets/images/list-business.png'

import businessService from '../services/businessService'

import type BusinessType from '../types/business'
import type PaginationType from '../types/pagination'

export default function Businesses() {
  const { t } = useTranslation()
  const { scrollIntoView, scrollIntoViewRef } = useScroll()
  const setEmptyBusinessElms = () => {
    setElms(
      Array.from({ length: 3 }, (_, i) => <BusinessItemSkeleton key={i} />)
    )
  }

  const [businessPagination, setBusinessPagination] = useState<
    PaginationType<BusinessType>
  >({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    data: [],
  })

  const [businessesElms, setElms] = useState<JSX.Element[]>(() =>
    Array.from({ length: 3 }, (_, i) => <BusinessItemSkeleton key={i} />)
  )

  const setBusinessElms = (data: PaginationType<BusinessType>) => {
    setBusinessPagination(data)
    setElms(
      data.data.map((business) => (
        <BusinessItem key={business.id} business={business} />
      ))
    )
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await businessService.getBusinesses()
      setBusinessElms(data)
    }
    loadData().catch((err) => {
      console.log(err)
    })
  }, [])

  const [search, setSearch] = useState('')

  const handlePageChange = (page: number) => {
    void (async () => {
      setEmptyBusinessElms()
      try {
        const pagination = await businessService.getBusinesses({ page })
        setBusinessElms(pagination)
        scrollIntoView()
      } catch (err) {
        console.error('An error occured', err)
      } finally {
        // dispatch(setLoading(false))
      }
    })()
  }

  const handleSearchBusiness = () => {
    void (async () => {
      setEmptyBusinessElms()
      try {
        const pagination = await businessService.getBusinesses({
          name: search,
        })
        setBusinessElms(pagination)
        scrollIntoView()
      } catch (err) {
        console.error('An error occured', err)
      }
    })()
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 h-[350px] items-center justify-between bg-search-footer">
        <div className="flex flex-col justify-center business-list gap-y-5">
          <h2 className="text-3xl font-bold">{t('business.title')}</h2>
          <h3 className="font-bold">{t('business.subTitle')}</h3>
          <p className="">{t('business.desc')}</p>
          <div className="inline-flex items-center lg:max-w-lg lg:px-[10px] py-1 lg:py-2 lg:mt-6 mt-2 bg-white rounded-full">
            <div className="flex items-center grow">
              <div className="pl-4 text-lg opacity-50">
                <FaSearch />
              </div>
              <input
                className="w-full ml-4 bg-transparent outline-none placeholder:text-second"
                placeholder={t('business.searchBar.inputHolder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              className="mr-1 leading-none rounded-full lg:ml-4 lg:mr-0"
              color="main"
              onClick={handleSearchBusiness}
            >
              {t('business.searchBar.button')}
            </Button>
          </div>
        </div>
        <div className="w-[450px] h-[304px] object-cover  image-sector  mx-auto">
          <img
            loading="lazy"
            src={`http://localhost:3012${imageSector}`}
            className="w-full h-full "
          />
        </div>
      </div>
      <main ref={scrollIntoViewRef} className="px-3 pt-2 lg:pt-6">
        <h1 className="p-4 text-xl font-bold text-center uppercase opacity-70">
          {t('business.topBussinesses')}
        </h1>
        <div className="grid grid-cols-1 pt-5 business-list lg:gap-5 lg:gap-y-5 gap-y-5 lg:grid-cols-3 content">
          {businessesElms}
        </div>
      </main>
      <div className="flex items-center justify-center gap-2 my-10">
        <Pagination
          currentPage={businessPagination.currentPage}
          totalPages={businessPagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

function BusinessItem({ business }: { business: BusinessType }): JSX.Element {
  return (
    <div className="w-full h-[420px] overflow-hidden bg-cover bg-no-repeat bg-second-lower rounded-lg relative shadow-md cursor-pointer hover:bg-second transition-all">
      <div className="w-full h-[210px] rounded-lg">
        <img
          loading="lazy"
          src={`http://localhost:3012${businessBackground}`}
          className="object-top w-full h-full transition duration-300 ease-in-out rounded-tl-lg rounded-tr-lg hover:scale-105"
        />
      </div>
      <div className="w-[90px] absolute h-[90px] left-0 right-0 top-40  mx-auto mb-0 rounded-md">
        <img
          loading="lazy"
          src={`http://localhost:3012${businessProfle}`}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="flex flex-col px-3 pb-6 lg:mt-12 lg:px-6">
        <Link
          to={`${business.id}`}
          className="inline-block text-lg font-bold truncate hover:underline hover:text-main"
        >
          {business.name}
        </Link>
        <div
          className="w-full h-full mt-4 multiline-ellipsis"
          dangerouslySetInnerHTML={{ __html: business.description }}
        ></div>
      </div>
    </div>
  )
}
