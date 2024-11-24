import { COMPANY_API_END_POINT, } from '@/components/constant';
import { setcompanies } from '@/redux/companyslice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const usegetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {


        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                // console.log('called');
                if (res.data.success) {
                    // console.log(res.data);
                    dispatch(setcompanies(res.data.companies))
                }



            } catch (error) {
                console.log("error to fetch all companies ", error)
            }

        }

        fetchCompany();
    }, [dispatch])


}

export default usegetAllCompanies