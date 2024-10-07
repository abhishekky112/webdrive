import React, { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js/lib/common'
// import 'highlight.js/styles/dark.css';
// import 'highlight.js/styles/xt256.css';

import classNames from 'classnames';
export const CodePopup = ({code}) => {
        const [check,setCheck]=useState(false);
        const handleClick = async() => {
          navigator.clipboard.writeText(code).then(() => {
            console.log('Text copied to clipboard');
            setCheck(true);
            
          }).catch(err => {
            console.error('Failed to copy text: ', err);
          });
          setTimeout(()=>setCheck(false),2000);
        };
    const coderef=useRef(null);
    useEffect(() => {
        if (coderef.current) {
            hljs.highlightElement(coderef.current);
        }
    }, []);
  return (
    <div className='items-center h-full w-full flex justify-center flex-col p-2 md:mx-auto bg-black bg-opacity-80'>
        
        <pre className='h-full w-full my-20  p-2 bg-white max-w-full  rounded-3xl overflow-auto max-h-full'>
        <span className='bg-black sticky top-0 left-0 rounded-lg py-1 p-2 hover:cursor-pointer  flex items-center w-fit' onClick={handleClick}>{!check && <span className="material-symbols-outlined">content_copy</span>} <span className={classNames("material-symbols-outlined ",{'hidden':!check})}>
check
</span></span>
            <code className='overflow-x-hidden'  ref={coderef}>
                {code}
            </code>
        </pre>
    </div>
  )
}
