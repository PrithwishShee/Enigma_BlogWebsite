import { useState } from 'react';
import Header from '../Layout/Header';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditBlogForm = () => {
    const location = useLocation();
    const { id, title, intro, content, img, tags } = location.state;
    const navigateTo = useNavigate();

    const [userInput, setUserInput] = useState({
        title: title,
        intro: intro,
        content: content,
        img: img,
        tags: tags,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "tags") {
            setUserInput(prevInput => ({ ...prevInput, tags: value.split(',') }));
        } else {
            setUserInput(prevInput => ({ ...prevInput, [name]: value }));
        }
    };

    const token = localStorage.getItem("jwt");

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const editBlog = (e) => {
        e.preventDefault();
        axios.patch(`/api/v1/posts/${id}`, { ...userInput }, { headers }).then(res => {
            if (res.status === 200) {
                navigateTo("/profile/edited");
            }
        }).catch(err => console.log(err));
    };

    return (
        <div className='bg-slate-200 h-full'>
            <Header />
            <div className="flex flex-col justify-between h-full">
                <div className="py-5 px-10">
                    <h1 className='text-6xl text-slate-800 font-bold text-center my-5'>Edit Blog</h1>
                    <form onSubmit={editBlog} className='shadow-lg bg-white flex flex-col justify-center gap-2 py-6 px-10 w-3/4 mx-auto mb-8'>
                        <label className='font-semibold text-xl text-slate-800'>Title</label>
                        <input
                            value={userInput.title}
                            onChange={handleInputChange}
                            required
                            className='text-lg text-[#222831] bg-slate-100 p-3 w-full rounded-lg'
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Enter the title of your post'
                        />

                        <label className='font-semibold text-xl text-slate-800'>Intro</label>
                        <input
                            value={userInput.intro}
                            onChange={handleInputChange}
                            required
                            className='text-lg text-[#222831] bg-slate-100 p-3 w-full rounded-lg'
                            type='text'
                            name='intro'
                            id='intro'
                            placeholder='Write a brief introduction for your post'
                        />

                        <label className='font-semibold text-xl text-slate-800'>Content</label>
                        <textarea
                            value={userInput.content}
                            onChange={handleInputChange}
                            required
                            className='text-lg text-[#222831] bg-slate-100 p-3 w-full resize-none rounded-lg'
                            name='content'
                            id='content'
                            rows='10'
                            placeholder='Compose your post content'
                        />

                        <label className='font-semibold text-xl text-slate-800'>Tags</label>
                        <input
                            value={userInput.tags}
                            onChange={handleInputChange}
                            className='text-lg text-[#222831] bg-slate-100 p-3 w-full rounded-lg'
                            type='text'
                            name='tags'
                            id='tags'
                            placeholder='Enter tags (comma-separated)'
                        />

                        <label className='font-semibold text-xl text-slate-800'>Image URL</label>
                        <input
                            value={userInput.img}
                            onChange={handleInputChange}
                            required
                            className='text-lg text-[#222831] bg-slate-100 p-3 w-full rounded-lg'
                            type='text'
                            name='img'
                            id='image'
                            placeholder='Enter the image URL for your post'
                        />

                        <button
                            type='submit'
                            className='my-4 w-1/4 mx-auto bg-slate-800 p-3 text-white text-lg font-bold rounded-lg hover:opacity-90'
                        >
                            Edit Blog
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditBlogForm;
