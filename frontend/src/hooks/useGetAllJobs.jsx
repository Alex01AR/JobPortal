import { JOB_API_END_POINT } from '@/components/constant';
import { setallJobs } from '@/redux/jobslice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


function useGetAllJobs() {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.job);

    useEffect(() => {


        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setallJobs(res.data.jobs))
                }


            } catch (error) {
                console.log("error to fetch alljobs", error)
            }

        }

        fetchAllJobs();
    }, [])


}

export default useGetAllJobs