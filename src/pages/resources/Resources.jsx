import useAxiosPublic from '@/hooks/useAxiosPulblic';
import React, { useEffect, useState } from 'react';

const Resources = () => {
    const [blogs,setBlogs]=useState(null)
    const axiosPublic=useAxiosPublic()
    useEffect(()=>{
        const fetchBlogs=async()=>{
            const res=await axiosPublic.get("/freepdf/freeblogs")
        console.log(res.data)
            if(res?.data){
                setBlogs(res.data)
            }
         
        }
        fetchBlogs()
    }
    ,[])

    console.log(blogs)
    return (
        <div>
            Resources
        </div>
    );
};

export default Resources;