import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import ModalLoader from './components/ModalLoader'
// import ChatPlugin from './components/ChatPlugin'
import ErrorBoundary from './components/ErrorBoundary'

import Base from './layouts/Base'
import JSProfileLayout from './layouts/JSProfileLayout'

import Home from './pages/Home'
import Posts from './pages/Posts'
import Chat from './pages/Chat'
import PostDetails from './pages/PostDetails.js'
import BusinessDetails from './pages/BusinessDetails'
import OTPVerification from './pages/OtpVerification.js'
import ViewResumeJS from './pages/ViewResumeJS.js'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import JSDashboard from './pages/JSDashboard'
import JSProfile from './pages/JSProfile'
import Resumes from './pages/Resumes'
import FavoritePosts from './pages/FavoritePosts'
import Notifications from './pages/Notifications'
import JSSettings from './pages/JSSettings'
import RecentApplications from './pages/RecentApplications'
import Businesses from './pages/Businesses'
import CategoriesJS from './pages/Categories'

import NotFound from './pages/NotFound'
import { Suspense } from 'react'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route
        path="signin"
        element={<SignIn />}
        loader={SignIn.loader}
        action={SignIn.action}
      />
      <Route
        path="signup"
        element={<SignUp />}
        loader={SignUp.loader}
        action={SignUp.action}
      />
      <Route
        path="account/verify"
        element={<OTPVerification />}
        loader={OTPVerification.loader}
        action={OTPVerification.action}
      />
      <Route path="chat" element={<Chat />} loader={Chat.loader} />

      <Route path="view-resume/:id" element={<ViewResumeJS />} />
      <Route element={<Base />}>
        <Route index element={<Home />} loader={Home.loader} />
        <Route
          path="posts"
          element={<Posts />}
          // loader={Posts.loader}
        />
        <Route
          path="posts/:id"
          element={<PostDetails />}
          loader={PostDetails.loader}
        />
        <Route
          path="businesses"
          element={<Businesses />}
          // loader={Businesses.loader}
        />
        <Route
          path="businesses/:id"
          element={<BusinessDetails />}
          loader={BusinessDetails.loader}
        />
        <Route path="categories" element={<CategoriesJS />} />

        <Route path="jobseeker" element={<JSProfileLayout />}>
          <Route index element={<JSDashboard />} loader={JSDashboard.loader} />
          <Route
            path="profile"
            element={<JSProfile />}
            loader={JSProfile.loader}
          />
          <Route path="resumes" element={<Resumes />} loader={Resumes.loader} />
          <Route
            path="favorite-posts"
            element={<FavoritePosts />}
            loader={FavoritePosts.loader}
          />
          <Route
            path="recent-applications"
            element={<RecentApplications />}
            loader={RecentApplications.loader}
          />
          <Route
            path="notifications"
            element={<Notifications />}
            loader={Notifications.loader}
          />
          <Route
            path="settings"
            element={<JSSettings />}
            loader={JSSettings.loader}
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
      {/* <ChatPlugin /> */}
    </Suspense>
  )
}
