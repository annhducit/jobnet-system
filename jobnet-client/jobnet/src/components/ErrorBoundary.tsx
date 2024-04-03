import { AxiosError } from 'axios'
import { Link, useLocation, useNavigate, useRouteError } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

export default function ErrorBoundary(): React.ReactElement {
  const error = useRouteError() as AxiosError
  const location = useLocation()
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.auth.user)

  const retry = error.response?.config._retry

  console.error(error)

  const handleSignInAgainClick = () => {
    const role = user?.role
    const getUrl = (switchUrl: string) =>
      `/${switchUrl}?redirectTo=${location.pathname}`

    switch (role) {
      case 'Admin':
        return navigate(getUrl('admin/signin'))
      case 'Recruiter':
        return navigate(getUrl('recruiter/signin'))
      default:
        return navigate(getUrl('signin'))
    }
  }

  return (
    <div className="p-6 mx-auto w-[460px] text-center translate-y-2/4">
      <div className="flex flex-col gap-y-6">
        <h1 className="m-0 font-bold text-transparent text-9xl bg-clip-text bg-gradient-to-r from-main-lower to-main-upper">
          Oops!
        </h1>
        <p className="font-sans text-lg font-bold opacity-80">
          {retry ? 'SESSION HAS EXPIRED!' : 'SOMETHING WENT WRONG!'}
        </p>
        <div>
          {retry ? (
            <button
              onClick={handleSignInAgainClick}
              className="px-4 py-2 text-sm font-bold text-white rounded-full bg-main"
            >
              SIGNIN AGAIN
            </button>
          ) : (
            <Link
              to={location.pathname}
              className="px-4 py-2 text-sm font-bold text-white rounded-full bg-main"
            >
              RELOAD PAGE
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
