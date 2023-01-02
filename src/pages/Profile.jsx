import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    toast.success("Signed out successfully ✌️");
    navigate("/");
  }
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center my-6'>Homely Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name input */}
            <input
              type='text'
              id='name'
              value={name}
              disabled
              className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6'
            />
            {/* eEmail input */}
            <input
              type='text'
              id='email'
              value={email}
              disabled
              className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
            />
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg my-6'>
              <p className='flex items-center'>
                Change username?{" "}
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                  Edit username
                </span>
              </p>
              <p
                onClick={onLogout}
                className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer'
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
