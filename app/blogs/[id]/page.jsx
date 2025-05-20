"use client";
import { blog_data } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogdata = async () => {
    const response = await axios.get("/api/blog", {
      params:{
        id: params.id
      }
    });
    setData(response.data);
  };

  // const fetchBlogdata = () => {
  //   for (let i = 0; i < blog_data.length; i++) {
  //     if (Number(params.id) === blog_data[i].id) {
  //       setWasif(blog_data[i]);
  //       console.log(blog_data[i]);
  //       // console.log("data:  : ", data); 
  //       // cant do this as its not ready yet from react side

  //       break;
  //     }
  //   }
  // };

  useEffect(() => {
    if (data) {
      console.log("Fetched Blog Data:", data);
    }
  }, [data]);

  // want to execute fetchBlogdata whenevre the component is loaded hence using useEffect

  useEffect(() => {
    fetchBlogdata();
  }, []);


 return (
    data?<>
    <div className="text-black items-center justify-between text-center p-5 bg-gray-200">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div className="inline-block bg-black text-white p-2 rounded-md my-3">
            {data.category}
        </div>
        <Image src={data.image} width={100} height={100} alt="" className="border-2 border-black p-2 my-3" />
        <p className="p-3 my-2">{data.description}</p>
        <div>
            
        </div>
    </div>
    </>:<></>
  )
}

export default page;
