import React from "react";
import { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rental",
    name: "name",
    bedrooms: "1",
    bathrooms: "1",
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: "0",
    discountPrice: "0",
  });
  const {
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
  } = formData;

  function onChange() {}
  return (
    <main className='max-w-md px-2 mx-auto'>
      <h1 className='text-3xl text-center mt-6'>Create Listing</h1>
      <form className='mb-24'>
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
            onChange={onChange}
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
            onChange={onChange}
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
        <div className='flex space-x-6 justify-start'>
          <div className=''>
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
          <div className=''>
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          >
            No
          </button>
        </div>
        <div className='flex items-center mb-6'>
          <div className=''>
            <p className='text-lg mt-6 font-semibold'>Regular price</p>
            <div className='w-full flex justify-center items-center space-x-6'>
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
