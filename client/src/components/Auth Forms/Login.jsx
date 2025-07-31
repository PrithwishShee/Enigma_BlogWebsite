import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authBG from "../../assets/Auth-BG-3.jpg";
import Header from '../Layout/Header';
import axios from 'axios';
import Profile from '../Sections/Profile';
import FailedAuth from '../Action Response/FailedAuth';

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusCode, setStatusCode] = useState();
  const [error, setError] = useState(false);
  const navigateTo = useNavigate()

  useEffect(() => {
    // Check if userInput has data before making the request
    if (Object.keys(userInput).length > 0) {
      axios.post("/api/v1/auth/login", userInput)
        .then(res => {
          console.log(res);
          const token = res.data.token;
          localStorage.setItem("jwt", token);
          setIsLoggedIn(true);
          setStatusCode(res.status);
          navigateTo("/login-true")
        })
        .catch(err => {
          setError(true);
          console.log(err);
        });
    }
  }, [userInput]);

  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    setUserInput({
      username,
      email,
      password
    });
  };

  if (error) {
    return <FailedAuth />;
  }

  return (
    <>
      {isLoggedIn ? <Profile statusCode={statusCode} /> :
        <>
          <div className='bg-cover h-full  pb-10' style={{ backgroundImage: `url(${authBG})` }}>
            <Header />
            <div className='flex  items-center justify-center mx-1/2 w-full'></div>
            <div className='bg-slate-900 w-1/3 mx-auto p-10 rounded-lg'>
              <h1 className='text-slate-200 text-4xl text-center'>LOGIN FOR THE BLOG</h1>
              <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full p-5 text-lg">
                <label className='text-[#DBEAFE]'>Name</label>
                <input required ref={usernameRef} type="text" name="" id="username" className="bg-[#64748B] text-white py-2 px-4 rounded-md" />
                <label className='text-[#DBEAFE]'>Email</label>
                <input required ref={emailRef} type="email" name="" id="email" className="bg-[#64748B] text-white py-2 px-4 rounded-md" />
                <label className='text-[#DBEAFE]'>Password</label>
                <input required ref={passwordRef} type="password" name="" id="password" className="bg-[#64748B] text-white py-2 px-4 rounded-md mb-4" />
                <button className='bg-green-500 text-white font-semibold py-2 px-4 w-full rounded-md opacity-85 hover:opacity-100'>Log in</button>
              </form>
              <span className='text-white hover:text-green-500 block text-center mt-4'> <Link to="/register">New here? Click to register.</Link></span>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Login;
