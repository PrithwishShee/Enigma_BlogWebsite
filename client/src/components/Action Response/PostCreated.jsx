import React from 'react'
import SuccessfulPostCreation from "../../assets/PostCreationComplete.png"
import { useNavigate } from 'react-router-dom'
import Header from '../Layout/Header'

const PostCreated = () => {
    const navigate = useNavigate()
    return (
        <>
            <Header />

            <div className=' flex flex-col items-center h-screen justify-center my-10 gap-5'>
                <h1 className='text-6xl'>POST CREATION SUCCESSFUL</h1>
                <img src={SuccessfulPostCreation} className='h-72' alt="" />
                <button onClick={() => { navigate("/") }} className='bg-slate-900 py-4 px-10 opacity-90 text-white text-xl font-bold hover:opacity-100'>Home</button>
            </div>
        </>
    )
}

export default PostCreated
