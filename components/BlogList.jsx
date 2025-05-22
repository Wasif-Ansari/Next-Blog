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
    setBlogs(response.data.blogs)
  }

  useEffect(()=>{
    fetchBlogsfromAPI();
  },[])

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5 p-5">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              : "text-gray-400 hover:text-white transition-colors duration-300"
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")} // Changed case to match filtering
          className={
            menu === "Technology" // Consistent class for selected state
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              : "text-gray-400 hover:text-white transition-colors duration-300"
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("startup")}
          className={
            menu === "startup"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              : "text-gray-400 hover:text-white transition-colors duration-300"
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
 ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              : "text-gray-400 hover:text-white transition-colors duration-300"
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
