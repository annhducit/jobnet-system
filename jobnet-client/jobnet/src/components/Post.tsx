import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
//review: ko import được
// import { differenceInDays, parse } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

import useIsInWishlist from '../hooks/useIsInWishlist'

import business from '../../src/assets/images/business.png'


import Button from 'Common/Button'
import Tag from 'Common/Tag'

import PostType from 'Post/type'
import {getBusinessProfileImage} from 'Business/services'

export default function Post({
  post,
  navigateTo,
}: {
  post: PostType
  navigateTo: string
}): JSX.Element {
  const { t } = useTranslation()

  const auth = useSelector((state: RootState) => state.auth)
  const role = auth.user?.role

  const { isInWishlist, addToWishlist } = useIsInWishlist(post.id)
  const navigate = useNavigate()
  //review
  // const remainingApplicationDays = differenceInDays(
  //   new Date(parse(post.applicationDeadline, 'dd/MM/yyyy', new Date())),
  //   new Date()
  // )

  return (
    <div className="px-4 py-6 space-y-6 transition rounded md:space-y-4 md:px-6 bg-second-lower hover:bg-second-lower">
      <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
        <div className="flex justify-center flex-none">
          <img
            src={
              post.business.profileImageId
                ? getBusinessProfileImage(post.business.id)
                : business
            }
            className="object-cover w-16 h-16 border-2 rounded border-second"
          />
        </div>

        <div className="flex flex-col justify-between grow">
          <div className="flex flex-col items-center justify-between gap-2 sm:gap-4 sm:flex-row">
            <h4
              className="overflow-hidden text-lg font-bold grow"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              <Link
                className="transition-all cursor-pointer hover:text-main"
                to={`/posts/${post.id}`}
              >
                {post.title}
              </Link>
            </h4>

            <div className="flex items-center justify-between flex-none gap-6">
              <div className="font-semibold">
                {post.minSalaryString} - {post.maxSalaryString}
              </div>
              {role === 'JobSeeker' && (
                <div
                  className="text-xl transition cursor-pointer text-rose-500 hover:text-rose-700"
                  onClick={addToWishlist}
                >
                  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                </div>
              )}
              <Button onClick={() => navigate(navigateTo)} size="sm">
                {t('post.button.detail')}
              </Button>
            </div>
          </div>

          <div>
            <Link
              to={`/businesses/${post.business.id}`}
              className="hover:text-main hover:underline opacity-80 hover:opacity-100"
              preventScrollReset={true}
            >
              {post.business.name}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 md:gap-0 sm:flex-row">
        <div className="flex flex-wrap justify-start gap-2 md:gap-4">
          {post.locations.map((location) => (
            <Tag>{location.provinceName}</Tag>
          ))}
          <Tag>{t('post.tag.new')}</Tag>
          <Tag>
            {/* review */}
            {/* {t('post.tag.remainingDays', { number: remainingApplicationDays })}{' '} */}
          </Tag>
        </div>

        <div className="flex-none text-sm italic text-second-upper text-end">
          {t('post.updatedOn', { date: '06/07/2023' })}
        </div>
      </div>
    </div>
  )
}
