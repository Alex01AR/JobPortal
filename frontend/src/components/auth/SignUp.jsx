import React, { useEffect, useState } from 'react'
import Navbar from '../shareable/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { USER_API_END_POINT } from "../constant.js"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authslice'
import { Loader2 } from 'lucide-react'




const SignUp = () => {

    const navigate = useNavigate()
    const { loading,user} = useSelector(store => store.auth);
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "student",
        file: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {

        e.preventDefault();
        console.log(input);
        let formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast(res.data.message);
            }


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);




        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    // const submitHandler = async (e) => {
    //     e.preventDefault();
       

    //     // Create a plain JavaScript object
    //     const formData = {
    //         fullName: input.fullName,
    //         email: input.email,
    //         phoneNumber: input.phoneNumber,
    //         password: input.password,
    //         role: input.role,
    //     };

    //     // Include file data if present
    //     if (input.file) {
    //         formData.file = input.file;
    //     }

    //     try {
    //         dispatch(setLoading(true));
    //         const res = await axios.post(`${USER_API_END_POINT}/register`, JSON.stringify(formData), {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true,
    //         });

    //         if (res.data.success) {
    //             navigate("/login");
    //             toast(res.data.message);
    //         }

    //     } catch (error) {
    //          console.log(error);
    //         toast.error(error.message);
    //     }finally{
    //         dispatch(setLoading(false));
    //     }
    // };


    return (
        <div >
            <Navbar />
            <div className='flex align-middle justify-center mt-8 '>
                <form onSubmit={submitHandler}>
                    <h1 className='font-bold text-2xl mb-5 tracking-wide text-[#F83002] text-center'>Sign Up</h1>
                    <div className='my-3 grid w-80'>
                        <Label>Full Name</Label>
                        <Input
                            className='mt-1'
                            type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventHandler}
                            placeholder="Alex"
                        />
                    </div>
                    <div className='my-3'>
                        <Label>Email</Label>
                        <Input
                            className='mt-1'
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="email@gamil.com"
                        />
                    </div>
                    <div className='my-3'>
                        <Label>Phone Number</Label>
                        <Input
                            className='mt-1'
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="phone Number"
                        />
                    </div>
                    <div className='my-1'>
                        <Label>Password</Label>
                        <Input
                            className='mt-1'
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password"
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center justify-between mt-1 gap-5'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="student"
                                    name="role"

                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer mt-1"
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer mt-1"
                                />
                                <Label className='' htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='mt-1'>
                        <Label>Profile Image</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer mt-1"
                        />
                    </div>

                   
                    {
                        loading ? <Button className="w-full mt-5 mb-2"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :  <Button type="submit " className="w-full mt-5 mb-2 bg-[#F83002]">Sign up</Button>
                    }
                    <span className='text-sm '>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>

        </div>
    )
}

export default SignUp