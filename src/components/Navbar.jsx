import React from 'react'
// Import Link, useNavigate hook
import { Link, useNavigate } from 'react-router-dom'
// Icons
// IoMdAdd, IoMdSearch
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

function Navbar({ searchTerm, setSearchTerm, user }) {

    const navigate = useNavigate()

    if (!user) return null

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                <IoMdSearch fontSize={21} className="ml-1" />
                <input
                    type="text"
                    className="w-full p-2 bg-white outline-none"
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-3">
                <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                    <img src={user.image} alt="user" className="rounded-full h-12 w-12" />
                </Link>
                <Link to="create-pin" className="flex bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 justify-center items-center">
                    <IoMdAdd fontSize={21} className="ml-1" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
