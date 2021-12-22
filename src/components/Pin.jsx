import React, { useState } from 'react'
import { client, urlFor } from '../client'
// Import Link useNavigate
import { Link, Navigate, useNavigate } from 'react-router-dom'
// Import uuidv4
import { v4 as uuidv4 } from 'uuid'
// Import Icons
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser'

function Pin({ pin: { _id, postedBy, destination, name, save, image, category, user, createdAt } }) {

    const [postHovered, setPostHovered] = useState(false)

    const navigate = useNavigate()

    const userInfo = fetchUser();

    // !! tranforms the value into a boolean, 1 = true, 0 = false
    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === userInfo?.googleId)?.length > 0);

    const savePin = (id) => {
        if (!alreadySaved) {
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: userInfo?.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userInfo?.googleId,
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload()
                })
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
                <img className="rounded-lg w-full" alt='user-post' src={urlFor(image).width(450).url()} />
                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 z-50" style={{ height: '100%' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center textdark-200 text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button
                                    type='button'
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    type='button'
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}>
                                    Save
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {destination && (
                                <a href={destination} target="_blank" rel="noreferrer" className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                                    <BsFillArrowUpRightCircleFill />
                                    {/* If destination starts with https:// slice it */}
                                    {destination.slice(0, 8) === 'https://' ? destination.slice(8, 23) : destination.slice(0, 15)}
                                </a>
                            )}
                            {postedBy?._id === userInfo?.googleId && (
                                <button
                                    type='button'
                                    className="bg-white opacity-70 hover:opacity-100 font-bold p-2 py-1 text-dark text-base rounded-3xl hover:shadow-md outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}>
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
                <img className="rounded-full w-8 h-8" alt='user-profile' src={postedBy?.image} />
                <p className='font-semibold capitalize'>{postedBy?.username}</p>
            </Link>
        </div>
    )
}

export default Pin
