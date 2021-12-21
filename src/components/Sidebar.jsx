import React from 'react'
// Import NavLink and Link
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from "react-icons/ri"
import { IoIosArrowFoward } from "react-icons/io"

import logo from '../assets/logo.png'

const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transistion-all duration-200 ease-in-out captilize"
const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transistion-all duration-200 ease-in-out captilize"

const categories = [
    { name: 'Animals' },
    { name: 'Art' },
    { name: 'Cars' },
    { name: 'Food' },
    { name: 'Funny' },
    { name: 'Games' },
    { name: 'Music' },
    { name: 'Others' },
]


function Sidebar({ user, closeToggle }) {
    const handleCloseSidebar = () => {
        if (closeToggle) {
            closeToggle()
        }
    }

    console.log(user);

    return (
        <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
            <div className="flex flex-col">
                <Link to='/' className='flex px-5 gap-2 my-6 pt-1 w-190 items-center' onClick={handleCloseSidebar}>
                    <img src={logo} alt="logo" className='w-full' />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink to='/' className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar}>
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
                    {categories.slice(0, categories.length - 1).map((category, index) => (
                        <NavLink key={index} to={`/category/${category.name}`} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar}>
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link to={`user-profile/${user._id}`} className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3' onClick={handleCloseSidebar}>
                    <img src={user.image} alt="user-profile" className='w-10 h-10 rounded-full' />
                    <p>{user.username}</p>
                </Link>
            )}
        </div>
    )
}

export default Sidebar