import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);

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
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update name in firestore db
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Username updated!");
    } catch (error) {
      toast.error("could not update");
    }
  }

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center my-6'>Your Homely Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name input */}
            <label>Username</label>
            <input
              type='text'
              id='name'
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetail && "bg-green-200 focus:bg-green-200"
              }`}
            />
            {/* eEmail input */}
            <label>Email address</label>
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
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'
                >
                  {changeDetail ? "Apply change" : "Edit username"}
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
          <button
            type='submit'
            className='flex items-center justify-center w-full bg-blue-600 py-3 text-white rounded uppercase text-sm font-medium hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'
          >
            <Link
              className='flex justify-center items-center'
              to='/create-listing'
            >
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
