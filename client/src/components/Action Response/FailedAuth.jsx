import FailedAuthImage from "../../assets/FailedAuth.png"
import Header from '../Layout/Header'
import { useNavigate } from 'react-router-dom'


const FailedAuth = () => {

  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-6xl w-1/2 text-center anton-regular font-semibold'>Invalid Credentials</h1>
        <h1 className='text-2xl w-1/2 text-center'>Sorry, the credentials you entered are incorrect. Please double-check and try again.</h1>
        <img src={FailedAuthImage} alt="" className='object-cover h-80' />
        <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100 my-4' onClick={() => navigate("/")}> Try Again </button>
      </div>
    </>
  )
}

export default FailedAuth
