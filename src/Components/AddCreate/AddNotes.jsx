import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { submitNote } from '../../firebase/submitServices'; // Adjust the import path as needed
import { useSelector } from 'react-redux';

const AddNotes = forwardRef((_, ref) => {
  const [notes, setNotes] = useState([{ title: '', content: '' }]);
  const userId=useSelector(state=>state.user.userInfo.uid);

  // Function to handle title and content changes
  const handleChange = (index, field, value) => {
    const updatedNotes = notes.map((note, i) => 
      i === index ? { ...note, [field]: value } : note
    );
    setNotes(updatedNotes);
  };

  // Function to add a new note
  const handleAddNote = () => {
    setNotes([...notes, { title: '', content: '' }]);
  };

  // Function to delete a note
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Expose a submit method to the parent component
  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        const uploadPromises = notes.map(note => 
          submitNote({ title: note.title, content: note.content, userId }) // Call the submitNote service
        );

        const results = await Promise.all(uploadPromises);
        console.log('Successfully uploaded notes with IDs:', results);
        return results; // Return IDs of uploaded notes if needed
      } catch (error) {
        console.error('Error submitting notes:', error);
        throw error; // Rethrow the error for handling in the component
      }
    }
  }));

  return (
    <div className='p-4 m-2 bg-gray-800 border border-gray-700 rounded-lg'>
      <h2 className='text-lg font-semibold text-white mb-4'>Add Notes</h2>
      
      {notes.map((note, index) => (
        <div key={index} className='mb-4 p-2 border border-gray-600 rounded-md'>
          <input
            type='text'
            value={note.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            placeholder='Enter title'
            className='w-full p-2 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white'
          />
          <textarea
            value={note.content}
            onChange={(e) => handleChange(index, 'content', e.target.value)}
            placeholder='Enter content'
            className='w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white'
            rows={4}
          />
          <button
            onClick={() => handleDeleteNote(index)}
            className='mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      ))}
      
      <button
        onClick={handleAddNote}
        className='mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600'
      >
        Add Another Note
      </button>
    </div>
  );
});

export default AddNotes;
