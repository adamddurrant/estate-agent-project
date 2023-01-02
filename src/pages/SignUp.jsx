import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); //initial state of form input
  const { name, email, password } = formData;
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
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("You're all signed up 🥳");
      navigate("/");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("The email address is already registered 🤷‍♂️");
      } else {
        console.log(error.message);
        toast.error("Oops Registration failed, try again 😅");
      }
    }
  }

  return (
    <section>
      <div className='flex justify-center flex-wrap h-screen' id='container'>
        <div
          className=' md:w-[55%] lg:w-[55%] bg-sign-up bg-cover bg-center'
          id='col-left'
        ></div>
        <div
          className='flex flex-col w-full md:w-[45%] lg:w-[45%] items-center justify-center'
          id='col-right'
        >
          <h1 className='text-3xl text-center mt-6 mb-3'>Sign up</h1>
          <p className='text-sm sm:text-lg mb-6 px-5 text-center'>
            Sign up to get all the benefits of using the homely.io website.
          </p>
          <form
            className='flex flex-col justify-center w-full px-20 max-md:px-5 max-sm:px-5'
            onSubmit={onSubmit}
          >
            <input
              type='text'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Full name'
              className='mt-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              required='required'
            />
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
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg max-md:flex-col max-sm:flex-row text-center'>
              <p className='mb-6 max-md:mb-0 max-sm:mb-6'>
                Have an account?
                <Link
                  to='/sign-in'
                  className='text-red-600 transition duration-200 ease-in-out hover:text-red-700 ml-1'
                >
                  Sign in
                </Link>
              </p>
              <p className='max-md:mb-6'>
                <Link
                  to='/forgot-password'
                  className='text-blue-600 transition duration-200 ease-in-out hover:text-blue-800'
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'
              type='submit'
            >
              Sign up
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
