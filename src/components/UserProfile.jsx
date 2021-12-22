import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// Import useParams and useNavigate
import { GoogleLogout } from 'react-google-login'
import { useParams, useNavigate } from 'react-router-dom'
// Icons
import { AiOutlineLogout } from 'react-icons/ai'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'

// Fetch random nature image from unsplash
const randomImage = 'https://source.unsplash.com/random/1600x900/?nature'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

function UserProfile() {
    const [user, setUser] = useState(null)
    const [pins, setPins] = useState(null)
    const [text, setText] = useState('Created') //Created or Saved
    const [activeBtn, setActiveBtn] = useState('Created')

    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query).then(data => {
            setUser(data[0])
        })

    }, [userId])

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId)

            client.fetch(createdPinsQuery).then(data => {
                setPins(data)
            })
        } else {
            const savedPinsQuery = userSavedPinsQuery(userId)

            client.fetch(savedPinsQuery).then(data => {
                setPins(data)
            })
        }
    }, [text, userId, activeBtn])

    if (!user) {
        return <Spinner message="Loading user profile..." />
    }

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }


    return (
        <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img src={randomImage} alt="banner" className="w-full h-370 2xl:h-510 shadow-lg object-cover" />
                        <img src={user.image} alt="profile" className="w-20 h-20 rounded-full -mt-10 shadow-xl object-cover" />
                        <h1 className="font-bold text-3xl text-center mt-3">
                            {user.username}
                        </h1>
                        <div className="absolute top-0 z-1 right-0 p-2">
                            {userId === user._id && (
                                <GoogleLogout
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    render={(renderProps) => {
                                        return (
                                            <button
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'>
                                                <AiOutlineLogout color='red' fontSize={21} />
                                            </button>
                                        )
                                    }}
                                    onLogoutSuccess={logout}
                                    cookiePolicy={'single_host_origin'}
                                />
                            )}
                        </div>
                    </div>
                    <div className="text-center mb-7">
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn('Created')
                            }}
                            className={`${activeBtn === 'Created' ? activeBtnStyles : notActiveBtnStyles}`}>
                            Created
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn('Saved')
                            }}
                            className={`${activeBtn === 'Saved' ? activeBtnStyles : notActiveBtnStyles}`}>
                            Saved
                        </button>
                    </div>
                    {pins?.length ? (
                        <div className="px-2">
                            <MasonryLayout pins={pins} />
                        </div>
                    ) : (
                        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">No Pins Found!</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
