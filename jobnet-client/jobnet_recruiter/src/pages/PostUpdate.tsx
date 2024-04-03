import { useState, useCallback } from 'react'
import { Params, useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format, parse } from 'date-fns'
import { FaArrowLeft } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

import useTitlePage from '../hooks/useTitlePage'

import postService from '../services/postService'
import benefitService from '../services/benefitService'
import levelService from '../services/levelService'
import professionService from '../services/professionService'

import Radio from 'Common/input/Radio'
import Modal from 'Common/Modal'
import Input from 'Common/input/Input'
import Button from 'Common/Button'
import SelectChangeEvent from 'Common/type/SelectChangeEvent'
import ListInputChangeEvent from 'Common/type/ListInputChangeEvent'
import LocationInputChangeEvent from 'Common/type/LocationInputChangeEvent'
import Selection from 'Common/input/Selection'
import DateInput from 'Common/input/DateInput'
import TagsInput from 'Common/input/TagsInput'
import Textarea from 'Common/input/Textarea'
import LocationInput from 'Common/input/LocationInput'
import TinyEditor from 'Common/TinyEditor'

import PostType from '../types/post'
import useModal from '../hooks/useModal'
import ErrorType from '../types/error'
import ProfessionType from '../types/profession'
import { PostDetailsInfo } from './PostDetails'
import { requireAuth } from '../utils/auth'

const initHeadingInfo = (post: PostType) => ({
  title: post?.title || '',
  locations: post?.locations || [],
  yearsOfExperience: post?.yearsOfExperience || '',
  minSalaryString: post?.minSalaryString || '',
  maxSalaryString: post?.maxSalaryString || '',
  requisitionNumber: post?.requisitionNumber || '',

  applicationDeadline: format(
    parse(post?.applicationDeadline, 'dd/MM/yyyy', new Date()),
    'yyyy-MM-dd'
  ),
})

const initDetailedInfo = (post: PostType) => ({
  description: post?.description || '',
  otherRequirements: post?.otherRequirements || '',
})

const initGeneralInfo = (post: PostType) => ({
  levelIds: post?.levels?.map((level) => level.id) || [],
  professionId: post?.profession?.id,
  benefitIds: post?.benefits?.map((benefit) => benefit.id) || [],
  workingFormat: post?.workingFormat || '',
})

interface PostUpdateLoader {
  post: PostType
  professions: Array<ProfessionType>
}

PostUpdate.loader = async function ({
  request,
  params,
}: {
  request: Request
  params: Params
}): Promise<PostUpdateLoader> {
  requireAuth(request, 'Recruiter')
  const postId = params.id as string
  const post = await postService.getPostById(postId)
  const professions = await professionService.getProfessions()
  return { post, professions }
}

export default function PostUpdate(): JSX.Element {
  const loader = useLoaderData() as PostUpdateLoader

  const { t } = useTranslation()
  useTitlePage(t('pageTitle.postUpdate'))

  const [post, setPost] = useState(loader.post)
  const [headingInfo, setHeadingInfo] = useState(initHeadingInfo(post))
  const [detailedInfo, setDetailedInfo] = useState(initDetailedInfo(post))
  const [generalInfo, setGeneralInfo] = useState(initGeneralInfo(post))

  const { modal, openModal, closeModal } = useModal()

  const navigate = useNavigate()

  const handleLevelsSearch = async (name: string) => {
    const levels = await levelService.getLevels({ search: name })
    return levels
  }

  const handleBenefitsSearch = async (name: string) => {
    const benefits = await benefitService.getBenefits({ search: name })
    return benefits
  }

  const handleBenefitCreate = async (name: string) => {
    try {
      const benefit = await benefitService.createBenefit({ name })
      return benefit
    } catch (err) {
      toast.error((err as ErrorType).message)
    }
  }

  const handleHeadingInfoChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | SelectChangeEvent
        | ListInputChangeEvent
        | LocationInputChangeEvent
    ) =>
      setHeadingInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    []
  )

  const handleDetailedInfoChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetailedInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleGeneralInfoChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | SelectChangeEvent
        | TagsInputChangeEvent
    ) =>
      setGeneralInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    []
  )

  console.log(generalInfo.levelIds)

  const handleHeadingInfoUpdateClick = () => {
    if (
      !headingInfo?.title ||
      !headingInfo?.locations.length ||
      !headingInfo?.yearsOfExperience ||
      !headingInfo?.minSalaryString ||
      !headingInfo?.maxSalaryString ||
      !headingInfo?.requisitionNumber ||
      !headingInfo?.applicationDeadline
    ) {
      toast.error(t('recruiter.postUpdate.action.error.requireField'))
      return
    }

    void (async () => {
      try {
        const post = await postService.updatePostHeadingInfo(
          loader.post.id,
          headingInfo
        )
        setPost(post)
        closeModal()
        toast.success(t('recruiter.postUpdate.action.success'))
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handleDetailedInfoUpdateClick = () => {
    if (!detailedInfo.description || !detailedInfo.otherRequirements) {
      toast.error(t('recruiter.postUpdate.action.error.requireField'))
      return
    }

    void (async () => {
      try {
        const post = await postService.updatePostDetailedInfo(
          loader.post.id,
          detailedInfo
        )
        setPost(post)
        closeModal()
        toast.success(t('recruiter.postUpdate.action.success'))
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  const handleGeneralInfoUpdateClick = () => {
    if (
      !generalInfo.levelIds ||
      !generalInfo.professionId ||
      !generalInfo.benefitIds ||
      !generalInfo.workingFormat
    ) {
      toast.error(t('recruiter.postUpdate.action.error.requireField'))
      return
    }

    void (async () => {
      try {
        const post = await postService.updatePostGeneralInfo(
          loader.post.id,
          generalInfo
        )
        setPost(post)
        closeModal()
        toast.success(t('recruiter.postUpdate.action.success'))
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  return (
    <div className="px-2 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {t('recruiter.postCreation.title')}
        </h2>
        <Button
          color="slate"
          size={'sm'}
          onClick={() => navigate('..', { relative: 'path' })}
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          {t('recruiter.postUpdate.buttons.back')}
        </Button>
      </div>

      {post && (
        <PostDetailsInfo
          post={post}
          type="Update"
          handleClickUpdateHeading={() => {
            openModal('post-heading-info-update-modal')
          }}
          handleClickUpdateDetails={() => {
            openModal('detailed-info-update-modal')
          }}
          handleClickUpdateGeneral={() => {
            openModal('general-info-update-modal')
          }}
        />
      )}

      <Modal
        id="post-heading-info-update-modal"
        show={modal === 'post-heading-info-update-modal'}
        size="2xl"
        onClose={closeModal}
      >
        <Modal.Header>{t('recruiter.postUpdate.title')}</Modal.Header>
        <Modal.Body className="space-y-5">
          <Input
            id="title"
            name="title"
            label={`${t('recruiter.postCreation.inputs.title.label')} :`}
            placeholder={t('recruiter.postCreation.inputs.title.placeholder')}
            type="text"
            color="main"
            value={headingInfo.title}
            onChange={handleHeadingInfoChange}
          />
          <LocationInput
            label={`${t('recruiter.postCreation.inputs.locationInput.label')}`}
            review
            value={headingInfo.locations}
            onLocationsChange={handleHeadingInfoChange}
          />

          <Selection
            id="yearsOfExperience"
            name="yearsOfExperience"
            label={`${t('recruiter.postCreation.inputs.exp.label')} :`}
            options={[
              {
                id: 'Dưới 1 năm',
                name: t('recruiter.postCreation.inputs.exp.options.option1'),
              },
              {
                id: '1 - 2 năm',
                name: t('recruiter.postCreation.inputs.exp.options.option2'),
              },
              {
                id: '3 - 5 năm',
                name: t('recruiter.postCreation.inputs.exp.options.option3'),
              },
              {
                id: '5 năm trở lên',
                name: t('recruiter.postCreation.inputs.exp.options.option4'),
              },
            ]}
            value={headingInfo.yearsOfExperience}
            onSelectChange={handleHeadingInfoChange}
          />
          <LabelSection
            className="gap-2"
            label={t('recruiter.postCreation.inputs.salary.label')}
          >
            <div className="flex items-center justify-start">
              <Input
                id="minSalary"
                name="minSalary"
                type="text"
                placeholder={t(
                  'recruiter.postCreation.inputs.salary.placeholder.min'
                )}
                value={headingInfo.minSalaryString}
                onChange={handleHeadingInfoChange}
              />
              <span className="px-3">-</span>
              <Input
                id="maxSalary"
                name="maxSalary"
                type="text"
                placeholder={t(
                  'recruiter.postCreation.inputs.salary.placeholder.max'
                )}
                value={headingInfo.maxSalaryString}
                onChange={handleHeadingInfoChange}
              />
            </div>
          </LabelSection>
          <div className="grid grid-cols-2 gap-x-6">
            <Input
              id="requisitionNumber"
              name="requisitionNumber"
              label={`${t(
                'recruiter.postCreation.inputs.requisitionNumber.label'
              )} :`}
              type="number"
              placeholder={t(
                'recruiter.postCreation.inputs.requisitionNumber.placeholder'
              )}
              value={headingInfo.requisitionNumber}
              onChange={handleHeadingInfoChange}
            />
            <DateInput
              id="applicationDeadline"
              name="applicationDeadline"
              label={t(
                'recruiter.postCreation.inputs.applicationDeadline.label'
              )}
              value={headingInfo.applicationDeadline}
              onChange={handleHeadingInfoChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button color="main" onClick={handleHeadingInfoUpdateClick}>
              {t('recruiter.postUpdate.buttons.update')}
            </Button>
            <Button color="red" onClick={closeModal}>
              {t('recruiter.postUpdate.buttons.cancel')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        id="detailed-info-update-modal"
        show={modal === 'detailed-info-update-modal'}
        size="5xl"
        onClose={closeModal}
      >
        <Modal.Header>{t('recruiter.postUpdate.title')}</Modal.Header>
        <Modal.Body className="space-y-5">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="description">
              {t('recruiter.postCreation.inputs.desc.label')}
            </label>
            <TinyEditor
              id="description"
              name="description"
              data={detailedInfo.description}
              value={detailedInfo.description}
              onChange={void handleDetailedInfoChange}
            />
          </div>
          <Textarea
            id="otherRequirements"
            name="otherRequirements"
            className="h-40 resize-none"
            label={`${t(
              'recruiter.postCreation.inputs.otherRequirements.label'
            )} :`}
            placeholder={t(
              'recruiter.postCreation.inputs.otherRequirements.placeholder'
            )}
            value={detailedInfo.otherRequirements}
            onChange={handleDetailedInfoChange}
          />

          <div className="flex justify-end gap-4">
            <Button color="main" onClick={handleDetailedInfoUpdateClick}>
              {t('recruiter.postUpdate.buttons.update')}
            </Button>
            <Button color="red" onClick={closeModal}>
              {t('recruiter.postUpdate.buttons.cancel')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        id="general-info-update-modal"
        show={modal === 'general-info-update-modal'}
        size="2xl"
        onClose={closeModal}
      >
        <Modal.Header>{t('recruiter.postUpdate.title')}</Modal.Header>
        <Modal.Body className="space-y-5">
          <TagsInput
            id="levelIds"
            name="levelIds"
            label={`${t('recruiter.postCreation.inputs.level.label')} :`}
            placeholder={t('recruiter.postCreation.inputs.level.label')}
            tags={post?.levels}
            onHintsSearch={handleLevelsSearch}
            onTagsInputChange={handleGeneralInfoChange}
          />
          <TagsInput
            id="degrees"
            name="degrees"
            label={`${t('recruiter.postCreation.inputs.degree.label')} :`}
            placeholder={t(
              'recruiter.postCreation.inputs.degree.options.option1'
            )}
            hints={[
              {
                id: t('recruiter.postCreation.inputs.degree.options.option1'),
                name: t('recruiter.postCreation.inputs.degree.options.option1'),
              },
              {
                id: t('recruiter.postCreation.inputs.degree.options.option2'),
                name: t('recruiter.postCreation.inputs.degree.options.option2'),
              },
            ]}
            onTagsInputChange={handleGeneralInfoChange}
          />
          <div className="grid grid-cols-2 gap-x-6">
            <Selection
              id="professionId"
              name="professionId"
              label={`${t('recruiter.postCreation.inputs.profession.label')} :`}
              options={loader.professions}
              value={generalInfo.professionId}
              onSelectChange={handleGeneralInfoChange}
            />
            <TagsInput
              id="benefitIds"
              name="benefitIds"
              label={`${t('recruiter.postCreation.inputs.benefit.label')} :`}
              placeholder={t(
                'recruiter.postCreation.inputs.benefit.placeholder'
              )}
              tags={post?.benefits}
              onHintsSearch={handleBenefitsSearch}
              onHintCreate={handleBenefitCreate}
              onTagsInputChange={handleGeneralInfoChange}
            />
          </div>
          <LabelSection
            className="gap-4"
            label={`${t(
              'recruiter.postCreation.inputs.workingFormat.label'
            )} :`}
          >
            <div className="grid grid-cols-3">
              <div>
                <Radio
                  id="full-time"
                  name="workingFormat"
                  className="mr-2"
                  value="full-time"
                  checked={generalInfo.workingFormat === 'full-time'}
                  onChange={handleGeneralInfoChange}
                />
                <label htmlFor="full-time">
                  {t(
                    'recruiter.postCreation.inputs.workingFormat.options.fulltime'
                  )}
                </label>
              </div>
              <div>
                <Radio
                  id="part-time"
                  name="workingFormat"
                  className="mr-2"
                  value="part-time"
                  checked={generalInfo.workingFormat === 'part-time'}
                  onChange={handleGeneralInfoChange}
                />
                <label htmlFor="part-time">
                  {t(
                    'recruiter.postCreation.inputs.workingFormat.options.parttime'
                  )}
                </label>
              </div>
              <div>
                <Radio
                  id="intern"
                  name="workingFormat"
                  className="mr-2"
                  value="intern"
                  checked={generalInfo.workingFormat === 'intern'}
                  onChange={handleGeneralInfoChange}
                />
                <label htmlFor="intern">
                  {t(
                    'recruiter.postCreation.inputs.workingFormat.options.intern'
                  )}
                </label>
              </div>
            </div>
          </LabelSection>
          <Textarea
            id="internalContact"
            name="internalContact"
            label={t('recruiter.postCreation.inputs.internalContact.label')}
            placeholder={t(
              'recruiter.postCreation.inputs.internalContact.placeholder'
            )}
            onChange={handleGeneralInfoChange}
          />
          <div className="flex justify-end gap-4">
            <Button color="main" onClick={handleGeneralInfoUpdateClick}>
              {t('recruiter.postUpdate.buttons.update')}
            </Button>
            <Button color="red" onClick={closeModal}>
              {t('recruiter.postUpdate.buttons.cancel')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export function LabelSection({
  className,
  label,
  children,
}: {
  className: string
  label: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <div className={`${className} flex flex-col`}>
      <h4>{label}</h4>
      {children}
    </div>
  )
}
