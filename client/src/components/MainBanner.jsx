import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative w-full h-[320px] md:h-[420px] lg:h-[520px]'>
      <img
        src="https://media.istockphoto.com/id/1288664808/photo/fresh-fruits-and-vegetables-frame-on-white-background-copy-space.jpg?s=612x612&w=0&k=20&c=FXvl0KNXxtVPfmZvjcvyrJhsMGP0JeqMAgGiX2V8W7c="
        alt="banner"
        className='w-full h-full object-cover border-4 border-primary rounded-lg shadow-lg'
      />

      <div className='absolute inset-0 flex flex-col justify-center items-end pr-4 md:pr-16 lg:pr-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-right max-w-65 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 bg-white/70 p-2 rounded'
        >
          Fresh Groceries, Fast Delivery, Big Savings.
        </h1>

        <div className='flex items-center mt-6 font-medium'>
          <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
            Shop now
            <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
