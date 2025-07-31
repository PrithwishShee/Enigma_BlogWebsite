import contactBg from "../../assets/ContactBG.jpg";
import { Link } from 'react-router-dom';
const Contact = () => {
  return (


    <div id='contact' className="flex items-center justify-center bg-cover advent-pro-medium bg-center h-screen opacity-95" style={{ backgroundImage: `url(${contactBg})` }}>
      <div className='w-1/2 text-center'>
        <h1 className='font-bold text-6xl my-4'>Have Thoughts or Questions? </h1>
        <p className='text-2xl my-4 text-slate-700'>Drop me a line anytime. Whether it's a question, collaboration opportunity, or just to say hi, we are all ears. Reach out via email, phone, or social media. Looking forward to hearing from you!</p>
        <Link to="/contact-form">
          <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100'>
            GET IN TOUCH
          </button>
        </Link>
      </div>
    </div>

  );
};

export default Contact;
