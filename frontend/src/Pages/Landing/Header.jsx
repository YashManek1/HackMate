import React from 'react'
import { FiLogIn } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='h-max w-full flex justify-around items-center flex-row flex-nowrap font-dmsans absolute top-0 left-0 z-10 bg-linear-to-b from-dark-secondary1 to-dark-primary'>
        <h1 className='h-max w-max m-2 p-2 text-white text-[6vw] sm:text-[4.5vw] md:text-[3vw]'>HackMate</h1>

        <Link className='h-max w-max m-2 px-6 py-4 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center gap-2 flex-row flex-nowrap text-white' 
            to="/signup"
        >
            <span>SignUp/Login</span>
            <FiLogIn />
        </Link>
        </div>
    )
}

export default Header