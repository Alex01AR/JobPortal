
import { COMPANY_API_END_POINT } from '@/components/constant'
import Navbar from '@/components/shareable/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setsinglecompany } from '@/redux/companyslice'
import { setsingleJob } from '@/redux/jobslice'
import axios from 'axios'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const  CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setcompanyName] = useState()

    const registernewcompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
if(res?.data?.success){
    toast.success(res.data.message);
    dispatch(setsinglecompany(res.data.company));
    const companyid  = res?.data?.createcompany
    ?._id;
    console.log(res);
    navigate(`/admin/companies/${companyid}`);
}

    } catch (error) {
        console.log(error)
    }


}


return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto '>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-500 mb-5'>What would you like to give your comapny name ? You can change this later  </p>
            </div>


            <Label className="font-semibold">Company Name </Label>
            <Input
                type="text"
                className="my-2"
                placeholder="JobHunt ,Microsoft "
                onChange={(e) => { setcompanyName(e.target.value) }}

            />
            <div className='flex items-center gap-3 my-10'>
                <Button variant="outline" onClick={() => navigate("/admin/companies")} >
                    Cancel
                </Button>
                <Button onClick={registernewcompany}>Continue</Button>

            </div>
        </div>
    </div>
)
}

export default CreateCompany