"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const BlogDetailLoader = dynamic(() => import('@/components/BlogDetailLoader'), { ssr: false });
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogdata = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params:{
          id: params.id
        }
      });
      setData(response.data);
    } catch (err) {
      console.error('Failed to fetch blog', err);
    } finally {
      // Small artificial delay for smoother skeleton perception
      setTimeout(()=> setLoading(false), 400);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched Blog Data:", data);
    }
  }, [data]);

  useEffect(() => {
    fetchBlogdata();
  }, []);


  if (loading) {
    return <BlogDetailLoader />;
  }

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

          {data.image && (
            <div className="mb-10 w-full max-w-3xl mx-auto">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl transition-transform duration-500 ease-in-out hover:scale-[1.01] bg-gray-900/40">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 70vw, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-code:text-pink-400 prose-blockquote:border-l-purple-500">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
    ) : null
  )
}

export default page;
