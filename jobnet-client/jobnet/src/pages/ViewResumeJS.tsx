import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCaretDown, FaCaretUp, FaHive } from 'react-icons/fa6'

import resumeService from 'User/Resume'
import recruiterService from 'User/Recruiter/services'
import EvaluationType, {
  CommentType,
  getEvaluationByAuth,
} from 'Post/Evaluation'

import ResumeType from '../types/resume'

import images from '../assets/images/admin.png'

const ViewResumeJS = () => {
  const [resume, setResume] = useState<ResumeType>()
  const [comments, setComments] = useState<EvaluationType[]>()
  const [file, setFile] = useState<string>()

  const { id } = useParams()
  useEffect(() => {
    id &&
      void (async () => {
        const data = await resumeService.getResumesById(id)
        const file = await resumeService.getResumeFile(id)
        const res = await getEvaluationByAuth(id)
        const url = URL.createObjectURL(file)
        setResume(data)
        setFile(url)
        setComments(res.map((item) => item))
      })()
  }, [id])

  return (
    <div>
      <div className="grid grid-cols-6 gap-x-2">
        <div className="h-screen col-span-4 bg-mainLower hover:bg-mainBorder">
          <iframe
            title="PDF Viewer"
            src={file}
            className="w-full h-full text-white"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>

        <div className="h-screen col-span-2 p-4 bg-gray-50">
          <div className="flex items-center gap-x-4">
            <div className="w-12 h-12 rounded-full">
              <img
                loading="lazy"
                src={images}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">{resume?.jobSeeker.name}</p>
              <p className="text-sm opacity-75">
                {resume?.jobSeeker.email || 'trongduc05032002@gmail.com'}
              </p>
            </div>
          </div>
          <hr className="my-3 bg-second" />
          <div className="flex items-center w-32 ml-auto"></div>

          <div className="flex flex-col">
            <div className="w-full flex flex-col gap-y-4 mt-2 overflow-y-scroll pr-2 h-[600px]">
              {comments?.map((item, key) => (
                <ItemRecruterCommented
                  key={key}
                  image={item.recruiter?.id}
                  name={item.recruiter?.name}
                  content={item.comments}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewResumeJS

type CommentDetails = {
  image: string
  name: string
  content?: CommentType[]
}

function ItemRecruterCommented({ image, name, content }: CommentDetails) {
  const [isShow, setIsShow] = useState(false)
  return (
    <>
      <div
        onClick={() => setIsShow(!isShow)}
        className="relative flex items-center p-3 transition-all rounded-lg cursor-pointer gap-x-4 bg-second-lower hover:bg-second"
      >
        <div className="w-12 h-12 border rounded-full border-main">
          <img
            loading="lazy"
            src={recruiterService.getRecruiterProfileImage(image)}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium">{name} đã đưa ra ý kiến!</p>
          <p className="text-xs opacity-75">Công ty TNHH Bigone</p>
        </div>
        <div className="absolute top-1 flex items-center left-[76px] gap-x-1">
          <p className="text-[10px] opacity-50">Recruiter</p>
          <FaHive className="text-xs text-main" />
        </div>
        <div className="ml-auto text-xl opacity-40">
          {isShow ? <FaCaretUp /> : <FaCaretDown />}
        </div>
      </div>
      <div>
        {isShow && (
          <div className="max-h-96 -mt-1 w-[80%] overflow-y-scroll ml-auto flex flex-col gap-y-6 pr-4">
            {content?.map((item) => (
              <ItemCommentDetail
                content={item.content}
                recruiterImage={image}
                dateCreated={item.createdAt}
                key={item.id}
                recruiterName={name}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

type CommentMoreDetail = {
  content: string
  dateCreated: string
  recruiterImage: string
  recruiterName: string
}
function ItemCommentDetail({
  content,
  dateCreated,
  recruiterImage,
  recruiterName,
}: CommentMoreDetail) {
  return (
    <div className="relative flex w-full transition-all ease-out gap-x-2">
      <div className="relative flex-1 p-2 transition-all rounded-lg bg-mainLower hover:bg-mainBorder">
        <div className="flex items-center gap-x-4">
          <div className="w-8 h-8 -translate-y-2 rounded-full">
            <img
              loading="lazy"
              src={recruiterService.getRecruiterProfileImage(recruiterImage)}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="mt-2 text-sm font-semibold">{recruiterName}</p>
            <span className="text-md">{content}</span>
          </div>
        </div>
      </div>
      <span className="absolute text-xs right-2 -bottom-4">{dateCreated}</span>
    </div>
  )
}