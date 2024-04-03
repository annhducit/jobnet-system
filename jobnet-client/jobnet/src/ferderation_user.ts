declare module 'User/AuthHeaderComponent'
declare module 'User/JSSettings'
declare module 'User/JobSeeker/services' {
  export function getJobSeekers(props?: {
    page?: number
    pageSize?: number
    sortBy?: string[]
    email?: string
    name?: string
    phone?: string
    verificationStatus?: string
    accountType?: string
  }): Promise<PaginationType<JobSeekerType>>
  export function getJobSeekerById(id: string): Promise<JobSeekerType>
  export function updateJobSeekerPersonalInfo(
    id: string,
    req: object
  ): Promise<JobSeekerType>
  export function updateJobSeekerProfessionInfo(
    id: string,
    req: object
  ): Promise<JobSeekerType>
  export function updateJobSeekerInfo(
    url: string,
    req: object
  ): Promise<JobSeekerType>
  export function deleteJobSeekerById(id: string): Promise<void>
  export function openDeleteJobSeekerById(id: string): Promise<void>
  export function getJobSeekerProfileImage(id: string): string
  export function uploadJobSeekerProfileImage(
    id: string,
    formData: FormData
  ): Promise<JobSeekerType>
  export function updateJobSeekerBusinessFollowed(
    id: string,
    req: object
  ): Promise<JobSeekerType>
}

declare module 'User/Noftification' {
  export function getNotificationsByAuth(props?: {
    page?: number
    pageSize?: number
  }): Promise<PaginationType<NotificationType>>
}

declare module 'User/Resume' {
  export function getResumesByAuth(): Promise<ResumeType[]>
  export function getResumesById(id: string): Promise<ResumeType>
  export function getResumeFile(id: string): Promise<Blob>
  export function createResume(formData: FormData): Promise<ResumeType>
  export function updateResume(id: string, req: object): Promise<ResumeType>
  export function deleteResumeById(id: string): Promise<void>
}

declare module 'User/Registration' {
  export function registerJobSeeker(req: object): Promise<UserType>
  export function registerRecruiterWithNewBusiness(
    req: object
  ): Promise<UserType>
  export function registerRecruiterWithSelectedBusiness(
    req: object
  ): Promise<UserType>
  export function verifyUser(req: object): Promise<void>
}
declare module 'User/Recruiter/services' {
  export function getRecruiterById(id: string): Promise<RecruiterType>
  export function getRecruiterProfileImage(id: string | undefined): string
}
