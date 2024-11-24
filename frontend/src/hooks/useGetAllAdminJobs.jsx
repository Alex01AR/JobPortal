import { JOB_API_END_POINT } from '@/components/constant';
import { setallAdminJobs, setallJobs } from '@/redux/jobslice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllAdminJobs() {
    const dispatch = useDispatch();

    useEffect(() => {


        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, { withCredentials: true });
                // console.log("admin");
                if (res.data.success) {
                    // console.log(res.data);
                    dispatch(setallAdminJobs(res.data.jobs))
                }


            } catch (error) {
                console.log("error to fetch alladminjobs", error)
            }

        }

        fetchAllAdminJobs();
    }, [])


}

export default useGetAllAdminJobs