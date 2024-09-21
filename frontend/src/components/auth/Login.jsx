import React, { useEffect } from 'react'
import Navbar from '../shareable/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import {USER_API_END_POINT } from "../constant"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authslice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const { loading, user} = useSelector(store => store.auth);
const dispatch = useDispatch()
    const navigate  = useNavigate()
    const [input, setInput] = useState({

        email: "",
        password: "",
        role: "student",

    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const submitHandler = async (e) => {

        e.preventDefault();
        
      
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.loggedInUser)); 
                navigate("/");
                toast.success(res.data.message);
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message);
   } finally{
    dispatch(setLoading(false));
   }

 }

 useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

    return (
        <div >
            <Navbar />
            <div className='flex align-middle justify-center mt-8 '>
                <form onSubmit={submitHandler}>
                    <h1 className='font-bold text-2xl mb-5 tracking-wide text-[#F83002] text-center'>Login</h1>
                    <div className='my-3 w-80'>
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


                    {
                        loading ? <Button className="w-full mt-5 mb-2"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :  <Button type="submit " className="w-full mt-5 mb-2 bg-[#F83002]">Login</Button>
                    }
                    <span className='text-sm '>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link></span>
                </form>
            </div>

        </div>
    )
}

export default Login