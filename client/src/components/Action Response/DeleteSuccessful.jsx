// import React from 'react'
// import Deleted from "../../assets/Deletion-successful.png"
import Deleted from "../../assets/Deletion-successful.png"
// import Header from '../Layout/Header'
import { useNavigate } from 'react-router-dom'

const DeleteSuccessful = () => {
    const navigateTo = useNavigate()
    return (
        <>
            <div className=' flex flex-col items-center justify-center h-screen my-10 gap-5'>
                <h1 className='text-6xl'>BLOG DELETED SUCCESSFULLY</h1>
                <img src={Deleted} className='h-72' alt="" />
                <button onClick={() => { navigateTo("/") }} className='bg-slate-900 py-4 px-10 opacity-90 text-white text-xl font-bold hover:opacity-100'>Home</button>
            </div>
        </>)

}


export default DeleteSuccessful
