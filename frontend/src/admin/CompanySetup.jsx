import { COMPANY_API_END_POINT } from '@/components/constant'
import Navbar from '@/components/shareable/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useGetCompanyByID from '@/hooks/useGetCompanyByID'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const  CompanySetup = () =>  {
  const params = useParams();
  useGetCompanyByID(params.id);


  const [input, setinput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
const [loading,setloading] = useState(false)
// const param = useParams();
const  { singlecompany } = useSelector(store => store.company)
const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setinput({ ...input, file });
  }
const submitHandler = async (e) => {
e.preventDefault();
console.log(input);
const formData = new FormData();
formData.append("name",input.name);
formData.append("description",input.description);
formData.append("location",input.location);
formData.append("website",input.website);
if(input.file)
{
  formData.append("file",input.file);
}

try {
  setloading(true)
  const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
    headers:{
      'Content-Type':'multipart/form-data'
    },
    withCredentials:true
  })

  if(res.data.success){
    toast.success(res.data.message)
    navigate("/admin/companies");
  }



} catch (error) {
  console.log("setup not send ", error);

}finally{
  setloading(false)
}


}



useEffect(() => {
  if (singlecompany) {
    setinput({
      name: singlecompany.name || "",
      description: singlecompany.description || "",
      website: singlecompany.website || "",
      location: singlecompany.location || "",
      file: null
    });
  }
}, [singlecompany]);

if (!singlecompany) {
  return <div>Loading...</div>;
}






  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form  onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-3 text-gray-500 font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>
          <div   className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                className="mt-1"
                value={input.name}
                onChange={changeEventHandler}
              />

            </div>
            <div >
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                className="mt-1"
                value={input.description}
                onChange={changeEventHandler}
              />

            </div>
            <div >
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                className="mt-1"
                value={input.location}
                onChange={changeEventHandler}
              />

            </div>
            <div >
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                className="mt-1"
                value={input.website}
                onChange={changeEventHandler}
              />

            </div>
            <div >
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                className="mt-1"
                
                onChange={changeFileHandler}
              />

            </div>
            
          </div>
          {
                        loading ? <Button className="w-full mt-5 mb-2"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :  <Button type="submit " className="w-full mt-5 mb-2 bg-[#F83002]">Update</Button>
                    }
        </form>
      </div>
    </div>
  )
}

export default CompanySetup