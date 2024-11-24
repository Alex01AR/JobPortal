import { useState } from 'react'
import Navbar from './components/shareable/Navbar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import { Home } from "./components/pages/Home.jsx"
import Jobs from './components/pages/Jobs'
import Browse from './components/pages/Browse'
import Profile from './components/pages/Profile'
import JobDescription from './components/Sections/JobDescription'
import Companies from './admin/Companies'
import CreateCompany from './admin/CreateCompany'
import CompanySetup from './admin/CompanySetup'
import Job from './admin/Jobs/Job'
import PostJob from './admin/Jobs/PostJob'
import Applicants from './admin/Jobs/Applicants'
import Protect from './admin/Protected'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  //it for admin or recruiter 
  {
    path: '/admin/companies',
    element: <Protect><Companies /></Protect>
  },

  {
    path: '/admin/companies/create',
    element: <Protect> <CreateCompany /></Protect>
  },
  {
    path: '/admin/companies/:id',
    element: <Protect><CompanySetup /></Protect>
  },
  //admin jobs 
  {
    path: '/admin/jobs',
    element: <Protect><Job /></Protect>
  },
  {
    path: '/admin/jobs/post',
    element: <Protect><PostJob /></Protect>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <Protect><Applicants /></Protect>
  },
]);



function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />

    </div>
  )
}

export default App
