import React, { useState } from "react";
import classNames from 'classnames';
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import { Model } from "./Model";
import { createPortal } from "react-dom";
import AddPage from "./ModelComponents/Add";
export const SideBar = () => {
    const isopen=useSelector(state=>state.tools.isSidebaropen);
    const dispach=useDispatch();
    const [model,setModel]=useState(false);

    return (<>
        <div className="flex flex-col ">
            <button onClick={()=>(setModel(true))} className={classNames(" active:scale-95 duration-400 mt-2 flex items-center rounded-r-full shadow-md rounded-l-full h-8  bg-white mx-1",{"mx-2":isopen})}>
                <span className="material-symbols-outlined flex mx-auto shadow-[0px_0px_10px_1px_black] rounded-md  bg-black text-white">add</span>
            </button>
            <ul className={classNames("flex-col flex gap-4 mt-4",{'pr-6':isopen})}>
                <NavLink className={classNames('navlinks',{'md:rounded-full md:p-2 md:mx-1':!isopen})} to='codes'>
                    <span className=" text-black  font-bold material-symbols-outlined">code</span><span className={classNames({'md:hidden':!isopen})}>Code</span>
                </NavLink>
                <NavLink className={classNames('navlinks',{'md:rounded-full md:p-2 md:mx-1':!isopen})} to='notes'>
                    <span className=" text-black  font-bold material-symbols-outlined">text_snippet</span><span className={classNames({'md:hidden':!isopen})}>Notes</span>
                </NavLink>
                <NavLink className={classNames('navlinks',{'md:rounded-full md:p-2 md:mx-1':!isopen})} to='links'>
                    <span className=" text-black  font-bold material-symbols-outlined">link </span><span className={classNames({'md:hidden':!isopen})}>Links</span>
                </NavLink>
                <NavLink className={classNames('navlinks',{'md:rounded-full md:p-2 md:mx-1':!isopen})} to='images'>
                <span className=" text-black  font-bold material-symbols-outlined">image</span><span className={classNames({'md:hidden':!isopen})}>Images</span>
                </NavLink>
                <NavLink className={classNames('navlinks',{'md:rounded-full md:p-2 md:mx-1':!isopen})} to='files'>
                    <span className=" text-black  font-bold material-symbols-outlined">folder</span><span className={classNames({'md:hidden':!isopen})}>Files</span>
                </NavLink>
            </ul>
            {model && createPortal(<Model close={setModel}><AddPage/> </Model>,document.body)}

        </div>
        
    </>)
}