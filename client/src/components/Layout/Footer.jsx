import React from 'react'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (

    <div id='footer' className='relative bottom-0  w-full bg-black p-2 flex flex-col items-center justify-center'>
      <div className="icons flex gap-4 text-xl my-4">
        <FaSquareXTwitter className='text-white hover:text-green-600 hover:cursor-pointer' />
        <FaLinkedin className='text-white hover:text-green-600 hover:cursor-pointer' />
        <FaGithub className='text-white hover:text-green-600 hover:cursor-pointer' />
        <SiGmail className='text-white hover:text-green-600 hover:cursor-pointer' />
      </div>
      <p className='text-white'>Copyright © {currentYear} <span className='advent-pro-medium text-red-600 text-xl shadow-lg'> TheBlogger</span> </p>
    </div>

  )
}

export default Footer
