import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Model } from '../Model';
import classNames from 'classnames';

const Images = ({ data, onDelete, view }) => {
  const [showModel, setModel] = useState(false);
  const date = new Date(data.createdAt.seconds*1000 );
  const dateString = date.toLocaleString();
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${data.title}"?`)) {
      await onDelete(data.url, "images", data.id);
    }
  };

  return (
    <>
      <div className={classNames("mx-auto p-5 max-h-56 h-fit hover:shadow-[0px_0px_1px_1px_white] bg-zinc-900 rounded-xl overflow-clip w-full md:w-96 flex flex-col",{'min-w-full':view=='list'})}>
        <div className="flex items-center justify-between mb-2">
          <h1 className='text-md font-semibold text-blue-400'>{data.title || "Untitled"}</h1>
          <button onClick={handleDelete} className="text-red-500 material-symbols-outlined">Delete</button>
        </div>
        <article className='text-sm text-gray-400 mt-2 flex flex-wrap justify-around'>
          <article>
            <span className='font-medium'>Date:</span>
            <span className='ml-1'>{dateString}</span>
          </article>
          <article>
            <span className='font-medium'>Size:</span>
            <span className="font-semibold text-yellow-300 ml-1">{data.size} KB</span>
          </article>
          {view === "list" && (
            <span className='cursor-pointer material-symbols-outlined hover:text-white' onClick={() => setModel(true)}>open_with</span>
          )}
        </article>
        {view === "grid" && (
          <div className='w-full h-full mt-2'>
          <img 
            className='rounded-2xl object-scale-down  cursor-pointer hover:opacity-75'
            src={data.url} 
            alt={data.title || "Image"} 
            onClick={() => setModel(true)} 
            loading="lazy"
          />
        </div>          )}
        
      </div>
      {showModel && createPortal(<Model children={<div className='w-full h-full  justify-center items-center h-screen pb-10  flex'><img className='object-scale-down h-full w-full' src={data.url} /></div>} close={setModel} />, document.body)}
    </>
  );
};

export default Images;
