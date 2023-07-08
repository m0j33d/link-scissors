import { Navigate, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import illustartion from '../assets/images/illustration.gif'
import { store } from "../redux/store";

const Home = () => {
  const logged_in =  store.getState().logged_in;

  if (logged_in) return <Navigate to="/shortner" />

  return (
    <>
      <Navbar />

      <div className='flex w-screen h-full'>
        <section className='md:w-1/2 my-12 md:my-auto mx-6 md:mx-12'>
          <h1 className='text-4xl md:text-6xl font-extrabold py-2 leading-tight'> Shrink, Track and Share Your Links </h1>
          <p className='text-base md:text-xl py-4 md:pr-24 font-light leading-snug'>
            Shorten web links with our URL shortening services, so you can share the link more easily.
            We'll also create a QR code for each shortened link and provide analytics for your campaign.
          </p>

          <div className='my-8'>
            <Link to="/register" className='bg-[#0087CB] px-6 py-4 my-4 hover:bg-[#3757c0] rounded-full text-white'>
              Get Started for free
            </Link>
          </div>
        </section>
        <section className='w-1/2 m-auto p-18 pr-24 hidden md:block'>
          <img src={illustartion} alt="Illustration" />
        </section>
      </div>

    </>
  );
};

export default Home;