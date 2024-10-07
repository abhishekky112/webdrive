import React, { useState } from 'react';
import AddCode from '../AddCreate/AddCodes';
import AddFiles from '../AddCreate/AddFiles';
import AddImages from '../AddCreate/AddImages';
import AddNotes from '../AddCreate/AddNotes';
import AddLinks from '../AddCreate/AddLinks';
import classNames from 'classnames';

// Mapping form types to components
const componentMap = {
  0: AddCode,
  1: AddFiles,
  2: AddImages,
  3: AddNotes,
  4: AddLinks,
};

// Mapping form types to their names
const formNames = {
  0: 'Code',
  1: 'File',
  2: 'Image',
  3: 'Note',
  4: 'Link',
};

export default function AddPage() {
  const [selectedComp, setSelectedComp] = useState('');
  const [formRefs, setFormRefs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddForm = () => {
    const compIndex = parseInt(selectedComp);
    if (isNaN(compIndex) || !componentMap[compIndex]) {
      setErrorMessage('Please select a valid form type to add.');
      return;
    }

    const newFormRef = React.createRef();
    setFormRefs((prevRefs) => [...prevRefs, { type: compIndex, ref: newFormRef }]);
    setSelectedComp('');
    setErrorMessage('');
  };

  const handleSubmitAll = async () => {
    const submitPromises = formRefs.map(({ ref }) => {
      if (ref.current && typeof ref.current.submit === 'function') {
        return ref.current.submit();
      }
      return Promise.reject(new Error('Submit method not found'));
    });

    try {
      await Promise.all(submitPromises);
      alert('All forms submitted successfully');
      
      // Reset the page after submission
      setFormRefs([]);
      setSelectedComp('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error in submitting forms: ' + error.message);
    }
  };

  const handleDeleteForm = (index) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      setFormRefs((prevRefs) => prevRefs.filter((_, i) => i !== index));
    }
  };

  return (
    <div className='flex items-center h-full flex-col bg-gray-900 w-full overflow-auto p-6'>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className='flex flex-col gap-4 w-full'>
        {formRefs.map(({ type, ref }, index) => {
          const Component = componentMap[type];
          return (
            <div key={index} className='p-4 bg-gray-800 border border-white rounded-lg gap-4 items-center'>
              <Component ref={ref} onSubmit={(data) => console.log(data)} />
              <button
                onClick={() => handleDeleteForm(index)}
                className='rounded py-1 border border-red-600 hover:bg-red-100 text-red-600'
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      <div className='flex items-center gap-2 mt-6 pb-5'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="formType" className="text-white text-lg font-semibold">Select Form Type:</label>
          <select
            id="formType"
            value={selectedComp}
            onChange={(e) => setSelectedComp(e.target.value)}
            className='px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white'
          >
            <option value="" disabled>Select form type</option>
            {Object.keys(formNames).map(key => (
              <option key={key} value={key}>
                {formNames[key]}
              </option>
            ))}
          </select>

          <button onClick={handleAddForm} className='mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
            Add Form
          </button>
        </div>

        <button onClick={handleSubmitAll} className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
          Submit All Forms
        </button>
      </div>
    </div>
  );
}
