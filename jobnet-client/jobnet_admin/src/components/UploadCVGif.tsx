import { useNavigate } from 'react-router-dom'
import gifImage from '../../src/assets/images/gif-upload-cv.gif'
import { useAppSelector } from '../app/hooks'
import { store } from '../app/store'

const UploadCVGif = () => {
  const navigate = useNavigate()
  const { auth } = useAppSelector(() => store.getState())

  const handleClickGifImage = () => {
    const path =
      auth.user?.role === 'JobSeeker'
        ? '../../jobseeker/resumes'
        : '../../signin'
    navigate(path)
  }

  return (
    <div
      className="fixed border cursor-pointer z-[999999] border-mainBorder rounded w-[60px] h-[101px] lg:w-[81px] lg:h-[122px] right-5 bottom-5 lg:right-10 lg:bottom-10"
      onClick={handleClickGifImage}
    >
      <img src={gifImage} alt="" className="w-full h-full rounded" />
    </div>
  )
}

export default UploadCVGif
