
declare module "User/Recruiter/services"{
    export function getRecruiterById(id: string): Promise<RecruiterType>
    export function getRecruiterProfileImage(id: string | undefined): string
}