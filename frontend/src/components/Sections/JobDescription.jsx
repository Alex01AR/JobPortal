import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../constant';
import { setsingleJob } from '@/redux/jobslice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

function JobDescription() {

  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setsingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);

      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setsingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);



  return (
    <div className='max-w-6xl mx-auto my-10 px-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl '>{singleJob?.title}</h1>

          <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position}  Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType} </Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}_LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`${isApplied ? " font-sans bg-gray-800 " : " text-white  font-sans bg-[#7209b7] hover:bg-[#4a037a]"}`}>{isApplied
            ? <span>Applied </span>
            : <span>Apply Now</span>}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 py-3'>Job Description </h1>
      <div className='my-4 '>
        <h1 className='font-bold my-1 '>Role : <span className='pl-4 font-normal text-gray-800 '>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1 '>Location : <span className='pl-4 font-normal text-gray-800 '>{singleJob?.location} </span></h1>
        <h1 className='font-bold my-1 '>Description : <span className='pl-4 font-normal text-gray-800 '>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1 '>Exprience : <span className='pl-4 font-normal text-gray-800 '>{singleJob?.expreinceLevel}yrs</span></h1>
        <h1 className='font-bold my-1 '>Salery : <span className='pl-4 font-normal text-gray-800 '>{singleJob?.salary}_LPA</span></h1>
        <h1 className='font-bold my-1 '>Total Applicant: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1 '>Posted Date : <span className='pl-4 font-normal text-gray-800 '>{singleJob?.createdAt.split("T")[0]}</span></h1>



      </div>

    </div>
  )
}

export default JobDescription