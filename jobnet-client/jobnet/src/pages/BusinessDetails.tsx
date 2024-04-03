import { Params, useLoaderData } from 'react-router-dom'
import { FaHouse } from 'react-icons/fa6'
import { Breadcrumb } from 'flowbite-react'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons'

import { getPosts } from 'Post/services'
import PostType from 'Post/type'
import HiringPosts from 'Post/HiringPosts'

import Business from 'Business/components/Business'

import type PaginationType from '../types/pagination'
import UploadCVGif from '../components/UploadCVGif'
import useTitlePage from '../hooks/useTitlePage'

import businessService from '../services/businessService'
interface BusinessDetailsLoader {
  business: BusinessType
  hiringPostsPagination: PaginationType<PostType>
}

BusinessDetails.loader = async function ({
  params,
}: {
  params: Params
}): Promise<BusinessDetailsLoader> {
  const businessId = params.id as string
  const business = await businessService.getBusinessById(businessId)
  const hiringPostsPagination = await getPosts({
    businessId: params.id,
    activeStatus: 'Opening',
    isExpired: false,
  })
  return { business, hiringPostsPagination }
}

export default function BusinessDetails(): JSX.Element {
  const { business, hiringPostsPagination } =
    useLoaderData() as BusinessDetailsLoader

  const { t } = useTranslation()
  useTitlePage(business.name || t('pageTitle.company'))
  return (
    <div className="space-y-8 layout-business">
      <Breadcrumb className="my-1 breadcrum-business">
        <Breadcrumb.Item href="." icon={FaHouse as IconType}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/posts">Công ty</Breadcrumb.Item>
        <Breadcrumb.Item>{business.name || 'Detail business'}</Breadcrumb.Item>
      </Breadcrumb>
      <Business business={business} />
      <HiringPosts
        businessId={business.id}
        hiringPostsPagination={hiringPostsPagination}
      />

      <UploadCVGif />
    </div>
  )
}
