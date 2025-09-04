import { assets } from '../Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({ title, description, category, image, id }) => {
  const shortDescription = description.slice(0, 120) + '...'

  return (
    <Link
      href={`/blogs/${id}`}
      className='group block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 rounded-xl'
    >
      <article className='cursor-pointer w-full h-full p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden backdrop-filter backdrop-blur-lg flex flex-col justify-between relative min-w-0'>
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
        }} />
        <div className="relative h-48 overflow-hidden rounded-md">
          <Image
            alt={title}
            src={image}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            loading="lazy"
          />
        </div>
        <div className='mt-5 flex items-center gap-2'>
          <span className='text-[11px] tracking-wide uppercase bg-black/70 px-3 py-1 rounded-full text-fuchsia-300 border border-fuchsia-500/30'>
            {category}
          </span>
        </div>
        <div className='pt-4 flex flex-col flex-grow'>
          <h5 className='text-blue-500 text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors'>
            {title}
          </h5>
          <p className='text-white/90 text-sm mb-4 line-clamp-3'>
            {shortDescription}
          </p>
          <span className='mt-auto text-blue-400 inline-flex items-center text-sm font-medium group-hover:text-blue-300 transition-colors'>
            Read more <Image alt='Readmore' src={assets.arrow} width={14} height={14} className='ml-2 filter invert group-hover:translate-x-1 transition-transform duration-200' />
          </span>
        </div>
      </article>
    </Link>
  )
}

export default BlogItem