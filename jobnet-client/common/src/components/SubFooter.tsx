import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa6'

const SubFooter = () => {
  return (
    <div className="flex flex-col items-center self-stretch justify-center w-full py-6 shadow-sm sub-footer max-md:max-w-full max-md:mt-10 max-md:px-5">
      <span className="flex items-stretch justify-between w-full gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="text-sm leading-5 text-gray-500 grow shrink basis-auto">
          @ 2024 Double2D - Job Portal. All rights Rserved
        </div>
        <div className="flex gap-5 mx-auto text-xl lg:items-stretch lg:mx-0">
          <FaFacebook className="text-[#1877F2]" />
          <FaYoutube className="text-[#FF0000]" />
          <FaLinkedin className="text-[#0a66c2]" />
          <FaTwitter className="text-[#1DA1F2]" />
        </div>
      </span>
    </div>
  )
}

export default SubFooter
