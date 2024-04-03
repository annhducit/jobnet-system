import { useLoaderData, useActionData, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { format } from 'date-fns'

import CreatePost from 'Post/RC/CreatePost'

import postService from 'Post/services'
import professionService from 'Post/Profession'
import recruiterService from 'User/Recruiter/services'

import useTitlePage from '../hooks/useTitlePage'
import type ProfessionType from '../types/profession'
import type ErrorType from '../types/error'
import LocationType from '../types/location'
import { store } from '../app/store'
import { requireAuth } from '../utils/auth'
interface PostCreationLoader {
  recruiter: Recruiter
  professions: ProfessionType[]
}

interface PostCreationAction {
  type: 'success' | 'error'
  message: string
}

PostCreation.loader = async function ({
  request,
}: {
  request: Request
}): Promise<PostCreationLoader> {
  requireAuth(request, 'Recruiter')

  const recruterId = store.getState().auth.user?.id as string
  
  const recruiter = await recruiterService.getRecruiterById(recruterId)

  const professions = await professionService.getProfessions()
  return { recruiter, professions }
}

PostCreation.action = async function ({
  request,
}: {
  request: Request
}): Promise<PostCreationAction | Response> {
  const formData = await request.formData()

  formData.get('applicationDeadline') &&
    formData.set(
      'applicationDeadline',
      format(
        new Date(formData.get('applicationDeadline') as string),
        'dd/MM/yyyy'
      )
    )

  const locationJsons = formData.getAll('locations')
  formData.delete('locations')
  locationJsons
    .map((json) => JSON.parse(json as string) as LocationType)
    .forEach((location, i) => {
      formData.append(`locations[${i}].provinceCode`, location.provinceCode)
      formData.append(`locations[${i}].provinceName`, location.provinceName)
      formData.append(
        `locations[${i}].specificAddress`,
        location.specificAddress
      )
    })
  try {
    await postService.createPost(formData)

    toast.success('Post created successfully.')
    return redirect('/recruiter/posts')
  } catch (err) {
    return { type: 'error', message: (err as ErrorType).message }
  }
}

export default function PostCreation(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.createPost'))
  const loader = useLoaderData() as PostCreationLoader
  const action = useActionData() as PostCreationAction
  // * Generate and parse JD state

  return (
    <>
      <main className="space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {t('recruiter.postCreation.title')}
          </h2>
          <div className="font-semibold text-second">
            {t('recruiter.postCreation.subtitle')}
          </div>
        </div>
        <CreatePost loader={loader} action={action} />
      </main>
    </>
  )
}
