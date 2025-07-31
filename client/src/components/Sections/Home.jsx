import Navbar from '../Layout/Navbar'
import Landing from './Landing'
import Blogs from '../Blog/Blogs';
import Contact from "../Blog Forms/Contact";
import { useEffect, useState } from 'react';


const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const token = localStorage.getItem("jwt")

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    }
  }, [token])


  return (
    <>
      <Navbar />
      {isLoggedIn ?
        <>
          <Blogs />
          <Contact />
        </> :
        <Landing />
      }


    </>
  )
}

export default Home