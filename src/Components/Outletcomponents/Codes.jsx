import React, { createRef, useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/xt256.css';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Model } from '../Model';
import { CodePopup } from '../ModelComponents/CodePopup';

const Codes = ({ info, view, onDelete }) => {
    const coderef = createRef();
    const [showModel, setModel] = useState(false);
    const date = new Date(info.createdAt);
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    useEffect(() => {
        if (coderef.current) {
            // Highlight code
            hljs.highlightElement(coderef.current);
        }
    }, [info.code]); // Highlight when the code changes

    const handleDelete = async () => {
        try {
            await onDelete(info.id); // Pass the code ID for deletion
        } catch (error) {
            console.error("Error deleting code: " + error.message);
        }
    };

    return (
        <>
            <div className="mx-auto p-5 max-h-56 h-fit hover:shadow-[0px_0px_1px_1px_white] bg-zinc-900   rounded-xl overflow-clip w-full md:w-96 flex flex-col">
                <div className={classNames('flex items-center justify-between mb-2')}>
                    <h1 className='text-lg font-semibold text-blue-400'>{info.title || "Untitled"}</h1>
                    <button onClick={handleDelete} className="text-red-500  material-symbols-outlined">Delete</button>
                </div>
                <article className='text-sm text-gray-400 mt-2 flex flex-wrap justify-around'>
                    <article>
                        <span className='font-medium'>Date:</span>
                        <span className='ml-1'>{dateString}</span>

                    </article>
                    <article>
                        <span className='font-medium'>Language:</span>
                        <span className="font-semibold text-yellow-300 ml-1">{info.language}</span>
                    </article>
                    {view === "list" && <span className='cursor-pointer material-symbols-outlined hover:text-white' onClick={()=>setModel(true)}>open_with</span>}
                </article>
                <pre onClick={() => (setModel(true))} className={classNames('break-all  hover:cursor-pointer  text-wrap overflow-auto hover:border-opacity-100 border-[1px] border-opacity-0 border-blue-500 hover:bg-zinc-700 p-2 w-full', { "hidden": view === "list" })}>
                    <code ref={coderef} className={`language-${info.language}`}>
                        {info.code}
                    </code>
                </pre>
            </div>
            {showModel && createPortal(<Model children={<CodePopup code={(info.code)} />} close={setModel} />, document.body)}
        </>
    );
};

export default Codes;
