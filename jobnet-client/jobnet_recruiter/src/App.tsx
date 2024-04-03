import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import ModalLoader from './components/ModalLoader'
import ErrorBoundary from './components/ErrorBoundary'

import Base from './layouts/Base'
import RBase from './layouts/RBase'

import RecruiterHome from './pages/RecruiterHome'
import RecruiterSignIn from './pages/SignIn'
import RecruiterSignUp from './pages/SignUp'
import PostCreation from './pages/PostCreation'
import PostManagerment from './pages/PostManagerment'
import ApplicantManagement from './pages/ApplicantManagement'
import Campaign from './pages/Campaign'
import Account from './pages/Account'
import MyBusiness from './pages/MyBusiness'
import PostUpdate from './pages/PostUpdate.js'
import ViewResumeRC from './pages/ViewResumeRC.js'

import NotFound from './pages/NotFound'
import { Suspense } from 'react'
import RecruiterDashboard from './pages/RecruiterDashboard.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route
        path="signin"
        element={<RecruiterSignIn />}
        loader={RecruiterSignIn.loader}
        action={RecruiterSignIn.action}
      />
      <Route
        path="signup"
        element={<RecruiterSignUp />}
        loader={RecruiterSignUp.loader}
        action={RecruiterSignUp.action}
      />

      <Route path="view-resume/:id" element={<ViewResumeRC />} />

      <Route element={<Base type="RecruiterHome" />}>
        <Route
          index
          element={<RecruiterHome />}
          loader={RecruiterHome.loader}
        />
      </Route>

      <Route element={<Base type="Recruiter" />}>
        <Route element={<RBase />}>
          <Route index path="dashboard" element={<RecruiterDashboard />} />
          <Route
            path="posts"
            element={<PostManagerment />}
            loader={PostManagerment.loader}
          />
          <Route
            path="posts/new"
            element={<PostCreation />}
            loader={PostCreation.loader}
            action={PostCreation.action}
          />
          <Route
            path="posts/:id"
            element={<PostUpdate />}
            loader={PostUpdate.loader}
          />
          <Route
            path="applicants"
            element={<ApplicantManagement />}
            loader={ApplicantManagement.loader}
          />
          <Route
            path="campaigns"
            element={<Campaign />}
            loader={Campaign.loader}
          />
          <Route path="profile" element={<Account />} />
          <Route
            path="business"
            element={<MyBusiness />}
            loader={MyBusiness.loader}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function App(): JSX.Element {
  return (
    <Suspense fallback="loading">
      <RouterProvider router={router} />
      <ModalLoader />
    </Suspense>
  )
}
