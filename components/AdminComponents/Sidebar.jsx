import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 h-screen w-64 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg border-r border-fuchsia-500 shadow-xl p-6 flex flex-col items-center'>

      {/* Logo */}
      <div className='mb-10 flex items-center justify-center'>        
        <Image src={assets.logo_light} width={40} height={40} alt='logo' className="filter drop-shadow-[0_0_15px_rgba(217,70,239,0.9)]"/>
        <span className="ml-3 text-xl font-bold text-white drop-shadow-[0_0_15px_rgba(217,70,239,0.9)]">Admin Panel</span>
      </div>

      {/* Menu Items */}
      <Link href="/" className='w-full group mb-3'>
        <div className='w-full flex items-center gap-3 p-4 rounded-lg transition duration-300 ease-in-out hover:bg-fuchsia-600 hover:bg-opacity-50 hover:shadow-neon cursor-pointer'>
          <Image src={assets.arrow} alt='icon' width={24} height={24} className="rotate-180 filter invert group-hover:filter-none transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]" />
          <span className='text-gray-200 group-hover:text-white transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]'>Home</span>
        </div>
      </Link>
      <Link href="/admin/addproduct" className='w-full group'>
        <div className='w-full flex items-center gap-3 p-4 rounded-lg transition duration-300 ease-in-out hover:bg-fuchsia-600 hover:bg-opacity-50 hover:shadow-neon cursor-pointer'>
          <Image src={assets.add_icon} alt='icon' width={24} height={24} className="filter invert group-hover:filter-none transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]" />
 <span className='text-gray-200 group-hover:text-white transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]'>Add Product</span>
        </div>
      </Link>

      <Link href="/admin/bloglist" className='w-full group my-3'>
        <div className='w-full flex items-center gap-3 p-4 rounded-lg transition duration-300 ease-in-out hover:bg-fuchsia-600 hover:bg-opacity-50 hover:shadow-neon cursor-pointer'>
          <Image src={assets.blog_icon} alt='icon' width={24} height={24} className="filter invert group-hover:filter-none transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]" />
 <span className='text-gray-200 group-hover:text-white transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]'>Blogs List</span>
        </div>
      </Link>

      <Link href="/admin/subscriptions" className='w-full group'>
        <div className='w-full flex items-center gap-3 p-4 rounded-lg transition duration-300 ease-in-out hover:bg-fuchsia-600 hover:bg-opacity-50 hover:shadow-neon cursor-pointer'>
          <Image src={assets.email_icon} alt='icon' width={24} height={24} className="filter invert group-hover:filter-none transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]" />
 <span className='text-gray-200 group-hover:text-white transition duration-300 ease-in-out group-hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]'>Subscriptions</span>
        </div>
      </Link>

    </div>
  )
}

export default Sidebar
