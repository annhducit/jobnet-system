import React from 'react'
import { useTranslation } from 'react-i18next'
import { Params } from 'react-router-dom'
import { useLoaderData, useParams } from 'react-router-dom'
import { Breadcrumb } from 'flowbite-react'
import { FaHouse } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import { getPostById } from 'Post/services'
import PostType from 'Post/type'

import resumeService from 'User/Resume'
import Post from 'Post/Post'

import ResumeType from '../types/resume'
import UploadCVGif from '../components/UploadCVGif'
import useTitlePage from '../hooks/useTitlePage'

interface PostDetailsLoader {
  post: PostType
  resumes: Array<ResumeType> | null
}

PostDetails.loader = async function ({
  params,
}: {
  params: Params
}): Promise<PostDetailsLoader> {
  const id = params.id as string
  const post = await getPostById(id)
  const resumes = await resumeService.getResumesByAuth()
  return { post, resumes }
}

export default function PostDetails(): React.ReactElement {
  const loader = useLoaderData() as PostDetailsLoader
  const { t } = useTranslation()
  useTitlePage(loader.post.title || t('pageTitle.postDetail'))

  const params = useParams()
  const id = params.id as string
  return (
    <>
      <div className="space-y-4 bg-white layout-post">
        <Breadcrumb>
          <Breadcrumb.Item href="." icon={FaHouse as IconType}>
            Trang chủ
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/posts">Việc làm</Breadcrumb.Item>
          <Breadcrumb.Item>
            {loader.post.title || 'Detail post'}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Post loader={loader} id={id} />
      </div>
      <UploadCVGif />
    </>
  )
}
