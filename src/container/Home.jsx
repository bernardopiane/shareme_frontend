import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai"
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import Pins from "./Pins"
import { client } from '../client'
import logo from '../assets/logo.png'

import { userQuery } from "../utils/data"

export default function Home() {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [User, setUser] = useState(null)

    const scrollRef = useRef(null)

    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    useEffect(() => {
        const query = userQuery(userInfo?.googleId)

        client.fetch(query).then(data => {
            setUser(data[0]);
        })
    }, [userInfo?.googleId])

    useEffect(() => {
        scrollRef.current.scrollTo(0, { behavior: 'smooth' })
    }, [])

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-full transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={User && User} />
            </div>
            <div className="flex md:hidden flex-col">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className='cursor-pointer' onClick={() => {
                        setToggleSidebar(!toggleSidebar)
                    }} />
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28 mx-auto" />
                    </Link>
                    <Link to={`user-propfile/${User?.id}`}>
                        <img src={User?.image} alt="logo" className="w-28 mx-auto" />
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => { setToggleSidebar(!toggleSidebar) }} />
                        </div>
                        <Sidebar user={User && User} closeToggle={setToggleSidebar} />
                    </div>
                )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins user={User && User} />} />
                </Routes>
            </div>
        </div>
    )
}
