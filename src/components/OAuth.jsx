import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    //async because it returns a promise
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //check if user exists
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      //if it doesn't exist, add it to db otherwise return toast
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("You're all signed up 🥳");
      navigate("/");
    } catch (error) {
      toast.error("Oops, we couldn't authorise with Google");
    }
  }

  return (
    <button
      onClick={onGoogleClick}
      type='button'
      className='flex items-center justify-center w-full bg-red-600 py-3 text-white rounded uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out'
    >
      <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
      Continue with Google
    </button>
  );
}
