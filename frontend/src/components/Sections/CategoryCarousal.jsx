import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchQuery } from '@/redux/jobslice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]



function CategoryCarousal() {
const navigate = useNavigate();
const dispatch = useDispatch();


    const searchJobhandler = (query) => {
        dispatch(setsearchQuery(query));
        navigate("/browse")
        }



    return (
    //     <div>
    //     <Carousel className="w-full max-w-xl mx-auto my-20">
    //         <CarouselContent >
    //             {
    //                 catagory.map((cat, index) => (
    //                     <CarouselItem className="md:basis-1/2 lg-basis-1/3">
    //                         <Button className="rounded-full">{cat}</Button>
    //                     </CarouselItem>
    //                 ))
    //             }
    //         </CarouselContent>
    //         <CarouselPrevious />
    //         <CarouselNext />
    //     </Carousel>
    // </div>
    <div className='flex justify-center mt-14'><Carousel className="w-full  max-w-xl">
    <CarouselContent className="-ml-1">
    {
    category && category.map((cat, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Button 
                onClick={() => searchJobhandler(cat)} 
                variant="outline" 
                className="rounded-full"
            >
                {cat}
            </Button>
        </CarouselItem>
    ))
}

    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
</Carousel></div>
    )
}

export default CategoryCarousal