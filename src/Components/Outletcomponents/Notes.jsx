import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Model } from '../Model';
import { CodePopup } from '../ModelComponents/CodePopup';
import classNames from 'classnames';
import { DeleteData } from '../../firebase/fetchDeleteDataServices'; // Import your delete function
import hljs from 'highlight.js/lib/common'; // Import hljs for syntax highlighting
import 'highlight.js/styles/xt256.css'; // Import the desired highlight.js style

const Notes = ({ data, view, userId }) => {
    const [showModel, setModel] = useState(false);
    const noteRef = useRef(null); // Reference for the note content
    const date = new Date(data.createdAt.seconds*1000);
    const dateString = date.toLocaleString();

    const handleDelete = async (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up to the card
        const filePath = `path/to/your/notes/${data.id}`; // Adjust to your file path
        await DeleteData(filePath, 'notes', data.id);
    };

    useEffect(() => {
        if (noteRef.current) {
            hljs.highlightBlock(noteRef.current); // Highlight the note content
        }
    }, [data.content]); // Re-run on content change

    return (
        <>
            <div 
                className={classNames("mx-auto  p-5 max-h-56 h-fit hover:shadow-[0px_0px_1px_1px_white] bg-zinc-900 rounded-xl overflow-clip w-full md:w-96 flex flex-col", { '': view === 'list' })}
            >
                <div className={classNames('flex items-center justify-between mb-2')}>
                    <h1 className='text-lg font-semibold text-blue-400'>{data.title || "Untitled"}</h1>
                    <button onClick={handleDelete} className="text-red-500 material-symbols-outlined">Delete</button>
                </div>
                <article className='text-sm text-gray-400 mt-2 flex flex-wrap justify-around'>
                    <article>
                        <span className='font-medium'>Date:</span>
                        <span className='ml-1'>{dateString}</span>
                    </article>
                    {view === "list" && (
                        <span className='cursor-pointer material-symbols-outlined hover:text-white' onClick={() => setModel(true)}>open_with</span>
                    )}
                </article>
                <pre onClick={() => (setModel(true))} className={classNames('break-all  hover:cursor-pointer  text-wrap overflow-auto hover:border-opacity-100 border-[1px] border-opacity-0 border-blue-500 hover:bg-zinc-700 p-2 w-full', { "hidden": view === "list" })}>
                    <code ref={noteRef} >
                        {data.content}
                    </code>
                </pre>
            </div>
            {showModel && createPortal(
                <Model children={<CodePopup code={JSON.stringify(data.content, null, 2)} />} close={setModel} />, 
                document.body
            )}
        </>
    );
};

export default Notes;
