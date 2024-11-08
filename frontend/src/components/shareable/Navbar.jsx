import React from 'react'
import { Popover, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { PopoverContent } from '../ui/popover'
// import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../constant'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function Navbar() {

  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        
        toast.success(res.data.message);
        console.log("logout successfully");


      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);

    }
  }


  return (
    <div>
      <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
        <div><h1 className='text-2xl font-bold'>Job<span className='text-[#9b29e6]'>Portal</span></h1></div>
        <div className='flex items-center gap-12'>

          <ul className='flex font-medium  gap-5 items-center'>
            {
              user && user.role === "recruiter" ? (
                <>
                  <li><Link to="/admin/companies" > Companies</Link></li>
                  <li> <Link to="/admin/jobs" >Jobs</Link> </li>
                </>
              ) : (
                <>
                  <li><Link to="/"> Home</Link></li>
                  <li> <Link to="/jobs">Jobs</Link> </li>
                  <li> <Link to="/Browse">Browse</Link> </li>
                </>
              )
            }

          </ul>
          {
            !user ? (
              <div className='flex gap-4'>
                <Link to="/login"><Button className='bg-[#F83002]'>Login</Button></Link>
                <Link to="/signup"> <Button className='bg-[#F83002]' >SignUp</Button></Link>


              </div>
            ) : (
              <Popover >
                <PopoverTrigger asChild>
                  <Avatar className='rounded-full cursor-pointer' >
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className=' w-80' >
                  <div className='flex gap-4 space-y-2'>
                    <Avatar className='rounded-full cursor-pointer' >
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-medium ' >{user?.fullName}</h4>
                      <p className='text-sm font-light'>Lorem ipsum dolor sit, amet consect</p>
                    </div>
                  </div>
                  {
                    user && user.role === "recruiter" ? null :
                      <div className=' mt-2 flex w-fit items-center  cursor-pointer' >
                        <User2 />
                        <Button variant="link"><Link to="/profile">View Profile</Link ></Button>
                      </div>
                  }

                  <div className='flex w-fit items-center cursor-pointer  ' >
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </PopoverContent>
              </Popover>)
          }


        </div>

      </div>

    </div>
  )
}

export default Navbar