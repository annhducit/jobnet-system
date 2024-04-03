import { FaHive, FaRegPaperPlane, FaTrash } from 'react-icons/fa6'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Badge } from 'flowbite-react'
import { useSelector } from 'react-redux'

import resumeService from '../services/resumeService'
import evaluationService from '../services/evaluationService'
import recruiterService from '../services/recruiterService'

import ResumeType from '../types/resume'
import EvaluationType, { CommentType } from '../types/evaluation'

import images from '../assets/images/admin.png'

import Textarea from 'Common/input/Textarea'

import { RootState } from '../app/store'

const ViewResumeRC = () => {
  const [resume, setResume] = useState<ResumeType>()
  const [comments, setComments] = useState<EvaluationType[]>()
  const [file, setFile] = useState<string>()
  const [revaluetionId, setRevaluetionId] = useState<string>()

  const { id } = useParams()

  const auth = useSelector((state: RootState) => state.auth)

  const handleCreateEvaluation = (content: string | undefined) => {
    if (!content) {
      toast.error('Comment không được để trống!', {
        position: 'top-left',
      })
    }
    id &&
      void (async () => {
        const res = await evaluationService.getEvaluationByAuth(id)
        setRevaluetionId(res.map((item) => item.id).toString())

        revaluetionId
          ? await evaluationService.createComment(revaluetionId, content)
          : await evaluationService.createEvaluation(id, content)

        const data = await evaluationService.getEvaluationByAuth(id)
        setComments(data.map((item) => item))
      })()
  }

  const handleDeleteEvaluation = useCallback(
    (evaluationId: string) => {
      id &&
        void (async () => {
          await evaluationService.deleteEvaluation(evaluationId)
          const data = await evaluationService.getEvaluationByAuth(id)
          setComments(data.map((item) => item))
        })()
    },
    [id]
  )

  const handleDeleteComment = (evaluationId: string, commentId: string) => {
    id &&
      void (async () => {
        await evaluationService.deleteComment(evaluationId, commentId)
        const data = await evaluationService.getEvaluationByAuth(id)
        setComments(data.map((item) => item))
      })()
  }

  useEffect(() => {
    id &&
      void (async () => {
        const data = await resumeService.getResumesById(id)
        const file = await resumeService.getResumeFile(id)
        const res = await evaluationService.getEvaluationByAuth(id)
        const url = URL.createObjectURL(file)
        setResume(data)
        setFile(url)
        setComments(res.map((item) => item))
        setRevaluetionId(res.map((item) => item.id).toString())
      })()
  }, [id, handleDeleteEvaluation])

  return (
    <div className="grid grid-cols-4 gap-x-2">
      <div className="h-screen col-span-3 bg-second">
        <iframe
          title="PDF Viewer"
          src={file}
          className="w-full h-full text-white bg-second-lower"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      </div>

      <div className="h-screen col-span-1 p-4 bg-gray-50">
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
        <div className="flex items-center w-32 ml-auto">
          <Badge
            className="text-white transition-all bg-red-500 rounded cursor-pointer hover:bg-red-600 hover:text-white"
            onClick={() =>
              revaluetionId && handleDeleteEvaluation(revaluetionId)
            }
          >
            Xóa tất cả bình luận
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <div className="w-full  flex flex-col gap-y-10 pt-6 mt-2 overflow-y-scroll pr-2 h-[450px]">
            {comments?.map((item, key) => (
              <ItemComment
                id={item.id}
                key={key}
                image={item.recruiter?.id}
                name={item.recruiter?.name}
                content={item.comments}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </div>
          <div>
            <WriteComment
              handleComment={handleCreateEvaluation}
              recruiterId={auth.user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewResumeRC

type CommentDetails = {
  id: string
  image: string
  name: string
  content?: CommentType[]
  handleDeleteComment: (revaluationId: string, commmentId: string) => void
}
function ItemComment({
  id,
  image,
  name,
  content,
  handleDeleteComment,
}: CommentDetails) {
  return (
    <>
      {content?.map((item, index) => (
        <div
          className="relative flex w-full transition-all ease-out gap-x-2 group"
          key={index}
        >
          <div className="w-10 h-10 -translate-y-6 border rounded-full border-main">
            <img
              loading="lazy"
              src={recruiterService.getRecruiterProfileImage(image)}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="relative flex-1 p-2 transition-all rounded-lg bg-mainLower hover:bg-mainBorder">
            <p className="mt-2 text-sm font-semibold">
              {name}
              <div className="absolute top-0 flex items-center left-2 gap-x-1">
                <p className="text-[10px] opacity-50">Recruiter</p>
                <FaHive className="text-xs text-main" />
              </div>
            </p>
            <span className="text-md">{item.content}</span>
          </div>
          <span className="absolute text-xs right-2 -bottom-4">
            {item.createdAt}
          </span>
          <div
            className="relative"
            onClick={() => handleDeleteComment(id, item.id)}
          >
            <div className="absolute hidden p-2 text-xs text-red-700 transition-all rounded-full cursor-pointer show hover:bg-slate-300 right-3 top-1">
              <FaTrash />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

function WriteComment({
  handleComment,
  recruiterId,
}: {
  handleComment: (content: string | undefined) => void
  recruiterId: string | undefined
}) {
  const [comment, setComment] = useState<string>()
  return (
    <div className="flex py-4 mt-2 gap-x-2">
      <div className="w-10 h-10 -translate-y-5 border rounded-full">
        <img
          loading="lazy"
          src={recruiterService.getRecruiterProfileImage(recruiterId)}
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="relative">
          <Textarea
            cols={5}
            rows={3}
            onResize={undefined}
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            placeholder="Enter your comment"
          ></Textarea>
          <span
            onClick={() => {
              handleComment(comment), setComment('')
            }}
            className="absolute p-2 text-xl rounded-full bottom-2 right-2 text-main hover:cursor-pointer hover:bg-slate-300"
          >
            <FaRegPaperPlane />
          </span>
        </div>
      </div>
    </div>
  )
}
