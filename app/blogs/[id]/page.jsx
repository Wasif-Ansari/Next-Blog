"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const BlogDetailLoader = dynamic(() => import('@/components/BlogDetailLoader'), { ssr: false });
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

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
      // Normalize Windows CRLF to LF so markdown + breaks process correctly
      if (response.data && typeof response.data.description === 'string') {
        response.data.description = response.data.description.replace(/\r\n/g, '\n');
      }
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
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-code:text-pink-400 prose-blockquote:border-l-purple-500 whitespace-pre-line">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                em: ({node, ...props}) => <em className="text-fuchsia-300" {...props} />,
                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                h1: ({node, ...props}) => <h1 className="mt-8 mb-4 text-3xl font-bold text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="mt-8 mb-4 text-2xl font-semibold text-white" {...props} />,
                h3: ({node, ...props}) => <h3 className="mt-6 mb-3 text-xl font-semibold text-white" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-fuchsia-500/60 pl-4 italic text-fuchsia-200 mb-6" {...props} />,
                code: ({inline, className, children, ...props}) => (
                  <code className={`${inline ? 'px-1 py-0.5 rounded bg-gray-800 border border-gray-700 text-pink-300' : 'block p-4 rounded bg-gray-900 border border-gray-700 text-pink-300 overflow-x-auto'} ${className||''}`} {...props}>
                    {children}
                  </code>
                )
              }}
            >
              {data.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
    ) : null
  )
}

export default page;
