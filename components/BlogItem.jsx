import { assets } from '../Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({ title, description, category, image, id }) => {
  const shortDescription = description.slice(0, 120) + '...'

  return (
    <div className='w-full sm:w-[calc(50%-20px)] md:w-[calc(33%-20px)] lg:w-[calc(25%-20px)] p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden backdrop-filter backdrop-blur-lg flex flex-col justify-between group relative'>
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
      }}></div>
      <Link href={`/blogs/${id}`} className="relative block h-48 overflow-hidden rounded-md">
        <Image
          alt='Blog_image'
          src={image}
          fill={true}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          loading="lazy"
        />
      </Link>
      <button className='text-white bg-black px-4 py-1 inline-block mt-5 rounded-full'>{category}</button>
      <div className='p-5 flex flex-col flex-grow'>
        <h5 className='text-blue-500 text-lg font-bold mb-2'>{title}</h5>
        <p className='text-white text-sm mb-3 flex-grow'>{shortDescription}</p>
        <Link href={`/blogs/${id}`} className='text-blue-500 inline-flex items-center py-2 self-start hover:cursor-pointer transition-colors duration-200'> {/* Adjusted color and alignment */}
          Read more <Image alt='Readmore' src={assets.arrow} width={12} height={12} className='ml-2 filter invert group-hover:translate-x-1 transition-transform duration-200'/> {/* Added width/height and margin to arrow */}
        </Link>
      </div>
    </div>
  )
}

export default BlogItem