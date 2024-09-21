import Navbar from '@/components/shareable/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setsearchCompanyBytext } from '@/redux/companyslice'

import AdminJobTable from './AdminJobTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setsearchJobByText } from '@/redux/jobslice'

const Job = () => {
    useGetAllAdminJobs()
    const [input, setinput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setsearchJobByText(input))
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10' >
                <div className='flex justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="filter by Name and Role"
                        onChange={(e) => setinput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/post")}  >Post New Jobs</Button>
                </div>
                <AdminJobTable />
            </div>
        </div>
    )
}

export default Job