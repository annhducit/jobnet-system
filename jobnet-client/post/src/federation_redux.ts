declare module "Common/auth"{
    export function getAuth(): AuthType
    export function setAuth(auth:AuthType): void
    export function clearAuth(): void
}

declare module "Common/setLoad"{
    export function setLoad(flag: boolean): void
}

interface AuthType {
    user?: UserType
    accessToken?: string
    refreshToken?: string
}

