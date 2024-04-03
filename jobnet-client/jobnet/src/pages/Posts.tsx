import { useTranslation } from 'react-i18next'
import { Breadcrumb } from 'flowbite-react'
import { FaHouse } from 'react-icons/fa6'
import { IconType } from 'react-icons'

import UploadCVGif from '../components/UploadCVGif'

import PostsSearch from 'Post/PostsSearch'

import useTitlePage from '../hooks/useTitlePage'
export default function Posts(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.posts'))
  return (
    <>
      <div className="block pt-20">
        <Breadcrumb className="my-1 breadcrumb">
          <Breadcrumb.Item href="." icon={FaHouse as IconType}>
            Trang chủ
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/posts">Việc làm</Breadcrumb.Item>
        </Breadcrumb>
        <div className="">
          <PostsSearch />
          <UploadCVGif />
        </div>
      </div>
    </>
  )
}
