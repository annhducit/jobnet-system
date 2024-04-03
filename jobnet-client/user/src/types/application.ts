import JobseekerType from './jobSeeker'
import PostType from './post'

export type ApplicationStatus = 'Submitted' | 'Reviewed' | 'Rejected' | 'Hired'

export default interface ApplicationType {
  id: string
  post: PostType
  jobSeeker: JobseekerType
  resume: ResumeType
  createdAt: string
  applicationStatus: ApplicationStatus
}

interface ResumeType {
  id: string
  accessPermission: string
  createdAt: string
  fileId: string
  jobSeeker: JobseekerType
}
