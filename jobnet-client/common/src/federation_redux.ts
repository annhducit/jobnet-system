declare module "Jobnet/auth"{
    export function getJSAuth(): AuthType
    export function setJSAuth(auth:AuthType): void
    export function clearJSAuth(): void
}

declare module "Jobnet_recruiter/auth"{
    export function getRCAuth(): AuthType
    export function setRCAuth(auth:AuthType): void
    export function clearRCAuth(): void
}

declare module "Jobnet_admin/auth"{
    export function getADAuth(): AuthType
    export function setADAuth(auth:AuthType): void
    export function clearADAuth(): void
}
declare module "Jobnet/loading"{
    export function setJSLoad(flag: boolean): void
}
declare module "Jobnet_recruiter/loading"{
    export function setRCLoad(flag: boolean): void
}
declare module "Jobnet_admin/loading"{
    export function setADLoad(flag: boolean): void
}
interface AuthType {
    user?: UserType
    accessToken?: string
    refreshToken?: string
  }
interface UserType {
    id: string
    email: string
    name: string
    role: 'Admin' | 'Recruiter' | 'JobSeeker'
  }