import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useDispatch } from 'react-redux';
import { setsearchQuery } from '@/redux/jobslice';
import { Label } from '../ui/label';


const fitlerData = [

  {
    fitlerType: "Location",
    array: ["Delhi", "Benglure", "Hydrabad", "Lucknow", "pune"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend", "Backend", "DataScience", "FullStack", "Ai&Ml"]
  },
  {
    fitlerType: "sallery",
    array: ["0-40k", "40k-50k", "50k-60k", "60k-70k", "70k-90k"]
  }

]


function FilterCard() {

  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(() => {
    dispatch(setsearchQuery(selectedValue));
  }, [selectedValue]);


  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-2' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          fitlerData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>

    </div>
  )
}

export { FilterCard }