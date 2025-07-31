import React from 'react'
import Header from '../Layout/Header'
import BlogEditSuccess from "../../assets/JobEditedSuccessfully.png"
import { useNavigate } from 'react-router-dom'

const SuccessfulBlogEdit = () => {
    const navigateTo = useNavigate()
    return (
        <>
            <div className=' flex flex-col items-center justify-center h-screen my-10 gap-5'>
                <h1 className='text-6xl'>BLOG EDITED SUCCESSFULLY</h1>
                <img src={BlogEditSuccess} className='h-72' alt="" />
                <button onClick={() => { navigateTo("/") }} className='bg-slate-900 py-4 px-10 opacity-90 text-white text-xl font-bold hover:opacity-100'>Home</button>
            </div>
        </>)

}


export default SuccessfulBlogEdit
