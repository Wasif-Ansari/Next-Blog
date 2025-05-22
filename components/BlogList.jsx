"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { blog_data } from "../Assets/assets";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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

      <section className="py-12 md:py-24 relative overflow-hidden">
        <div
          className="absolute top-0 left-85 w-full h-full bg-cover bg-center opacity-80"
          style={{
            backgroundImage: `url('/Hero.jpg')`,
            zIndex: 0,
          }}
        />
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="order-2 md:order-1 flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                <span className="text-blue-400">Explore</span> the Future of
                <span className="text-purple-400"> Tech</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Dive into a world of cutting-edge innovation and discovery.
                Explore the latest trends, insights, and breakthroughs shaping
                our future.
              </p>
              <Link
                href="/#blogs"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg self-start transition duration-300 ease-in-out"
              >
                Begin Your Journey
              </Link>
            </div>
            {/* <div className="order-1 md:order-2 flex justify-center">
              <Image
                src=""
                alt="Future Tech Image"
                width={500}
                height={500}
                className="w-full max-w-md h-auto animate-pulse"
                priority
              />
            </div> */}
          </div>
        </div>
      </section>



      
      <div id="blogs" className="flex flex-wrap justify-center gap-5 p-5">
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
