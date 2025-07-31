/* eslint-disable react/prop-types */
import LazyLoad from 'react-lazyload'
import { useNavigate } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios"
import { useEffect, useState } from 'react';


const Blog = ({ id, title, intro, content, img, tags, isLoggedIn, author, createdAt }) => {

  const [username, setUsername] = useState('')
  const navigateTo = useNavigate()




  useEffect(() => {
    axios.get(`/api/v1/profile/${author}`).then(res => {
      setUsername(res.data.user.username)
    }).catch(err =>
      console.log(err))
  }, [])

  const originalDate = new Date(createdAt)
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = originalDate.toLocaleString("en-US", options);

  // const [toEdit, setToEdit] = useState(false)

  const token = localStorage.getItem("jwt")

  const headers = {
    'Authorization': `Bearer ${token}`
  }

  const handleEditClick = () => {
    // setToEdit(true)
    navigateTo("/profile/edit", { state: { id, title, intro, content, img, tags } })

  }


  const handleDeleteClick = () => {
    axios.delete(`/api/v1/posts/${id}`, { headers }).then(res => {
      console.log(res);
      navigateTo("/profile", { state: { refetchPosts: true } })
    }).catch(err => console.log(err));
  }



  const handleImageClick = () => {
    console.log(username, formattedDate);
    navigateTo(`/blog/${id}`, { state: { username, formattedDate } })
  }



  return (
    <>
      <div className='flex items-center gap-5 justify-center mx-4 my-10'>

        <LazyLoad>
          <div className='flex flex-col items-center justify-center'>
            <img src={img} alt="" className='h-52 object-cover rounded-lg hover:cursor-pointer hover:scale-105 transition my-4' onClick={handleImageClick} />
            {isLoggedIn &&
              <div key={id} className="flex gap-4 my-1">
                <FaRegEdit onClick={handleEditClick} className='text-3xl hover:text-green-600 hover:cursor-pointer' />
                <MdDelete onClick={handleDeleteClick} className='text-3xl hover:text-red-500 hover:cursor-pointer' />
              </div>
            }
          </div>
        </LazyLoad>

        <div className="flex flex-col w-1/3">
          <p className='text-slate-800 text-center my-2'> {username} • {formattedDate}</p>
          <h1 className='text-2xl font-semibold text-center'>{title}</h1>


          <div className="flex  gap-2 flex-wrap justify-center" >
            {tags && tags.map((tag, index) => <p key={index} className='text-sm font-semibold text-center my-1 min-w-20 bg-sky-400 text-slate-800 p-2 rounded-lg'>{tag}</p>)}
          </div>
          <p className='text-lg text-center my-4'>{intro}</p>

        </div>
        <hr className='bg-red-500' />
      </div >
      <hr className='bg-slate-700 h-2 shadow-md w-1/2' />

    </>

  )
}

export default Blog
