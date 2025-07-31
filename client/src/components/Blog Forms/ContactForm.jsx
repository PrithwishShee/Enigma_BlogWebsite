import React from 'react';
import { Link } from 'react-router-dom';
import authBG from "../../assets/Auth-BG-3.jpg"
import Header from '../Layout/Header';

const ContactForm = () => {
  return (
    <>
      <div className='bg-cover h-full pb-10' style={{ backgroundImage: `url(${authBG})` }}>
        <Header />
        <div className='flex h-full items-center justify-center mx-1/2 w-full'></div>
        <div className=' bg-slate-900 w-1/2 mx-auto p-10 rounded-lg  '>
          <h1 className='text-slate-200 text-4xl text-center'>Drop Us a Line</h1>
          <form action="" className="flex flex-col gap-4 h-full w-full p-5  text-lg">
            <label className='text-[#DBEAFE]'>Name</label>
            <input type="text" name="" id="" className="bg-[#64748B] text-white py-2 px-4  rounded-md " />
            <label className='text-[#DBEAFE]'>Email</label>
            <input type="email" name="" id="" className="bg-[#64748B] text-white py-2 px-4  rounded-md " />
            <label className='text-[#DBEAFE]'>Message</label>
            <textarea className="bg-[#64748B] text-white py-2 px-4  rounded-md  resize-none " rows="3" />
            <button className='bg-green-500 text-white font-semibold py-3 px-6 w-1/2 mx-auto rounded-md  opacity-85 hover:opacity-100'>Submit</button>
          </form>

        </div>
      </div >
    </>
  );
};

export default ContactForm;
