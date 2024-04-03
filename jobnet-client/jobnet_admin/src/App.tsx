import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import ModalLoader from './components/ModalLoader'

import ErrorBoundary from './components/ErrorBoundary'

import AdminBase from './layouts/AdminBase'

import AdminSignIn from './pages/SignIn'
import DashBoard from './pages/DashBoard'
import ADBussinessesManagement from './pages/businesses/ADBussinesses.js'
import ADPost from './pages/posts/ADPost.js'
import Categories from './pages/Categories'
import Professions from './pages/Professions.js'
import ADJobseekerManagement from './pages/accounts/Jobseekers'
import JobSeekerDetail from './pages/accounts/JobseekerDetail'
import ADRecruiterManagement from './pages/accounts/Recruiter'
import RecuiterDetail from './pages/accounts/RecruiterDetail'
import LevelsAndBenefitsManagement from './pages/LevelsAndBenefits'
import ADBusinessDetails from './pages/businesses/ADBusinessDetail'
import ADPostDetail from './pages/posts/ADPostDetail'

import NotFound from './pages/NotFound'
import { Suspense } from 'react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route
        path="signin"
        element={<AdminSignIn />}
        loader={AdminSignIn.loader}
        action={AdminSignIn.action}
      />

      <Route element={<AdminBase />}>
        <Route index element={<DashBoard />} loader={DashBoard.loader} />
        <Route path="posts">
          <Route path="all" element={<ADPost />} loader={ADPost.loader} />
          <Route path="opened" element={<ADPost />} loader={ADPost.loader} />
          <Route path="pending" element={<ADPost />} loader={ADPost.loader} />
          <Route path="expired" element={<ADPost />} loader={ADPost.loader} />
          <Route path="blocked" element={<ADPost />} loader={ADPost.loader} />
          <Route
            path=":id"
            element={<ADPostDetail />}
            loader={ADPostDetail.loader}
          />
        </Route>
        <Route
          path="jobseekers"
          element={<ADJobseekerManagement />}
          loader={ADJobseekerManagement.loader}
        />
        <Route
          path="jobseekers/:jobseekerId"
          element={<JobSeekerDetail />}
          loader={JobSeekerDetail.loader}
        />
        <Route
          path="recruiters"
          element={<ADRecruiterManagement />}
          loader={ADRecruiterManagement.loader}
        />
        <Route
          path="recruiters/:recruiterId"
          element={<RecuiterDetail />}
          loader={RecuiterDetail.loader}
        />
        <Route
          path="levels-benefits"
          element={<LevelsAndBenefitsManagement />}
          loader={LevelsAndBenefitsManagement.loader}
        />
        <Route path="businesses">
          <Route
            path="all"
            element={<ADBussinessesManagement />}
            loader={ADBussinessesManagement.loader}
          />
          <Route
            path="Pending"
            element={<ADBussinessesManagement />}
            loader={ADBussinessesManagement.loader}
          />
          <Route
            path="Approved"
            element={<ADBussinessesManagement />}
            loader={ADBussinessesManagement.loader}
          />
          <Route
            path="Rejected"
            element={<ADBussinessesManagement />}
            loader={ADBussinessesManagement.loader}
          />
          <Route path=":id" element={<ADBusinessDetails />} />
        </Route>
        <Route
          path="categories"
          element={<Categories />}
          loader={Categories.loader}
        />
        <Route
          path="professions"
          element={<Professions />}
          loader={Professions.loader}
        />
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
      {/* <ChatPlugin /> */}
    </Suspense>
  )
}
