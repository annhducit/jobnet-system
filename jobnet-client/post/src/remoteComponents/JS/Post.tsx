import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FileInput, Modal, Table } from 'flowbite-react'
import {
  FaBusinessTime,
  FaCertificate,
  FaCircleDollarToSlot,
  FaClock,
  FaHourglassStart,
  FaIndustry,
  FaLocationDot,
  FaLock,
  FaPeopleGroup,
  FaPhone,
  FaRankingStar,
  FaUserGroup,
} from 'react-icons/fa6'
import { AiOutlineFileSearch } from 'react-icons/ai'
import clns from 'classnames'
import { useTranslation } from 'react-i18next'

import useIsInWishlist from '../../hooks/useIsInWishlist'
import useModal from '../../hooks/useModal'
import useScroll from '../../hooks/useScroll'

import applicationService from '../../services/applicationService'
import resumeService from '../../services/resumeService'
import businessService from '../../services/businessService'
import postService from '../../services/postService'

import businessProfile from '../../assets/images/business-main-profile.png'

import Selection from 'Common/input/Selection'
import Button from 'Common/Button'
import Pagination from 'Common/Pagination'
import EmptyData from 'Common/EmptyData'
import JobItem from 'Common/JobItem'
import ItemPostHeading from 'Common/ItemPostHeading'
import { setLoad } from 'Common/setLoad'
import { getAuth } from 'Common/auth'
import JobItemSkeleton from 'Common/skeleton/JobItem'

import PostType from '../../types/post'
import PaginationType from '../../types/pagination'
import ResumeType from '../../types/resume'
import ErrorType from '../../types/error'
import { BusinessTypeMF } from '../../types/business'

export default function Post({
  loader,
}: {
  loader: { post: PostType; resumes: ResumeType[] }
  id: string
}): React.ReactElement {
  const params = useParams()

  const { t } = useTranslation()
  const { modal, openModal, closeModal } = useModal()

  const user = getAuth().user

  const post = loader.post

  const { scrollIntoView, scrollIntoViewRef } = useScroll()

  const skeletonPosts = () =>
    Array.from({ length: 3 }, (_, i) => <JobItemSkeleton key={i} />)

  //state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [similarPostsPagination, setSimilarPostsPagination] = useState<
    PaginationType<PostType>
  >({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    data: [],
  })
  const [param, setParams] = useState<{
    page?: number
    isExpired?: boolean
    activeStatus?: string
  }>({
    isExpired: false,
    activeStatus: 'Opening',
  })
  const [similarPostElms, setSimilarPostElms] =
    useState<JSX.Element[]>(skeletonPosts)

  //fetch first data
  useEffect(() => {
    if (user?.role === 'JobSeeker') {
      const fetchData = async () => {
        const id = params.id as string

        const isSubmitted = await applicationService.isSubmitted(id)
        setIsSubmitted(isSubmitted)
      }
      fetchData().catch(() => {
        toast.error('Fail to load data')
      })
    }
  }, [])

  //fetch new data when param updated
  useEffect(() => {
    setSimilarPostElms(skeletonPosts)
    const fetchData = async () => {
      const data: PaginationType<PostType> = await postService.getPosts(param)
      const elms = data?.data?.map((post) => (
        <JobItem key={post.id} data={post} />
      ))
      setSimilarPostElms(elms)
      setSimilarPostsPagination(data)
    }
    fetchData().catch(() => {
      toast.error('Fail to load data')
    })
  }, [param])

  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    })
  }, [params.id])

  const handlePageChange = (page: number) => {
    setParams({
      page,
      isExpired: false,
      activeStatus: 'Opening',
    })
    scrollIntoView()
  }

  return (
    <>
      <div className="space-y-8">
        <PostDetailsInfo
          post={post}
          isSubmitted={isSubmitted}
          openModal={openModal}
        />

        <div className="flex justify-center">
          <div ref={scrollIntoViewRef} className="w-full py-6 bg-white rounded">
            <div className="space-y-6">
              <div className="item-flex">
                <div className="flex items-center">
                  <div className="text-2xl">
                    <AiOutlineFileSearch />
                  </div>
                  <div className="ml-2 font-semibold">
                    {t('postDetails.requirements.sameJob')}:{' '}
                    <span className="underline text-main">
                      {similarPostsPagination.totalElements}
                    </span>{' '}
                    {t('postDetails.requirements.job')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-semibold" htmlFor="sortBy">
                    {t('postDetails.requirements.sort.title')}:
                  </label>
                  <Selection
                    id="sortBy"
                    name="sortBy"
                    className="cursor-pointer w-44"
                    options={[
                      {
                        id: 'createdAt',
                        name: t('postDetails.requirements.sort.createAt'),
                      },
                      {
                        id: 'salary',
                        name: t('postDetails.requirements.sort.salary'),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="list-post">
                {similarPostElms.length ? similarPostElms : <EmptyData />}
              </div>
              <Pagination
                currentPage={similarPostsPagination.currentPage}
                totalPages={similarPostsPagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <ApplicationModal
        modal={modal}
        openModal={openModal}
        closeModal={closeModal}
        loader={loader}
      />
    </>
  )
}

export function PostDetailsInfo({
  type = 'View',
  post,
  isSubmitted,
  openModal = () => undefined,
  handleClickUpdateHeading,
  handleClickUpdateGeneral,
  handleClickUpdateDetails,
}: {
  type?: 'View' | 'Update' | 'Admin' | 'Preview'
  post: PostType
  isSubmitted?: boolean
  openModal?: (id: string) => void
  handleClickUpdateHeading?: () => void
  handleClickUpdateGeneral?: () => void
  handleClickUpdateDetails?: () => void
}): React.ReactElement {
  const navigate = useNavigate()

  const [business, setBusiness] = useState<BusinessTypeMF>()
  const { t } = useTranslation()

  const user = getAuth().user

  const { isInWishlist, addToWishlist } = useIsInWishlist(post.id)

  useEffect(() => {
    void (async () => {
      const data = await businessService.getBusinessById(post.business.id)
      setBusiness(data)
    })()
  }, [post.business.id])

  return (
    <div className="space-y-4">
      <PostDetailsSection>
        <div className="col-span-1 p-6 border rounded bg-second-lower">
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <img
                src={`http://localhost:3011${businessProfile}`}
                className="object-cover w-24 h-24 border rounded border-second-lower"
              />
              <h2 className="text-lg font-semibold">{post.business?.name}</h2>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-4">
                <div className="flex items-center gap-x-4">
                  <FaUserGroup className="text-main" />
                  <span className="w-20 font-semibold">
                    {t('postDetails.BusinessInfor.scale.title')}:
                  </span>
                </div>
                <p>
                  {t('postDetails.BusinessInfor.scale.total', {
                    total: business?.employeeQuantity,
                  })}
                </p>
              </div>
              <div className="flex gap-x-4">
                <div className="flex items-center gap-x-4">
                  <FaLocationDot className="text-main" />
                  <span className="w-20 font-semibold">
                    {t('postDetails.BusinessInfor.address')}:
                  </span>
                </div>
                {post.locations
                  ?.slice(0, 1)
                  .map((location, i) => <p key={i}>{location.provinceName}</p>)}
              </div>
            </div>
            {type !== 'Preview' && (
              <Link
                to={`/businesses/${post.business?.id}`}
                className="font-semibold text-center text-main hover:underline"
              >
                {t('postDetails.BusinessInfor.viewDetailBusiness')}
              </Link>
            )}
          </div>
        </div>

        <div className="p-6 col-span-2 h-[auto] border rounded bg-second-lower">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl font-bold">{post?.title}</h1>
            <div className="favorite-job_page gap-y-10 gap-x-4">
              <ItemPostHeading
                icon={<FaIndustry />}
                title={t('postDetails.aboutJob.industry')}
                content={post?.profession?.name}
                size="large"
              />
              <ItemPostHeading
                icon={<FaHourglassStart />}
                title={t('postDetails.aboutJob.experience')}
                content={post?.yearsOfExperience}
                size="large"
              />
              <ItemPostHeading
                icon={<FaCircleDollarToSlot />}
                title={t('postDetails.aboutJob.salary')}
                content={`${post?.minSalaryString} - ${post?.maxSalaryString}`}
                size="large"
              />
              <ItemPostHeading
                icon={<FaPeopleGroup />}
                title={t('postDetails.aboutJob.numberApply')}
                content={`${post?.requisitionNumber} người`}
                size="large"
              />
            </div>
            <span className="flex items-center px-2 mt-4 rounded application-deadline gap-x-2">
              <FaClock className="text-main" />
              <span>
                {t('postDetails.aboutJob.appDeadline', {
                  deadline: post?.applicationDeadline,
                })}
              </span>
            </span>
            {type === 'Update' && (
              <Button className="ml-auto" onClick={handleClickUpdateHeading}>
                Cập nhật
              </Button>
            )}
            {type !== 'Preview' && (
              <div className="flex items-center pt-4 gap-x-2">
                {type === 'View' && (
                  <Button
                    disabled={isSubmitted}
                    className="flex-1"
                    onClick={() => {
                      user?.role === 'JobSeeker'
                        ? openModal('application-modal')
                        : (() => {
                            toast.info(
                              'Please signin to access this feature😄',
                              {
                                delay: 300,
                              }
                            )
                            navigate('../../../signin')
                          })()
                    }}
                  >
                    {isSubmitted
                      ? t('postDetails.aboutJob.button.apply.js.applied')
                      : t('postDetails.aboutJob.button.apply.js.notApply')}
                  </Button>
                )}
                {type === 'Admin' && post.activeStatus === 'Pending' && (
                  <Button
                    className="w-40 ml-auto"
                    color={'warning'}
                    onClick={() => openModal('approval-post')}
                  >
                    Xét duyệt
                  </Button>
                )}
                {type === 'Admin' &&
                  !['Pending', 'Blocked', 'Rejected'].includes(
                    post.activeStatus
                  ) && (
                    <Button
                      className="w-40 ml-auto"
                      color={'red'}
                      onClick={() => openModal('lock-post-modal')}
                    >
                      <FaLock className="mr-2" />
                      Khóa bài đăng
                    </Button>
                  )}

                {type === 'View' && (
                  <Button
                    className={clns('border flex-2', {
                      'text-white bg-red-600 hover:border-red-700':
                        isInWishlist,
                      'border-main hover:border-main-upper hover:bg-second-lower':
                        !isInWishlist,
                    })}
                    color="empty"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      addToWishlist(), e.stopPropagation()
                    }}
                  >
                    {!isInWishlist
                      ? t('postDetails.aboutJob.button.save')
                      : t('postDetails.aboutJob.button.unsave')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </PostDetailsSection>

      <PostDetailsSection>
        <div
          className={clns('col-span-1 p-6 rounded', {
            'bg-second-lower border h-auto':
              type === 'Update' || type === 'Preview',
            'bg-white border': type !== 'Update',
          })}
        >
          <div className="flex items-center gap-x-4">
            <p className="h-8 w-[6px] bg-main"></p>
            <h1 className="text-lg font-semibold">
              {t('postDetails.requirements.title')}:
            </h1>
          </div>
          <div className="flex flex-col pt-4 gap-y-6">
            <ItemPostHeading
              icon={<FaCertificate />}
              title={t('postDetails.requirements.degree')}
              content="University/College"
            />
            <ItemPostHeading
              icon={<FaRankingStar />}
              title={t('postDetails.requirements.level')}
              content="Nhân viên"
            />
            <ItemPostHeading
              icon={<FaBusinessTime />}
              title={t('postDetails.requirements.workForm')}
              content={post.workingFormat}
            />

            <ItemPostHeading
              icon={<FaPhone />}
              title={t('postDetails.requirements.contact')}
              content="0325642558"
            />
            <ItemPostHeading
              type="list"
              icon={<FaLocationDot />}
              title={t('postDetails.requirements.location')}
              content={post.locations?.map((location, index) => (
                <li key={index}>
                  {`${location.specificAddress} ${location.provinceName}`}
                  {index !== post.locations.length - 1 && <br />}
                </li>
              ))}
            />
          </div>
          {type === 'Update' && (
            <div className="block float-right pt-6">
              <Button onClick={handleClickUpdateGeneral}>Cập nhật</Button>
            </div>
          )}
        </div>

        <div
          className={clns('w-full col-span-2 p-6', {
            'bg-second-lower border': type === 'Update' || type === 'Preview',
            'bg-white border': type !== 'Update',
          })}
        >
          <div className="flex items-center gap-x-4">
            <p className="h-8 w-[6px] bg-main"></p>
            <h2 className="text-xl font-bold">
              {t('postDetails.requirements.detail')}
            </h2>
          </div>
          <div className="flex flex-col gap-y-6">
            <div
              className="flex flex-col pt-4 gap-y-3"
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></div>
            {type === 'View' && (
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-4">
                  <p className="h-8 w-[6px] bg-main"></p>
                  <h3 className="text-lg font-semibold">
                    {t('postDetails.requirements.instructApply.title')}
                  </h3>
                </div>
                <p>{t('postDetails.requirements.instructApply.subTitle')}</p>
                <div className="flex items-center gap-x-2">
                  <Button>
                    {t('postDetails.aboutJob.button.apply.js.notApply')}
                  </Button>

                  <Button
                    className="border flex-2 border-main hover:border-main-upper hover:bg-second-lower"
                    color="empty"
                  >
                    {t('postDetails.aboutJob.button.save')}
                  </Button>
                </div>
              </div>
            )}
            {type === 'Update' && (
              <div className="ml-auto">
                <Button onClick={handleClickUpdateDetails}>Cập nhật</Button>
              </div>
            )}
          </div>
        </div>
      </PostDetailsSection>
    </div>
  )
}

function PostDetailsSection({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-4 gap-y-2">
      {children}
    </div>
  )
}

function ApplicationModal({
  modal,
  openModal,
  closeModal,
  loader,
}: {
  modal: string | undefined
  openModal: (id: string) => void
  closeModal: () => void
  loader: { post: PostType; resumes: ResumeType[] }
}): React.ReactElement {
  const { t } = useTranslation()

  const [{ resumes, dialog, selectedResumeIndex, file }, setApplicationModal] =
    useState({
      resumes: loader?.resumes as ResumeType[] | null,
      dialog: undefined as 'resume-selection' | 'resume-creation' | undefined,
      selectedResumeIndex: undefined as number | undefined,
      file: undefined as File | undefined,
    })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApplicationModal((prev) => ({
      ...prev,
      file: e.target.files?.[0],
    }))

  const handleFileUpload = () => {
    if (!file) {
      toast.error(t('toast.applyCV.noneFileUpload'))
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    void (async () => {
      closeModal()
      setLoad(true)

      try {
        const resume = await resumeService.createResume(formData)
        setApplicationModal((prev) => ({
          ...prev,
          resumes: [...(prev.resumes as ResumeType[]), resume],
          selectedResumeIndex: (prev.resumes?.length ?? 0) + 1,
          file: undefined,
        }))
        toast.success(t('toast.applyCV.uploadCVSucess'))
      } catch (err) {
        openModal('application-modal')
        toast.error((err as ErrorType).message)
      } finally {
        setLoad(false)
      }
    })()
  }

  const handleApplicationSubmit = () => {
    if (selectedResumeIndex === undefined) {
      toast.error(t('toast.applyCV.noCVSelected'))
      return
    }

    const formData = new FormData()
    formData.append('postId', loader.post.id)
    resumes && formData.append('resumeId', resumes[selectedResumeIndex].id)
    console.log(formData)

    void (async () => {
      closeModal()
      setLoad(true)

      try {
        await applicationService.createApplication(formData)
        toast.success(t('toast.applyCV.applied'))
      } catch (err) {
        openModal('application-modal')
        toast.error('An error occurred.')
      } finally {
        setLoad(false)
      }
    })()
  }

  const handleViewClick = (resumeId: string) => {
    void (async () => {
      closeModal()
      setLoad(true)

      try {
        const pdfBlob = await resumeService.getResumeFile(resumeId)
        const pdfBlobURL = URL.createObjectURL(pdfBlob)
        window.open(pdfBlobURL)
      } catch (err) {
        openModal('application-modal')
        toast.error((err as ErrorType).message)
      } finally {
        setLoad(false)
      }
    })()
  }

  const resumeElms = resumes?.map((resume, i) => (
    <Table.Row key={resume.id}>
      <Table.Cell>{i + 1}</Table.Cell>
      <Table.Cell>{resume.createdAt}</Table.Cell>
      <Table.Cell className="flex items-center gap-2">
        <Button
          size="xs"
          color="cyan"
          onClick={() => handleViewClick(resume.id)}
        >
          {t('postDetails.modal.applyJob.button.viewCV')}
        </Button>
        <Button
          size="xs"
          color="main"
          onClick={() =>
            setApplicationModal((prev) => ({
              ...prev,
              selectedResumeIndex: i,
              dialog: undefined,
            }))
          }
        >
          {t('postDetails.modal.applyJob.button.choseCV')}
        </Button>
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <Modal show={modal === 'application-modal'} onClose={closeModal}>
      <Modal.Header className="text-xl text-white bg-white">
        {t('postDetails.modal.applyJob.title')}
      </Modal.Header>
      <Modal.Body className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="font-semibold">
              {t('postDetails.modal.applyJob.selectCV.selected')}
            </div>
            <div className="flex gap-2">
              <Button
                size="xs"
                color="main"
                onClick={() =>
                  setApplicationModal((prev) => ({
                    ...prev,
                    dialog: 'resume-selection',
                  }))
                }
              >
                {t('postDetails.modal.applyJob.button.choseAvaiableCV')}
              </Button>
            </div>
          </div>
          <div>
            {selectedResumeIndex !== undefined
              ? t('postDetails.modal.applyJob.selectCV.isSelected', {
                  index: selectedResumeIndex + 1,
                })
              : t('postDetails.modal.applyJob.selectCV.isNotSelected')}
          </div>
        </div>
        {dialog === 'resume-selection' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                {t('postDetails.modal.applyJob.selectCV.choseYourCV')}
              </div>
              <Button
                size="xs"
                onClick={() =>
                  setApplicationModal((prev) => ({
                    ...prev,
                    dialog:
                      prev.dialog !== 'resume-creation'
                        ? 'resume-creation'
                        : undefined,
                  }))
                }
              >
                {t('postDetails.modal.applyJob.button.createCV')}
              </Button>
            </div>
            <Table className="table-fixed">
              <Table.Head>
                <Table.HeadCell className="w-1/6">No.</Table.HeadCell>
                <Table.HeadCell>
                  {t('postDetails.modal.applyJob.table.createdAt')}
                </Table.HeadCell>
                <Table.HeadCell>
                  {t('postDetails.modal.applyJob.table.action')}
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>{resumeElms}</Table.Body>
            </Table>
          </div>
        )}
        {dialog === 'resume-creation' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                {t('postDetails.modal.applyJob.selectCV.createCV.title')}
              </div>
              <Button size="xs" onClick={handleFileUpload}>
                {t('postDetails.modal.applyJob.button.createCV')}
              </Button>
            </div>
            <div className="space-y-5">
              <FileInput className="outline-main" onChange={handleFileSelect} />
              <div className="text-sm text-second">
                {t('postDetails.modal.applyJob.selectCV.createCV.requirements')}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="flex ml-auto gap-x-3">
          <Button onClick={handleApplicationSubmit}>
            {t('postDetails.modal.applyJob.button.submit')}
          </Button>
          <Button color="red" onClick={closeModal}>
            {t('postDetails.modal.applyJob.button.cancel')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
