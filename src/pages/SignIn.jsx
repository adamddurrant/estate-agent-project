import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" }); //initial state of form input
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    //when text is inputted into form, update formData state
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("You're signed in 👌");
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Bad user credentials, try again 💪");
    }
  }

  return (
    <section>
      <div className='flex justify-center flex-wrap h-screen' id='container'>
        <div
          className=' md:w-[55%] lg:w-[55%] bg-sign-in bg-cover bg-center'
          id='col-left'
        ></div>
        <div
          className='flex flex-col w-full md:w-[45%] lg:w-[45%] items-center justify-center'
          id='col-right'
        >
          <h1 className='text-3xl text-center mt-6 mb-3'>Sign in</h1>
          <p className='text-sm sm:text-lg mb-6 text-center max-sm:px-5'>
            Please sign in securely with the homely.io portal to view your saved
            properties.
          </p>
          <form
            onSubmit={onSubmit}
            className='flex flex-col justify-center w-full px-20 max-md:px-5 max-sm:px-5'
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
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                value={password}
                onChange={onChange}
                placeholder='Password'
                className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                required='required'
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
              )}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg max-md:flex max-md:flex-col max-sm:flex-row text-center'>
              <p className='mb-6 max-md:mb-0 max-sm:mb-6'>
                Don't have an account?
                <Link
                  to='/sign-up'
                  className='text-red-600 transition duration-200 ease-in-out hover:text-red-700 ml-1'
                >
                  Register
                </Link>
              </p>
              <p className='md:mb-6'>
                <Link
                  to='/forgot-password'
                  className='text-blue-600 transition duration-200 ease-in-out  hover:text-blue-800 '
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'
              type='submit'
            >
              Sign in
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
