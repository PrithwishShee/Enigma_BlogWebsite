import LandingBG from "../../assets/LandingBG.jpg";
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <>
      <div className="bg-cover p-5 my-15 bg-center h-screen" style={{ backgroundImage: `url(${LandingBG})` }}>
        <div className='flex gap-10 flex-col h-full justify-center items-center w-[50%] mx-auto'>
          <h1 className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-7xl anton-regular font-bold text-center'>Ignite Your Creativity with the World of Blogging</h1>
          <p className='text-slate-300 text-2xl my-2 text-center titillium-web-regular'>Step into a realm where imagination knows no bounds. This is a vibrant community where every voice is celebrated. Whether you're a seasoned wordsmith or just starting out, you can always find inspiration and support here. Happy Blogging!</p>
          <Link to="/register">
            <button className='bg-gradient-to-r from-amber-500 to-pink-500 text-slate-300 py-4 px-6 font-semibold rounded-lg text-xl opacity-90 hover:opacity-100' >
              Sign up for Free
            </button>
          </Link>
        </div>
      </div >

    </>
  );
};

export default Landing;
