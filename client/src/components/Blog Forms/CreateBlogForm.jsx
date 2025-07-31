import { useEffect, useRef, useState } from 'react'
import Header from '../Layout/Header'
import axios from "axios"
import PostCreated from '../Action Response/PostCreated'
import Loader from '../Utils/Loader'

const CreateBlogForm = () => {
    const [userInput, setUserInput] = useState({})
    const [success, setSuccess] = useState(false)
    const [imageData, setImageData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const titleRef = useRef()
    const introRef = useRef()
    const contentRef = useRef()
    const tagsRef = useRef()
    // const imageRef = useRef()

    const token = localStorage.getItem("jwt")


    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    useEffect(() => {
        if (Object.keys(userInput).length > 0) {
            axios.post("/api/v1/posts", { ...userInput }, { headers }).then(res => {
                console.log(res);
                setIsLoading(false)
                if (res.data.success === true) {
                    setSuccess(true)
                }
            }).catch(err => {
                console.log(err);
            })
        }

    }, [userInput])

    const handleFileChange = (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0])
        setImageData(formData)
        console.log(`Image to be uploaded: ${formData}`);
    }

    const imageUploadHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }
    // console.log(token);

    const uploadImage = () => {
        return axios.post("/api/v1/posts/upload", imageData, { headers: imageUploadHeaders })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setSuccess(false)
        const title = titleRef.current.value;
        const intro = introRef.current.value;
        const content = contentRef.current.value;
        // const image = imageRef.current.value;

        const tagString = tagsRef.current.value;
        const tags = tagString.split(",");

        const uploadRes = await uploadImage();
        console.log(uploadRes.data.imagePath);
        const image = uploadRes.data.imagePath
        // const image = 


        console.log(title, intro, content, image, tags);
        setUserInput({ title, intro, content, image, tags })

    }

    if (success) {
        return <PostCreated />;
    }


    return (



        <div className=" bg-slate-200 h-full  ">
            <Header />
            <div className="flex flex-col justify-between h-full">
                <div className="py-5 px-10">
                    <h1 className='text-6xl text-slate-800 font-bold  text-center my-5'>Create Post</h1>
                    <form onSubmit={handleSubmit} className='shadow-lg bg-white flex flex-col justify-center gap-2 py-6  px-10 w-3/4  mx-auto '>
                        <label className='font-semibold text-xl text-slate-800'>Title</label>
                        <input ref={titleRef} required className=' text-lg text-[#222831]  bg-slate-100 p-3 w-full' type="text" name="" id="title" placeholder='Enter the title of your post' />

                        <label className='font-semibold text-xl text-slate-800'>Intro</label>
                        <input ref={introRef} required className=' text-lg text-[#222831]  bg-slate-100 p-3 w-full' type="text" name="" id="intro" placeholder='Write a brief introduction for your post' />

                        <label className='font-semibold text-xl text-slate-800'>Content</label>
                        <textarea ref={contentRef} required className=' text-lg text-[#222831]  bg-slate-100 p-3 w-full resize-none' name="" id="content" rows="10" placeholder='Compose your post content' />

                        <label className='font-semibold text-xl text-slate-800'>Tags</label>
                        <input ref={tagsRef} className=' text-lg text-[#222831] bg-slate-100 p-3 w-full' type="text" name="" id="tags" placeholder='Enter tags for your post, separated by commas' />

                        <label className='font-semibold text-xl text-slate-800'>Image</label>
                        <input type="file" onChange={handleFileChange} className=' text-lg text-[#222831]  bg-slate-100 p-3 w-full' name="image" id="" placeholder='Choose an image to upload for your post' />

                        {/* <input ref={imageRef} required className=' text-lg text-[#222831]  bgslatebg-slate-100] p-3 w-full' type="text" name="" id="image" /> */}
                        {isLoading ? <div className='text-center my-2 text-4xl'><Loader /></div> : <button className='my-4 w-1/6 rounded-lg mx-auto mb-10 bg-slate-800  p-3 opacity-90 text-white text-lg  hover:opacity-100'>Create</button>}
                    </form >
                </div >
            </div >
        </div >
    )
}

export default CreateBlogForm