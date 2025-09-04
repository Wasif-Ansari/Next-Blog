import React from 'react';

const BlogDetailLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-indigo-500 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse" />
      <div className="max-w-5xl mx-auto relative z-10 bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-2xl p-8 sm:p-10 border border-gray-700 shadow-xl animate-pulse">
        <div className="h-10 w-2/3 mx-auto bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded mb-8" />
        <div className="h-6 w-32 mx-auto bg-gray-700 rounded mb-10" />
        <div className="w-full max-w-sm mx-auto h-64 bg-gray-700/60 border border-gray-700 rounded-2xl mb-12" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-4/6" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-3/5" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-2/3" />
        </div>
        <div className="mt-10 flex gap-3">
          <div className="h-6 w-24 bg-gray-700 rounded" />
          <div className="h-6 w-16 bg-gray-700 rounded" />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none select-none [mask-image:radial-gradient(circle_at_center,white,transparent)]" />
      <div className="sr-only" role="status" aria-live="polite">Loading blog content...</div>
    </div>
  );
};

export default BlogDetailLoader;