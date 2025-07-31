import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import authBG from "../../assets/Auth-BG-3.jpg";
import Header from '../Layout/Header';
import Profile from '../Sections/Profile';
import Loader from '../Utils/Loader';


const Register = () => {
  const [userInput, setUserInput] = useState({});
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isRegistered, setIsRegistered] = useState(false);
  const [statusCode, setStatusCode] = useState();
  const [imageFormData, setimageFormData] = useState("")
  const navigateTo = useNavigate()
  // Error States
  const [usernameError, setUsernameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // if (emailError || passwordError || usernameError) {
    //   setLoading(false)
    // }
    // Check if userInput has data before making the request
    if (Object.keys(userInput).length > 0) {
      setLoading(true)
      axios.post("/api/v1/auth/register", userInput)
        .then(res => {
          const token = res.data.token;
          localStorage.setItem("jwt", token);
          setIsRegistered(true);
          setStatusCode(res.status);
          setLoading(false)
          navigateTo("/login-true")
        })
        .catch(err => {
          if (err.response.data.message.code === 11000) {
            // Duplicate error handling
            const invalidField = Object.keys(err.response.data.message.keyPattern)[0]
            console.log(invalidField);
            if (invalidField === "username") {
              setUsernameError("The username has already been taken.")
            } else if (invalidField === "email") {
              setEmailError("This email has already been taken.")
            }
          }
          const errorObject = err.response.data.message.errors;
          for (let key in errorObject) {
            const formattedErrorMsg = errorObject[key].message.replace(/\([^)]*\)/g, '').trim();
            if (key === "username") {
              setUsernameError(formattedErrorMsg);
            } else if (key === "password") {
              setPasswordError(formattedErrorMsg);
            } else if (key === "email") {
              setEmailError(formattedErrorMsg);
            }
          }
        });
    }

  }, [userInput]);

  const submitHandler = async (event) => {
    setLoading(true)
    setEmailError(null);
    setUsernameError(null);
    setPasswordError(null);
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    const response = await uploadImage()
    console.log(response);

    setUserInput({
      username,
      email,
      password,
      dp: response.data.imagePath
    });
    setLoading(false)
  };


  // onChange handler of input:file
  const handleDPChange = (e) => {
    const imageFile = e.target.files[0]
    console.log("State updated", e.target.files[0]);
    const formData = new FormData()
    formData.append('dp', imageFile)
    setimageFormData(formData)
  }

  const uploadImage = () => {

    // Sending the image to our server
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    return axios.post("/api/v1/auth/register/upload", imageFormData, { headers })
  }

  return (
    <>
      {isRegistered && <Profile statusCode={statusCode} />}
      {!isRegistered && (
        <>
          <div className='bg-cover h-full  pb-10' style={{ backgroundImage: `url(${authBG})` }}>
            <Header />
            <div className='flex  items-center justify-center mx-1/2 w-full'></div>
            <div className='bg-slate-900 w-1/3 mx-auto p-10 rounded-lg'>
              <h1 className='text-slate-200 text-4xl text-center'>REGISTER FOR THE BLOG</h1>
              <form className="flex flex-col gap-4 h-full w-full p-5 text-lg" onSubmit={submitHandler}>
                <label className='text-[#DBEAFE]'>Username</label>
                {usernameError && <p className='text-red-500 text-md'>{usernameError}</p>}
                <input required ref={usernameRef} type="text" name="" id="username" className="bg-[#64748B] text-white py-2 px-4 rounded-md" />
                <label className='text-[#DBEAFE]'>Email</label>
                {emailError && <p className='text-red-500 text-md'>{emailError}</p>}
                <input required ref={emailRef} type="email" name="" id="email" className="bg-[#64748B] text-white py-2 px-4 rounded-md" />
                <label className='text-[#DBEAFE]'>Password</label>
                {passwordError && <p className='text-red-500 text-md'>{passwordError}</p>}
                <input required ref={passwordRef} type="password" name="" id="password" className="bg-[#64748B] text-white py-2 px-4 rounded-md" />

                <label className='text-[#DBEAFE]'>Profile Picture</label>
                <input type="file" onChange={handleDPChange} id="file" name="dp" className='bg-slate-200 p-2' />
                {(loading && !usernameError && !passwordError && !emailError) ?
                  <span className='text-center my-2 text-4xl'><Loader /></span>
                  :
                  <button className='bg-green-500 text-white font-semibold py-3 px-6 w-full rounded-md opacity-85 hover:opacity-100'>Sign up</button>
                }

              </form>
              <span className='text-slate-100 hover:text-green-500'><Link to="/login">If you already have an account, you can log in here.</Link></span>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
