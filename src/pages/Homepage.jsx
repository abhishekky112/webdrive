import React from 'react';
import { Header } from '../Components/Header';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const userInfo=useSelector(state=>state.user.userInfo)
  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4 bg-gradient-to-r from-zinc-500 to-zinc-700">
        
        {/* Welcome Section */!userInfo ?
        <section className="bg-gradient-to-r from-zinc-700 to-zinc-700 shadow-md rounded-lg p-6 mb-6 w-full text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Our App!</h1>
          <p className="mb-4 text-sm md:text-base">
            This is a platform where you can manage your codes, files, links, notes, and images seamlessly.
          </p>
          <p className="mb-4 text-sm md:text-base">
            Sign up to explore all the features and take control of your digital content.
          </p>
          <div className='flex w-full justify-center gap-4'>
            <NavLink to="/signin" className="bg-white text-blue-500 rounded-lg px-4 py-2 md:px-6 md:py-3 hover:bg-gray-200 transition duration-200">
              SignIn
            </NavLink>
            <NavLink to="/signup" className="bg-white text-blue-500 rounded-lg px-4 py-2 md:px-6 md:py-3 hover:bg-gray-200 transition duration-200">
              SignUp
            </NavLink>
          </div>
          
        </section>:
                <section className="bg-gradient-to-r from-zinc-700 to-zinc-700 shadow-md rounded-lg p-6 mb-6 w-full text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome <span className='text-green-400'>{userInfo.displayName}!</span></h1>
                <img className='mx-auto rounded-full border-zinc-900 border-2' src={userInfo.photoURL} alt="" />
                <p className="m-4 text-sm md:text-base text-yellow-200">
                  {userInfo.email}
                </p>

                <NavLink to="/dashboard" className="bg-white text-blue-500 rounded-lg px-4 py-2 md:px-6 md:py-3 hover:bg-gray-200 transition duration-200">
                  Go to Dashboard
                </NavLink>
              </section>
}
        <div className='p-10 flex md:flex-row flex-col w-full gap-12 item-strech'>
          {/* Features Section */}
          <section className=" bg-gradient-to-r from-gray-500 to-gray-700 shadow-md rounded-lg p-6 w-full max-w-3xl text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside text-sm md:text-base">
              <li>🌟 Organize your files and codes effortlessly</li>
              <li>🌟 Access your notes from anywhere</li>
              <li>🌟 Share links easily with friends</li>
              <li>🌟 Manage images efficiently</li>
              <li>🌟 Search functionality for quick access</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className=" bg-gradient-to-r from-zinc-800 to-zinc-500 shadow-md rounded-lg p-6 w-full max-w-3xl text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4 text-sm md:text-base">
              If you have any questions, feel free to reach out to us at:
            </p>
            <a href="mailto:support@ourapp.com" className="text-white hover:underline">
              support@ourapp.com
            </a>
          </section>
        </div>

        {/* Additional Section */}
        <section className="bg-gradient-to-r from-gray-400 to-zinc-500 shadow-md rounded-lg p-6 w-full text-center text-white mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="mb-4 text-sm md:text-base">
            Our app offers a seamless experience with a focus on user-friendly design and robust features. Here are a few reasons to choose us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white text-black rounded-lg p-4 shadow">
              <h3 className="font-semibold">User-Friendly Interface</h3>
              <p>Navigate through our app with ease and efficiency.</p>
            </div>
            <div className="bg-white text-black rounded-lg p-4 shadow">
              <h3 className="font-semibold">Secure Cloud Storage</h3>
              <p>Your data is securely stored and backed up in the cloud.</p>
            </div>
            <div className="bg-white text-black rounded-lg p-4 shadow">
              <h3 className="font-semibold">24/7 Customer Support</h3>
              <p>We're here to assist you whenever you need help.</p>
            </div>
            <div className="bg-white text-black rounded-lg p-4 shadow">
              <h3 className="font-semibold">Regular Updates</h3>
              <p>We continuously improve our app based on user feedback.</p>
            </div>
          </div>
        </section>

        {/* Outlet for SignIn/SignUp */}
        <Outlet />
      </div>
    </>
  );
};

export default Homepage;
