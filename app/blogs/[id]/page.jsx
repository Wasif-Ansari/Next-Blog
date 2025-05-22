"use client";
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

  useEffect(() => {
    if (data) {
      console.log("Fetched Blog Data:", data);
    }
  }, [data]);

  useEffect(() => {
    fetchBlogdata();
  }, []);


  return (
    data ? (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-blob"></div><div className="absolute bottom-20 right-1/4 w-40 h-40 bg-indigo-500 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="max-w-6xl mx-auto relative z-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-8 sm:p-10 border border-gray-700 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-tight mb-4">
              {data.title}
            </h1>
            <div className="inline-block bg-purple-600 bg-opacity-70 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md tracking-wide">
              {data.category}
            </div>
          </div>

          {data.image&&(
            <div className="mb-10 w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-gray-700 shadow-2xl transform transition-transform duration-500 ease-in-out hover:scale-105 relative">
              <Image
                src={data.image}
                width={400}
                height={250}
                alt={data.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
            <p>{data.description}</p>
            <h2>Section Heading</h2>
            <p>
              This is some additional content to demonstrate how paragraphs and headings will look with the futuristic styling. We can add more detail here about the blog post topic.
            </p>
            <blockquote>This is a blockquote with a subtle glow effect. It highlights important information or quotes within the blog content.</blockquote>
          </div>
        </div>
      </div>
    ) : null
  )
}

export default page;
