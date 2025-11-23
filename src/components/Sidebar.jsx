import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import MenuItems from './MenuItems'
import { useNavigate, Link } from 'react-router-dom'
import { CirclePlus, LogOut } from 'lucide-react'
import { useClerk, UserButton } from '@clerk/clerk-react'

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const user = dummyUserData
  const { signOut } = useClerk()

  return (
    <div
      className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between
      items-center max-sm:absolute top-0 bottom-0 z-20 
      ${sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      transition-all duration-300 ease-in-out`}
    >
      <div className="w-full">

        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          className="w-24 ml-7 my-2 cursor-pointer"
          alt="Logo"
        />

        <hr className="border-gray-300 mb-8" />

        <MenuItems setSidebarOpen={setSidebarOpen} />

        <Link
          to="/create-post"
          className="flex items-center gap-2 py-2.5 mx-6 mt-6 bg-indigo-800 text-white rounded-lg cursor-pointer justify-center"
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>

      </div>

      <div className="w-full border-t border-gray-200 px-7 p-4 flex items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton />
          
          <div>
            <h1 className="font-semibold">{user.full_name}</h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        <LogOut
          onClick={signOut}
          className="w-5 text-gray-400 hover:text-gray-700 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default SideBar
