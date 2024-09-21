import React, { useEffect, useState } from 'react'
import Navbar from '../shareable/Navbar'
import { FilterCard } from '../Sections/FilterCard'
import { JobsCard } from '../Sections/JobsCard'
import { useSelector } from 'react-redux';

// const jonArray = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {

  const {allJobs, searchQuery} = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
      if (searchQuery) {
          const filteredJobs = allJobs.filter((job) => {
              return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  job.location.toLowerCase().includes(searchQuery.toLowerCase())
          })
          setFilterJobs(filteredJobs)
      } else {
          setFilterJobs(allJobs)
      }
  }, [allJobs, searchQuery]);



  return (
    <div>
      <Navbar />

      <div className='max-w-7xl mx-auto mt-10'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterCard />
          </div>


          {
           filterJobs?.length <= 0 ? <span>Job are not available </span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                  filterJobs?.map((job) => (
                      <div  key={job?._id}>
                        <JobsCard job={job}/>
                      </div>
                    )) 
                  }


                </div>


              </div>)

          }
        </div>

      </div>











    </div>
  )
}

export default Jobs