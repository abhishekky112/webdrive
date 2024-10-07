import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { submitLink } from '../../firebase/submitServices'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';

const AddLinks = forwardRef((_, ref) => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState(''); // State for description
  const userId = useSelector(state => state.user.userInfo.uid);

  const handleAddLink = () => {
    if (title && url) {
      setLinks([...links, { title, url, description }]); // Include description
      setTitle('');
      setUrl('');
      setDescription(''); // Clear description after adding
    } else {
      alert('Both title and URL are required.');
    }
  };

  const handleDeleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  // Expose a submit method to the parent component
  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        for (const link of links) {
          await submitLink({ title: link.title, url: link.url, description: link.description, userId }); // Include description
        }
        console.log('Links submitted successfully:', links);
        setLinks([]); // Clear links after submission
      } catch (error) {
        console.error('Error submitting links:', error);
      }
    }
  }));

  return (
    <div className='p-6 bg-gray-800 text-white'>
      <div className='mb-4 gap-2 flex flex-col md:flex-row'>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full p-2 rounded-md bg-gray-900 border border-gray-700 text-white'
          placeholder='Enter link title'
        />
       
        <input
          id='url'
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='w-full p-2 rounded-md bg-gray-900 border border-gray-700 text-white'
          placeholder='Enter link URL'
        />
        
        <input
          id='description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full p-2 rounded-md bg-gray-900 border border-gray-700 text-white'
          placeholder='Enter link description'
        />
      </div>

      <button
        onClick={handleAddLink}
        className='mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
      >
        Add Link
      </button>

      <div className='mt-4 md:flex-row flex gap-5 flex-wrap flex-col'>
        {links.map((link, index) => (
          <div key={index} className='gap-3 p-2 bg-gray-700 border border-gray-600 rounded flex items-center justify-between'>
            <div>
              <a href={link.url} target='_blank' rel='noopener noreferrer' className='text-blue-400'>{link.title}</a>
              <p className='text-gray-300'>{link.description}</p> {/* Display description */}
            </div>
            <button
              onClick={() => handleDeleteLink(index)}
              className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default AddLinks;
