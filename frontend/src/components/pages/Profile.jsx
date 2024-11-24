import React, { useEffect, useState } from 'react'
import Navbar from '../shareable/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'

import AppliedJobtable from '../Sections/AppliedJobtable'
import UpdateProfileDialog from '../Sections/UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'


const isresume = true;


function Profile() {
    useGetAllAppliedJobs();
    const [open, setopen] = useState(false);

    const { user } = useSelector(store => store.auth);//error after update elemnt not show in profile 

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl bg-white border border-gray-200 rounded-2xl p-8 my-5 mx-auto px-5'>
                <div className='flex justify-between'>
                    <div className='flex items-center  gap-4'>
                        <Avatar className="rounded-full h-20 w-20 bg-black " >
                            <AvatarImage src="https://i.pinimg.com/564x/1d/91/05/1d910522b6046c321b096274dfe0ed0c.jpg" alt="user profile image" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl '>{user?.fullName}</h1>
                            <p className='text-sm text-gray-600'>{user?.profile?.bio} </p>
                        </div>


                    </div>
                    <Button onClick={() => setopen(true)} className="text-right " variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className=' my-5 '>
                    <div className='flex items-center gap-4 '>
                        <Mail />
                        <span>{user?.email} </span>
                    </div>
                    <div className='flex items-center gap-4 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber} </span>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <h1 className='text-lg '>Skills </h1>
                    {
                        user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className={"text-sm"}>{item}</Badge>) : <span>Not Found</span>
                    }
                </div>
                <div>
                    <div className='grid w-full max-w-sm mt-5 items-center gap-1.5'>
                        <Label className="text-md font-bold ">  Resume </Label>
                        {
                            isresume ? <a className='text-blue-600 text-sm' target="blank" href={user?.profile?.resume}>{user?.profile?.resumeOringinalName}</a>
                                : <span className='text-blue-600 text-sm'>Resume Not Found </span>
                        }
                    </div>
                    <hr className='my-2' />
                </div>

            </div>
            <div className='mt-6 max-w-4xl mx-auto '>
                <h1 className='font-bold text-lg my-5'>Applied Job</h1>
                <AppliedJobtable />
            </div>
            <UpdateProfileDialog open={open} setopen={setopen} />
        </div>
    )
}

export default Profile