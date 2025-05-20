import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 h-screen w-64 bg-gray-100 p-6 flex flex-col items-center shadow-md'>

      {/* Logo */}
      <div className='mb-10'>
        <Image src={assets.logo} width={120} alt='logo' />
      </div>

      {/* Menu Items */}
      <Link href="/admin/addproduct" className='w-full'>
        <button className='w-full flex items-center gap-3 p-4 border border-red-500 rounded-lg hover:bg-red-100 transition'>
          <Image src={assets.add_icon} alt='icon' />
          <span className='text-black'>Add Product</span>
        </button>
      </Link>

      <Link href="/admin/bloglist" className='w-full'>
        <button className='w-full flex items-center gap-3 p-4 border border-red-500 rounded-lg hover:bg-red-100 transition my-3'>
          <Image src={assets.add_icon} alt='icon' />
          <span className='text-black'>Blogs List</span>
        </button>
      </Link>

      <Link href="/admin/subscriptions" className='w-full'>
        <button className='w-full flex items-center gap-3 p-4 border border-red-500 rounded-lg hover:bg-red-100 transition'>
          <Image src={assets.add_icon} alt='icon' />
          <span className='text-black'>Subscriptions</span>
        </button>
      </Link>

    </div>
  )
}

export default Sidebar
