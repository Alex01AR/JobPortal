import { setsearchQuery } from '@/redux/jobslice';
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HeroSactions() {

  const [query, setQuery] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();

const searchJobhandler = () => {
dispatch(setsearchQuery(query));
navigate("/browse")
}

  return (
    <div className='grid align-middle justify-center '>
      <div className='mt-14 text-center'>
        <span className='text-[#F83002] text-1xl  bg-zinc-200 border rounded-full px-5'>No.1 Job Hunt Website</span>
        <h2 className='text-4xl font-bold mt-6'> Search, Apply & Get <br /> Your <span className='text-[#9b29e6]'>Dream Jobs</span></h2>
        <p className='mt-4 '> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio doloribus nulla a velit, culpa atque.</p>
      </div>
      <div className='flex align-middle justify-center mt-7 '>
        <input
          className='border pl-2 outline-none shadow-xl rounded-l-2xl w-4/6'
          type="text"
          onChange={(e) => setQuery(e.target.value) }
          placeholder='Search Here ...'
        />
        <button onClick={searchJobhandler} className='bg-black hover:bg-[#9b29e6]   shadow-xl rounded-r-2xl text-white px-3 py-2'>
          <Search />
        </button>
      </div>

    </div>
  )
}

export default HeroSactions