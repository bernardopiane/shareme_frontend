import React from 'react'
// Import google login
import GoogleLogin from 'react-google-login';
// Import useNavigate
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

export default function Login() {
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

    const responseGoogle = (response) => {
        // Handle google auth response
        localStorage.setItem('user', JSON.stringify(response.profileObj));

        const { name, googleId, imageUrl } = response.profileObj;
        // Create new sanity user
        const doc = {
            _id: googleId,
            _type: 'user',
            username: name,
            image: imageUrl,
        };
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video className='w-full h-full object-cover' autoPlay loop muted src={shareVideo} type='video/mp4' />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className="p-5">
                        <img src={logo} alt="logo" width="130px" />
                        <div className="shadow-2xl mt-4">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                render={(renderProps) => {
                                    return (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white rounded flex justify-center items-center p-3 cursor-pointer outline-none' onClick={renderProps.onClick}>
                                            <FcGoogle className='mr-2' />
                                            Login with Google
                                        </button>
                                    )
                                }}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
