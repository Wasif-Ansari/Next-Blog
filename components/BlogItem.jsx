import { assets } from '../Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({title, description, category, image, id}) => {
  // console.log("image: ", image);
  return (
    <div className='max-w-[330px] bg-white border border-black hover:shadow[-7px_7px_0px_#000000]'>
    <Link href={`/blogs/${id}`}>
    <Image alt='Blog_image' src={image} width={400} height={400} className='border-b border-black'/>
    </Link> 
    <p className='text-white bg-black'>{category}</p>
    <div className='p-5'>
        <h5 className='text-blue-500'>{title}</h5>
            <p className='text-black'>{description}</p>
            <Link href={`/blogs/${id}`}className='text-black inline-flex items-center py-2 '>
                Read more.. <Image alt='Readmore' src={assets.arrow}/>
            </Link>
    </div>
    
    </div>
  )
}

export default BlogItem