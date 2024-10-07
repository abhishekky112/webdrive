import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setshowMode } from '../appstore/reducers/accesblity';

export const Search = () => {
    const view=useSelector(state=>state.tools.showMode);
    // const view='grid'
    const dispatch=useDispatch();
  return (
    <div className='h-10 bg-white flex p-1 gap-2 justify-around'>
        <div className='bg-primary2 w-16 rounded-sm flex items-center justify-around border-gray-700 border-[1px]'>
            <button 
                className={`material-symbols-outlined text-black ${view === 'grid' ? 'bg-blue-500' : ''}`}
                onClick={() => dispatch(setshowMode('grid'))}
            >
                grid_view
            </button>
            <button 
                className={`material-symbols-outlined text-black ${view === 'list' ? 'bg-blue-500' : ''}`}
                onClick={() => dispatch(setshowMode('list'))}
            >
                view_list
            </button>
        </div>

    <div className=' w-full max-w-[800px] flex'>
        <input placeholder='Search' className='px-3 placeholder:text-indigo-950 bg-primary2 w-full rounded-l-3xl  focus:outline-1 focus:outline-blue-600  outline-gray-300 outline-1 outline ' type="text" name="" id="" />
        <button className='bg-primary3 w-10 flex items-center justify-center rounded-r-full active:bg-black ' ><span className="material-symbols-outlined">search</span></button>
    </div>
</div>
  )
}
