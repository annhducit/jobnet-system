import { useEffect, useRef, useState, useCallback } from 'react'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FileInput } from 'flowbite-react'
import { useTranslation } from 'react-i18next'

import useModal from '../../hooks/useModal'

import Button from 'Common/Button'
import Input from 'Common/input/Input'
import Selection from 'Common/input/Selection'
import Radio from 'Common/input/Radio'
import TagsInput from 'Common/input/TagsInput'
import LocationInput from 'Common/input/LocationInput'
import GenerateSkeleton from 'Common/skeleton/SkeletonItem'
import DateInput from 'Common/input/DateInput'
import Textarea from 'Common/input/Textarea'
import TinyEditor from 'Common/TinyEditor'
import Modal from 'Common/Modal'
import { getAuth } from 'Common/auth'
import { PostDetailsInfo } from 'Common/PostDetailInfo'

import levelService from '../../services/levelService'
import benefitService from '../../services/benefitService'
import recruiterService from 'User/Recruiter/services'
import businessService from 'Business/services'
import generateJDService from '../../services/generateJDService'

import PostType, { GeneratePostType } from '../../types/post'
import type ProfessionType from '../../types/profession'
import type ErrorType from '../../types/error'
import LocationType from '../../types/location'
import LevelType from '../../types/level'
import BenefitType from '../../types/benefit'
import DegreeType from '../../types/degree'
import { postInputs } from '../../types/post'
import { BusinessTypeMF } from '../../types/business'
interface PostCreationAction {
  type: 'success' | 'error'
  message: string
}
export default function CreatePost({
  loader,
  action,
}: {
  loader: { recruiter: Recruiter; professions: ProfessionType[] }
  action: PostCreationAction
}): JSX.Element {
  const { t } = useTranslation()

  // * Generate and parse JD state
  const [inputs, setInputs] = useState<postInputs>({
    minSalary: '',
    maxSalary: '',
    otherRequirements: '',
    requireNumber: '',
    yearExp: undefined,
    workType: '',
    title: '',
  })
  const [levels, setLevels] = useState<LevelType[]>()
  const [benefits, setBenefits] = useState<BenefitType[]>()
  const [degrees, setDegrees] = useState<DegreeType[]>()
  const [locations, setLocations] = useState<LocationType[]>()
  const [recruiter, setRecruiter] = useState<Recruiter>()
  const [business, setBusiness] = useState<BenefitType>()
  const [postPreview, setPostPreview] = useState<PostType>()

  const [textData, setTextData] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)
  // *
  

  const { modal, openModal, closeModal } = useModal()

  useEffect(() => {
    const toastId = action && toast[action.type](action.message)
    return () => toast.dismiss(toastId)
  }, [action])

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

  // * Generate JS by AI

  const handleReceiveLocationData = (data: LocationType[]) => {
    setLocations(data)
  }

  const handleReceiveLevelData = (data: LevelType[]) => {
    setLevels(data)
  }

  const handleReceiveBenefitData = (data: BenefitType[]) => {
    setBenefits(data)
  }

  const handleReceiveDegreeData = (data: DegreeType[]) => {
    setDegrees(data)
  }

  const handleGenerateJobDescription = () => {
    if (formRef.current) {
      const temp = new FormData(formRef.current)

      const formProfession = loader.professions?.find(
        (profession) =>
          temp &&
          temp.get('professionId')?.toString() === profession.id.toString()
      )

      const data: GeneratePostType = {
        otherRequirements: temp.get('otherRequirements') as string,
        requireNumber: temp.get('requisitionNumber') as string,
        minSalary: temp.get('minSalaryString') as string,
        maxSalary: temp.get('maxSalaryString') as string,
        yearExp: temp.get('yearsOfExperience') as string,
        workType: temp.get('workingFormat') as string,
        title: temp.get('title') as string,
        profession: formProfession?.name,
        degrees: degrees?.map((item) => item.name),
        levels: levels?.map((item) => item.name),
        benefits: benefits?.map((item) => item.name),
        locations: locations?.map(
          (item) => `${item.specificAddress} - ${item.provinceName}`
        ),
      }
      void generatePost(data)
    }
  }
  const generatePost = async (data: GeneratePostType) => {
    setLoading(true)
    const result = await generateJDService.generatePost(data)
    setLoading(false)
    setTextData(result.content)
  }
  // *

  // * Parse JD by tessaract AI tools
  const handleChangeJD = (event: React.ChangeEvent<HTMLInputElement>) => {
    void (async () => {
      if (event.target.files) {
        const form = new FormData()
        const file = event.target.files[0]
        form.append('jd', file)
        setLoading(true)
        const result = await generateJDService.parseJD(form)
        console.log(result)
        setLoading(false)

        setTextData(result.content)
        setInputs(result?.data)
      } else {
        toast.error(t('recruiter.postCreation.file.notFound'))
      }
    })()
  }
  // *

  // * Handle Post Preview
  const auth = getAuth()

  // * Fetch get recruiter
  const getRecruiterById = useCallback(async () => {
    try {
      const response = await recruiterService.getRecruiterById(
        auth.user?.id as string
      )
      setRecruiter(response)
    } catch (error) {
      console.error(t('recruiter.postCreation.error.fetch'), error)
    }
  }, [auth.user?.id, t])

  // * Fetch get business
  const getBusinessById = useCallback(async () => {
    try {
      const response = await businessService.getBusinessById(
        loader.recruiter?.businessId || ""
      )
      setBusiness(response)
    } catch (error) {
      console.error(t('recruiter.postCreation.error.fetch'), error)
    }
  }, [recruiter?.businessId, t])

  useEffect(() => {
    void getRecruiterById()
    void getBusinessById()
  }, [getRecruiterById, getBusinessById])

  const handlePostReview = () => {
    openModal('post-preview-modal')
    if (formRef.current) {
      const temp = new FormData(formRef.current)

      const formProfession = loader.professions?.find(
        (profession) =>
          temp &&
          temp.get('professionId')?.toString() === profession.id.toString()
      )

      const data: PostType = {
        applicationDeadline: temp.get('applicationDeadline') as string,
        otherRequirements: temp.get('otherRequirements') as string,
        requisitionNumber: Number(temp.get('requisitionNumber')),
        minSalaryString: temp.get('minSalaryString') as string,
        maxSalaryString: temp.get('maxSalaryString') as string,
        yearsOfExperience: temp.get('yearsOfExperience') as string,
        workingFormat: temp.get('workingFormat') as string,
        description: temp.get('description') as string,
        title: temp.get('title') as string,
        locations: locations as LocationType[],
        recruiter: recruiter as Recruiter,
        benefits: benefits as BenefitType[],
        business: business as BusinessTypeMF,
        levels: levels as LevelType[],
        profession: formProfession,
        totalViews: 0,
        activeStatus: 'Pending',
        createdAt: '',
        jdId: '',
        id: '',
      }
      setPostPreview(data)
      console.log(postPreview?.description)
    }
  }
  // *

  // * Default value of tiny
  const editorInitValue = `${t('recruiter.postCreation.inputs.desc.initValue')}`
  // *

  return (
    <>
      <Form
        className="space-y-8"
        method="post"
        encType="multipart/form-data"
        ref={formRef}
      >
        <PostDetailSection title={t('recruiter.postCreation.file.title')}>
          <FileInput
            id="jdFile"
            name="jdFile"
            className="outline-main"
            onChange={handleChangeJD}
            accept=".pdf"
          />
        </PostDetailSection>

        <PostDetailSection title={t('recruiter.postCreation.sessions.general')}>
          <Input
            id="title"
            name="title"
            label={`${t('recruiter.postCreation.inputs.title.label')} :`}
            type="text"
            color="main"
            placeholder={t('recruiter.postCreation.inputs.title.placeholder')}
            defaultValue={inputs?.title}
          />

          <Selection
            id="professionId"
            name="professionId"
            label={`${t('recruiter.postCreation.inputs.profession.label')} :`}
            options={loader?.professions}
          />

          <LabelSection
            className="gap-2"
            label={t('recruiter.postCreation.inputs.salary.label')}
          >
            <div className="flex items-center justify-start">
              <Input
                id="minSalaryString"
                name="minSalaryString"
                type="text"
                color="main"
                placeholder={t(
                  'recruiter.postCreation.inputs.salary.placeholder.min'
                )}
                defaultValue={inputs?.minSalary}
              />
              <span className="px-3">-</span>
              <Input
                id="maxSalaryString"
                name="maxSalaryString"
                type="text"
                color="main"
                placeholder={t(
                  'recruiter.postCreation.inputs.salary.placeholder.max'
                )}
                defaultValue={inputs?.maxSalary}
              />
            </div>
          </LabelSection>

          <TagsInput
            id="levelIds"
            name="levelIds"
            label={`${t('recruiter.postCreation.inputs.level.label')} :`}
            placeholder={t('recruiter.postCreation.inputs.level.label')}
            onHintsSearch={handleLevelsSearch}
            sendData={handleReceiveLevelData}
          />
        </PostDetailSection>

        <PostDetailSection title={t('recruiter.postCreation.sessions.detail')}>
          <LocationInput
            label={`${t(
              'recruiter.postCreation.inputs.locationInput.label'
            )} :`}
            // hints={loader.recruiter.business.locations}
            sendData={handleReceiveLocationData}
          />

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
                  defaultChecked={inputs?.workType === 'full-time'}
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
                  defaultChecked={inputs?.workType === 'part-time'}
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
                  defaultChecked={inputs?.workType === 'intern-time'}
                />
                <label htmlFor="intern">
                  {t(
                    'recruiter.postCreation.inputs.workingFormat.options.intern'
                  )}
                </label>
              </div>
            </div>
          </LabelSection>
          <TagsInput
            id="benefitIds"
            name="benefitIds"
            label={`${t('recruiter.postCreation.inputs.benefit.label')} :`}
            placeholder={t('recruiter.postCreation.inputs.benefit.placeholder')}
            onHintsSearch={handleBenefitsSearch}
            onHintCreate={handleBenefitCreate}
            sendData={handleReceiveBenefitData}
          />
        </PostDetailSection>

        <PostDetailSection
          title={t('recruiter.postCreation.sessions.requirement')}
        >
          <Selection
            id="yearsOfExperience"
            name="yearsOfExperience"
            label={`${t('recruiter.postCreation.inputs.exp.label')} :`}
            value={
              !inputs.yearExp
                ? ''
                : inputs.yearExp < 1
                ? 'Dưới 1 năm'
                : inputs.yearExp <= 2
                ? '1 - 2 năm'
                : inputs.yearExp <= 5
                ? '3 - 5 năm'
                : '5 năm trở lên'
            }
            options={[
              {
                id: t('recruiter.postCreation.inputs.exp.options.option1'),
                name: t('recruiter.postCreation.inputs.exp.options.option1'),
              },
              {
                id: t('recruiter.postCreation.inputs.exp.options.option2'),
                name: t('recruiter.postCreation.inputs.exp.options.option2'),
              },
              {
                id: t('recruiter.postCreation.inputs.exp.options.option3'),
                name: t('recruiter.postCreation.inputs.exp.options.option3'),
              },
              {
                id: t('recruiter.postCreation.inputs.exp.options.option4'),
                name: t('recruiter.postCreation.inputs.exp.options.option4'),
              },
            ]}
          />
          <TagsInput
            id="degrees"
            name="degrees"
            label={`${t('recruiter.postCreation.inputs.degree.label')} :`}
            placeholder={t(
              'recruiter.postCreation.inputs.degree.options.option1'
            )}
            sendData={handleReceiveDegreeData}
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
          />
          <Textarea
            id="otherRequirements"
            name="otherRequirements"
            label={`${t(
              'recruiter.postCreation.inputs.otherRequirements.label'
            )} :`}
            defaultValue={inputs?.otherRequirements}
            placeholder={t(
              'recruiter.postCreation.inputs.otherRequirements.placeholder'
            )}
          />
        </PostDetailSection>

        <PostDetailSection
          title={t('recruiter.postCreation.sessions.additional')}
        >
          <Textarea
            id="internalContact"
            label={t('recruiter.postCreation.inputs.internalContact.label')}
            name="internalContact"
            placeholder={t(
              'recruiter.postCreation.inputs.internalContact.placeholder'
            )}
          />
        </PostDetailSection>

        <PostDetailSection title={t('recruiter.postCreation.sessions.setup')}>
          <Input
            id="requisitionNumber"
            name="requisitionNumber"
            label={`${t(
              'recruiter.postCreation.inputs.requisitionNumber.label'
            )} :`}
            type="number"
            color="main"
            placeholder={t(
              'recruiter.postCreation.inputs.requisitionNumber.placeholder'
            )}
            defaultValue={inputs?.requireNumber}
          />
          <DateInput
            id="applicationDeadline"
            name="applicationDeadline"
            label={t('recruiter.postCreation.inputs.applicationDeadline.label')}
          />
        </PostDetailSection>
        <div className="">
          <Button
            className="mt-3 mr-auto text-white transition-all bg-cyan-500 hover:bg-cyan-600"
            color="empty"
            onClick={handleGenerateJobDescription}
          >
            {t('recruiter.postCreation.button.generatePost')}
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {t('recruiter.postCreation.inputs.desc.label')}
          </h2>
          {!loading && (
            <>
              <TinyEditor
                id="description"
                name="description"
                data={textData || editorInitValue}
              />
            </>
          )}
          {loading && <GenerateSkeleton />}
        </div>

        <div className="flex items-center ml-auto gap-x-2">
          <i>
            <b>Note: </b>
            {t('recruiter.postCreation.note')}
          </i>
          <Button
            color="empty"
            className="ml-auto text-white transition-all bg-cyan-500 hover:bg-cyan-600"
            onClick={handlePostReview}
            disabled={loading}
          >
            {t('recruiter.postCreation.button.preview')}
          </Button>
          {
            <Button disabled={loading} type="submit">
              {t('recruiter.postCreation.button.submit')}
            </Button>
          }
        </div>
      </Form>
      <Modal
        id="post-preview-modal"
        show={modal === 'post-preview-modal'}
        onClose={closeModal}
        size="7xl"
        className="w-full"
      >
        <Modal.Header>
          {t('recruiter.postCreation.modals.preview')}
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-y-4">
            {postPreview && (
              <PostDetailsInfo type="Preview" post={postPreview} />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center ml-auto gap-x-2">
            <Button
              className="text-white transition-all bg-red-500 hover:bg-red-600"
              onClick={closeModal}
            >
              {t('recruiter.postCreation.button.close')}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function PostDetailSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2 sm:grid-cols-1">
        {children}
      </div>
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
