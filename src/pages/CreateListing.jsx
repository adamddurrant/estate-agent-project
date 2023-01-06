import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false); //brings spinner
  const [formData, setFormData] = useState({
    type: "rental",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountPrice: 0,
    images: {},
  });

  const {
    // destructuring to access the above hook variable
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountPrice,
    images,
  } = formData;

  function onSubmit(e) {
    //validate submission
    e.preventDefault();
    setLoading(true);
    if (discountPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price should be less than your regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images");
      return;
    }
  }

  async function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }
    // files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // text/boolean/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <main className='max-w-md px-2 mx-auto'>
      <h1 className='text-3xl text-center mt-6'>Create Listing</h1>
      <form onSubmit={onSubmit} className='mb-24'>
        <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
        <div className='flex'>
          <button
            className={`${
              type === "rental"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='type'
            value='sale'
            type='button'
            onClick={onChange}
          >
            Sell
          </button>
          <button
            className={`${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='type'
            value='rental'
            type='button'
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        <p className='text-lg mt-6 font-semibold'>Name</p>
        <input
          type='text'
          value={name}
          id='name'
          onChange={onChange}
          placeholder='Name'
          maxLength='32'
          minLength='10'
          required
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white focus:border-slate-600 focus:bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700'
        />
        <div className='flex space-x-6'>
          <div className='w-full'>
            <p className='text-lg mt-6 font-semibold'>Beds</p>
            <input
              type='number'
              id='bedrooms'
              value={bedrooms}
              onChange={onChange}
              min='1'
              max='50'
              required
              className='w-full text-center px-6 py-2 text-xl text-gray-700 bg-white focus:border-slate-600 focus:bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700'
            />
          </div>
          <div className='w-full'>
            <p className='text-lg mt-6 font-semibold'>Baths</p>
            <input
              type='number'
              id='bathrooms'
              value={bathrooms}
              onChange={onChange}
              min='1'
              max='50'
              required
              className='w-full text-center px-6 py-2 text-xl text-gray-700 bg-white focus:border-slate-600 focus:bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700'
            />
          </div>
        </div>
        <p className='text-lg mt-6 font-semibold'>Off-street parking?</p>
        <div className='flex'>
          <button
            className={`${
              !parking === true
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='parking'
            value={true}
            type='button'
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`${
              !parking === false
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='parking'
            value={false}
            type='button'
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className='text-lg mt-6 font-semibold'>Furnished?</p>
        <div className='flex'>
          <button
            className={`${
              !furnished === true
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='furnished'
            value={true}
            type='button'
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`${
              !furnished === false
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='furnished'
            value={false}
            type='button'
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className='text-lg mt-6 font-semibold'>Address</p>
        <textarea
          type='text'
          value={address}
          id='address'
          onChange={onChange}
          placeholder='address...'
          required
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white focus:border-slate-600 focus:bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700'
        />

        <p className='text-lg mt-6 font-semibold'>Description</p>
        <textarea
          type='text'
          value={description}
          id='description'
          onChange={onChange}
          placeholder='description...'
          required
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white focus:border-slate-600 focus:bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700'
        />
        <p className='text-lg mt-6 font-semibold'>Offer</p>
        <div className='flex'>
          <button
            className={`${
              !offer === true
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='offer'
            value={true}
            type='button'
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`${
              !offer === false
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            } rounded px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full`}
            id='offer'
            value={false}
            type='button'
            onClick={onChange}
          >
            No
          </button>
        </div>
        <div className='flex items-center mb-6'>
          <div className=''>
            <p className='text-lg mt-6 font-semibold'>Regular price</p>
            <div className='w-full flex items-center space-x-6'>
              <input
                type='number'
                id='regularPrice'
                value={regularPrice}
                onChange={onChange}
                min='10000'
                max='9999999'
                required
                className='w-full text-center px-6 py-2 text-xl text-gray-700 bg-white focus:border-slate-600 focus:bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700'
              />
              {type === "rental" && (
                <div>
                  <p className='text-md w-full whitespace-nowrap'>£ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className='flex items-center mb-6'>
            <div className=''>
              <p className='text-lg mt-6 font-semibold'>Discount price</p>
              <div className='w-full flex justify-center items-center space-x-6'>
                <input
                  type='number'
                  id='discountPrice'
                  value={discountPrice}
                  onChange={onChange}
                  min='10000'
                  max='9999999'
                  required={offer}
                  className='w-full text-center px-6 py-2 text-xl text-gray-700 bg-white focus:border-slate-600 focus:bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700'
                />
                {type === "rental" && (
                  <div>
                    <p className='text-md w-full whitespace-nowrap'>
                      £ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className=''>
          <p className='text-lg mt-6 font-semibold'>Images</p>
          <p className='text-sm mb-2 text-gray-600'>
            The first image uploaded will be the cover (max 6 images)
          </p>
          <input
            type='file'
            id='images'
            onChange={onChange}
            accept='.jpg,.png,.jpeg'
            multiple
            required
            className='w-full py-3.5 b-white text-gray-700 px-3 border-gray-300 rounded border transition ease-in-out duration-150'
          />
        </div>
        <button
          className='w-full bg-blue-600 text-white px-7 mt-12 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'
          type='submit'
        >
          Create listing
        </button>
      </form>
    </main>
  );
}
