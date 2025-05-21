"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { blog_data } from "../Assets/assets";
import axios from "axios";

const   BlogList = () => {
  const [menu, setMenu] = useState("All");

  const [blogs, setBlogs] = useState([]);

  const fetchBlogsfromAPI = async ()=>{
    const response = await axios.get("/api/blog");
    console.log("response: ", response.data.blogs);
    setBlogs(response.data.blogs)
  }

  useEffect(()=>{
    fetchBlogsfromAPI();
  },[])

  return (
    <div>
      <div className="flex flex-row gap-5 p-5">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All"
              ? "border border-red-400 bg-white text-black font-bold py-1 px-4 rounded-sm"
              : "border border-red-400 px-5 cursor-pointer"
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? " border border-red-400 bg-white text-black font-bold py-1 px-4 rounded-sm"
              : "border border-red-400 px-5 cursor-pointer"
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("startup")}
          className={
            menu === "startup"
              ? "border border-red-400 bg-white text-black font-bold py-1 px-4 rounded-sm"
              : "border border-red-400 px-5 cursor-pointer"
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "border border-red-400 bg-white text-black font-bold py-1 px-4 rounded-sm"
              : "border border-red-400 px-5 cursor-pointer"
          }
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10">
        {blogs.filter((item)=>menu==="All"? true:item.category===menu).map((item, index) => {
          return (
            <BlogItem
              id={item._id}
              key={index}
              image={item.image}
              description={item.description}
              title={item.title}
              category={item.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
