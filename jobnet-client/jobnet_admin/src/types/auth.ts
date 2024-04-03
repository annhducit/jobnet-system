import type UserType from './user'

export default interface AuthType {
  user?: UserType
  accessToken?: string
  refreshToken?: string
}
