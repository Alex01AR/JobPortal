import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authslice';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../constant';

function UpdateProfileDialog({ open, setopen }) {
   
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    // const user = useSelector(state => state.auth.user);
// console.log(user);
    const [input, setinput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skills => skills),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        // const jsonData = {
        //     fullName: input?.fullName,
        //     email: input?.email,
        //     phoneNumber: input?.phoneNumber,
        //     bio: input?.bio,
        //     skills: input?.skills,
        //     // file: input?.file ? input.file.name : null // Just send the filename, or you can handle file upload separately
        // };
// console.log("inputskill",input.skills);
// console.log("inputbio",input.bio);


        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }


        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1] );
        }
        try {

setLoading(true);

            const res = await axios.post(`${USER_API_END_POINT}/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }
            
            );
            


            if (res.data.success) {
                // console.log(res.data.user);
                dispatch(setUser(res.data.user));
            //    console.log(res.data.user);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        finally{
            setLoading(false)
        }
        setopen(false);``
        console.log(input);
    };
    const fileHandler =  (e) => {
        const file = e.target.files?.[0];
        setinput({ ...input, file })
    }


    // useEffect(() => {
    //     if (!user) {
    //         dispatch(fetchUser());
    //     }
    // }, [dispatch, user, open]);




    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setopen(false)} >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>
           update your Profile
          </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4 '>
                                <Label htmlFor="FullName" className='text-right'> Name</Label>
                                <Input
                                    id="name"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                                    className="col-span-3"


                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 '>
                                <Label htmlFor="email" className='text-right'>email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"


                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 '>
                                <Label htmlFor="number" className='text-right'> Number</Label>
                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"


                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 '>
                                <Label htmlFor="bio" className='text-right'> Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"


                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 '>
                                <Label htmlFor="skills" className='text-right'> Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"


                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 '>
                                <Label htmlFor="file" className='text-right'> Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                 type="file"
                                    accept="application/pdf"
                                    onChange={fileHandler}
                                    className="col-span-3"


                                />
                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full mt-5 mb-2"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit " className="w-full mt-5 mb-2 bg-[#F83002]">update</Button>
                            }
                        </DialogFooter>

                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog