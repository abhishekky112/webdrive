import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { submitFile } from '../../firebase/submitServices'; // Adjust the import path as needed
import { useSelector } from 'react-redux';

const AddFiles = forwardRef((_, ref) => {
  const [files, setFiles] = useState([]);
  const userId=useSelector(state=>state.user.userInfo.uid);

  // Function to handle accepted files
  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({ file, title: file.name })); // Set title to original file name
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Function to handle file deletion
  const handleDeleteFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // Function to handle title change
  const handleTitleChange = (index, newTitle) => {
    const updatedFiles = files.map((file, i) => 
      i === index ? { ...file, title: newTitle } : file
    );
    setFiles(updatedFiles);
  };

  // Initialize the dropzone
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop: handleDrop,
    multiple: true, // Allow multiple file uploads
  });

  // Expose a submit method to the parent component
  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        const uploadPromises = files.map(fileObj => 
          submitFile({ file: fileObj.file, title: fileObj.title, userId }) // Call the submitFile service
        );

        const results = await Promise.all(uploadPromises);
        console.log('Successfully uploaded files with IDs:', results);
        return results; // Return IDs of uploaded files if needed
      } catch (error) {
        console.error('Error submitting files:', error);
        throw error; // Rethrow the error for handling in the component
      }
    }
  }));

  return (
    <div className='p-4 m-2 bg-gray-800 border border-gray-700 rounded-lg'>
      <h2 className='text-lg font-semibold text-white mb-4'>Add Files</h2>
      
      <div
        {...getRootProps()}
        className={classNames('border-2 border-dashed border-gray-600 p-4 text-center cursor-pointer mb-4', {
          'bg-blue-700': isDragActive,
          'bg-gray-500': isFocused
        })}
      >
        <input {...getInputProps()} />
        <p className='text-white'>Drag 'n' drop some files here, or click to select files</p>
      </div>
      
      <ul className='list-disc p-2 text-white'>
        {files.map((fileObj, index) => (
          <li key={index} className='flex flex-col mb-4 border-[1px] p-2 rounded-xl border-gray-400 border-opacity-50'>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <span className='text-white'>{fileObj.file.name}</span>  
              <input
                type='text'
                value={fileObj.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                placeholder='Enter title'
                className='mt-2 p-2 border border-gray-600 rounded-md bg-gray-700 text-white'
              />
              <button
                onClick={() => handleDeleteFile(index)}
                className='ml-2 p-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default AddFiles;
