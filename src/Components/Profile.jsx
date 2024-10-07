import React from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../firebase/authService'

const Profile = () => {
    const userInfo=useSelector(state=>state.user.userInfo)
  return (
    <div className=' cursor-default h-full flex justify-center items-center'>
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div className=" px-4 pb-6">
                <div className="text-center my-4">
                    <img className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                        src={userInfo.photoURL} alt=""/>
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{userInfo.displayName}</h3>
                        <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                        <span class="material-symbols-outlined">mail</span>{userInfo.email}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 px-2">
                    <button onClick={()=>logout()}
                        className="flex-1 rounded-full bg-red-600 dark:bg-[#ff5500] text-white dark:text-white antialiased font-bold hover:bg-red-800 dark:hover:bg-red-900 px-4 py-2">
                        Logout
                    </button>
               
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Profile