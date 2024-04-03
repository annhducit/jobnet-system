//-------------type----------


interface LocationType {
    provinceCode: string
    provinceName: string
    specificAddress: string
  }
  interface NotificationType {
    title: string
    content: string
    createdAt: string
  }
  interface BusinessType {
    id: string
    name: string
    type: EBusinessType
    country: string
    employeeQuantity: string
    foundedYear: number
    description: string
    emailDomain: string
    phone: string
    website: string
    locations: Array<LocationType>
    profileImageId: string
    backgroundImageId: string
    followers: Array<string>
    totalFollowers: number
    createdAt: string
    status: EBusinessStatus
    isDeleted: boolean
  }
  
  
type PostActiveStatus =
  | 'Pending'
  | 'Opening'
  | 'Closed'
  | 'Stopped'
  | 'Blocked'
  | 'Rejected'

interface PostType {
  id: string
  title: string
  profession: ProfessionType | undefined
  minSalary?: string
  minSalaryString: string
  maxSalary?: string
  maxSalaryString: string
  levels: Array<LevelType>
  locations: Array<LocationType>
  workingFormat: string
  benefits: Array<BenefitType>
  description: string
  yearsOfExperience: string
  // degrees: Array<DegreeType>
  otherRequirements: string
  requisitionNumber: number
  // internalContact: string
  applicationDeadline: string
  jdId: string
  recruiter: RecruiterType
  business: BusinessPostType
  activeStatus: PostActiveStatus
  totalViews: number
  createdAt: string
}

interface WishlistType {
  id: string
  jobSeeker: JobSeekerType
  post: PostType
  createdAt: string
}

interface ProfessionType {
  id: string
  name: string
  categoryId: string
}

interface CategoryType {
  id: string
  name: string
}

interface ApplicationType {
  id: string
  post: PostType
  jobSeeker: JobSeekerType
  resumeId: string
  createdAt: string
  applicationStatus: ApplicationStatus
}

interface BusinessPostType {
  id: string
  name: string
  profileImageId: string
}
interface LevelType {
  id: string
  name: string
}
interface BenefitType {
  id: string
  name: string
  description?: string
}
interface RecruiterType {
  id: string
  email: string
  name: string
  role: string
  phone: string
  profileImageId: string
  nation: string
  activeBusiness: boolean
  business: BusinessType
  locked: boolean
}
interface LocationType {
  provinceCode: string
  provinceName: string
  specificAddress: string
}

interface BusinessType {
  id: string
  name: string
  type: EBusinessType
  country: string
  employeeQuantity: string
  foundedYear: number
  description: string
  emailDomain: string
  phone: string
  website: string
  locations: Array<LocationType>
  profileImageId: string
  backgroundImageId: string
  followers: Array<string>
  totalFollowers: number
  createdAt: string
  status: EBusinessStatus
  isDeleted: boolean
}

type EBusinessType = 'Product' | 'Outsource'

type EBusinessStatus = 'Pending' | 'Approved' | 'Rejected'

interface Param {
  page?: number
  pageSize?: number
  sortBy?: string[]
  search?: string
  categoryId?: string
  professionId?: string
  minSalary?: number
  maxSalary?: number
  provinceCode?: number
  workingFormat?: string
  recruiterId?: string
  businessId?: string
  activeStatus?: string
  fromDate?: string
  toDate?: string
  isExpired?: boolean | string
}

interface PaginationType<T> {
  totalElements: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  data: T[]
}
interface UserType {
  id: string
  email: string
  name: string
  role: 'Admin' | 'Recruiter' | 'JobSeeker'
}
interface JobSeekerType extends UserType {
  dateOfBirth?: string | null
  phone?: string
  gender?: string
  nation?: string
  salary?: string
  workingFormat?: string
  profession?: string
  location?: LocationType
  verificationStatus: string
  jobSearchStatus: string
  accountType: string
  profileImageId: string
  address: string
  locked: boolean
}

type ApplicationStatus = 'Submitted' | 'Reviewed' | 'Rejected' | 'Hired'

interface EvaluationType {
  id: string
  recruiter: RecruiterEvaluationType
  resumeId: string
  comments: Array<CommentType>
}

interface CommentType {
  id: string
  content: string
  createdAt: string
}

type RecruiterEvaluationType = {
  id: string
  name: string
  profileImageId: string
}

type ResumeAccessPermission =
  | 'Private'
  | 'Public'
  | 'OnlyRegisteredEmployers'
  | 'OnlyVerifiedRecruiters'

type ResumeSupportPermission = 'Enable' | 'Disable' | 'UnderReview'

interface ResumeType {
  id: string
  jobSeeker: JobSeekerType
  fileId: string
  accessPermission: ResumeAccessPermission
  supportPermission: ResumeSupportPermission
  createdAt: string
  totalViews: number
  viewerIds: Array<string>
}

