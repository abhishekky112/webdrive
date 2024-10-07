import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useDropzone } from 'react-dropzone';
import { submitImage } from '../../firebase/submitServices'; // Adjust the import path as needed
import { useSelector } from 'react-redux';

const AddImages = forwardRef((_, ref) => {
  const [images, setImages] = useState([]);
  const userId=useSelector(state=>state.user.userInfo.uid);

  // Function to handle accepted image files
  const handleDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      const url = URL.createObjectURL(file);
      return { file, url, name: file.name }; // Use original name as default
    });
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Function to handle image deletion
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Function to handle name change
  const handleNameChange = (index, newName) => {
    const updatedImages = images.map((img, i) => 
      i === index ? { ...img, name: newName } : img
    );
    setImages(updatedImages);
  };

  // Initialize the dropzone with image-only acceptance
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*', // Only accept image files
    onDrop: handleDrop,
    multiple: true, // Allow multiple image uploads
  });

  // Expose a submit method to the parent component
  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        const uploadPromises = images.map(img => 
          submitImage({
            imageFile: img.file,
            title: img.name,
             userId
          }) // Pass an object to the submitImage service
        );

        const results = await Promise.all(uploadPromises);
        console.log('Successfully uploaded images with IDs:', results);
        return results; // Return IDs of uploaded images if needed
      } catch (error) {
        console.error('Error submitting images:', error);
        throw error; // Rethrow the error for handling in the component
      }
    }
  }));

  return (
    <div className='p-4 bg-gray-800 border border-gray-700 rounded-lg'>
      <h2 className='text-lg font-semibold text-white mb-4'>Add Images</h2>
      
      <div
        {...getRootProps()}
        className='border-2 border-dashed border-gray-600 p-4 text-center cursor-pointer mb-4'
      >
        <input {...getInputProps()} />
        <p className='text-white'>Drag 'n' drop some images here, or click to select images</p>
      </div>
      
      <div className='grid md:grid-cols-3 gap-4'>
        {images.map((img, index) => (
          <div key={index} className='relative'>
            <img
              src={img.url}
              alt={`preview ${index}`}
              className='w-full h-32 object-cover rounded-md'
            />
            <input
              type='text'
              value={img.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className='absolute bottom-2 left-2 px-2 py-1 bg-gray-900 text-white rounded'
              placeholder='Enter name'
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className='absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default AddImages;
