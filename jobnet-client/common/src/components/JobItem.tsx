import { Link, useNavigate } from 'react-router-dom'
import useIsInWishlist from '../hooks/useIsInWishlist'
import PostType from '../types/post'
import businessProfile from '../assets/images/business-main-profile.png'
import { FaBookmark, FaLocationDot, FaRegBookmark } from 'react-icons/fa6'

const JobItem = ({ data }: { data: PostType }) => {
  const { isInWishlist, addToWishlist } = useIsInWishlist(data.id)
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`../../posts/${data.id}`)}
      className="items-stretch hover:border-main transition-all hover:bg-slate-50 cursor-pointer border border-[color:var(--Gray-100,#E4E5E8)] shadow-sm bg-white flex max-w-[600px] flex-col lg:p-6 p-4 rounded-lg border-solid"
    >
      <Link
        to={`../../posts/${data.id}`}
        className="w-64 text-lg font-medium leading-7 truncate hover:underline hover:text-main text-zinc-900 lg:w-96 whitespace-nowrap"
      >
        {data.title || 'Junior Graphic Designer'}
      </Link>
      <span className="items-stretch flex justify-between gap-2 mt-1.5">
        <span className="items-stretch justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase bg-[#E7F6EA] rounded">
          {data.workingFormat || 'Internship'}
        </span>
        <div className="text-sm leading-5 text-gray-500 grow shrink basis-auto">
          {/* {data.minSalary && data.minSalary?.length > 3 ? '10' : data.minSalary}
          tr -{' '}
          {data.maxSalary && data.maxSalary?.length > 3 ? '20' : data.maxSalary}
          tr */}
          $800 - $2,500
        </div>
      </span>
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="w-12 h-12 rounded-sm border-mainBorder">
          <img
            loading="lazy"
            src={`http://localhost:3012${businessProfile}`}
            className="object-contain w-full h-full rounded-sm"
          />
        </div>
        <span className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <Link
            to={`../../businesses/${data.business?.id}`}
            className="w-48 text-base font-medium leading-6 truncate lg:w-64 hover:text-main hover:underline text-zinc-900 whitespace-nowrap"
          >
            {data.business?.name || ' Google Inc.'}
          </Link>
          <span className="flex items-center justify-between gap-1 mt-1">
            <FaLocationDot className="text-main" />
            <div className="self-stretch text-sm leading-5 text-gray-500 grow whitespace-nowrap">
              {data.locations.map((item) => item.provinceName)}
            </div>
          </span>
        </span>
        <div
          className="p-2 transition-all rounded cursor-pointer hover:bg-slate-200"
          onClick={(e) => {
            addToWishlist(), e.stopPropagation()
          }}
        >
          {' '}
          {isInWishlist ? (
            <FaBookmark className="text-main" />
          ) : (
            <FaRegBookmark className="text-gray-500" />
          )}
        </div>
      </div>
    </div>
  )
}

export default JobItem
