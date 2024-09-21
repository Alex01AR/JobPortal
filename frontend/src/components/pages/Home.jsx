import React, { useEffect } from 'react'
import Navbar from '../shareable/Navbar'
import HeroSactions from '../Sections/HeroSactions'
import CategoryCarousal from '../Sections/CategoryCarousal'
import LatestJobs from '../Sections/LatestJobs'
import Footer from '../Sections/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth);
  useEffect(() => {
   
    if (user?.role === "recruiter") {
      navigate("/admin/companies")
    }

  }, [])

  useGetAllJobs();
  return (
    <>
      <Navbar />
      <HeroSactions />
      <CategoryCarousal />
      <LatestJobs />
      <Footer />

    </>

  )
}

export { Home }