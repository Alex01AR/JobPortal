import { COMPANY_API_END_POINT,  } from '@/components/constant';
import { setsinglecompany } from '@/redux/companyslice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetCompanyByID(companyID) {
    const dispatch = useDispatch();
// console.log(companyID);it run multiple time {for every word input in form update comapny}
    useEffect(() => {


        const fetchsingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyID}`, { withCredentials: true });
                if (res.data.success) {
                    // console.log(res.data.company); it run multiple time {for every word input in form update comapny}
                    dispatch(setsinglecompany(res.data.company))
                }



            } catch(error) {
                console.log("error to fetch alljobs", error)
            }

        }

        fetchsingleCompany();
    }, [companyID,dispatch])


}

export default useGetCompanyByID