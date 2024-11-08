import React, { useEffect } from 'react'
import Navbar from '../shareable/Navbar'
import Jobs from './Jobs'
import { JobsCard } from '../Sections/JobsCard'
import { useDispatch, useSelector } from 'react-redux';
import { setsearchQuery } from '@/redux/jobslice';
import useGetAllJobs from '@/hooks/useGetAllJobs';





function Browse() {

    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setsearchQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto my-auto'>
                <h1 className='my-3 text-1xl font-medium text-[#e34713]'>Search Result ({allJobs.length}) </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>
                {
                        allJobs.map((job) => {
                            return (
                                <JobsCard key={job._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse