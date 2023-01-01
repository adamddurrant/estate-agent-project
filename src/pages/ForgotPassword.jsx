import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); //initial state of form input

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset sent, check your inbox");
    } catch (error) {
      toast.error("Could not send password reset");
    }
  }

  return (
    <section>
      <div className='flex justify-center flex-wrap h-screen' id='container'>
        <div
          className=' md:w-[55%] lg:w-[55%] bg-sign-in bg-cover'
          id='col-left'
        ></div>
        <div
          className='flex flex-col w-full md:w-[45%] lg:w-[45%] items-center justify-center'
          id='col-right'
        >
          <h1 className='text-3xl text-center mt-6 mb-3'>Forgot Password</h1>
          <p>
            It happens to us all, get your password reset with the form below.
          </p>
          <form
            onSubmit={onSubmit}
            className='flex flex-col justify-center w-full px-20'
          >
            <input
              type='email'
              id='email'
              value={email}
              onChange={onChange}
              placeholder='Email address'
              className='mb-4 mt-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              required='required'
            />
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>
                Don't have an account?
                <Link
                  to='/sign-up'
                  className='text-red-600 transition duration-200 ease-in-out hover:text-red-700 ml-1'
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to='/sign-in'
                  className='text-blue-600 transition duration-200 ease-in-out hover:text-blue-800'
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'
              type='submit'
            >
              Send password reset
            </button>
            <div className='my-4 before:border-t flex before:flex-1 items-center before:border-grey-300  after:border-t  after:flex-1  after:border-grey-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
