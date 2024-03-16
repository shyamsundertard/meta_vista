'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import CreatePage from './CreatePage';

const NavBar = (props:{webPageName:string}) => {
    const [showForm ,setShowFrom] = useState(false);
    
    const handleClick=()=>{
        setShowFrom(prev=> !prev);
    }

  return (
    <nav className='flex items-center border-b-2 border-cyan-800 rounded-b-lg h-[50px] w-full bg-gray-200 '>
        <Link href="/" >
        <div className='flex gap-1 px-7'>
        <h1 className='italic font-serif'>metaVista</h1>
        </div>
            </Link>
            <button 
            onClick={()=> handleClick()}
            className='flex justify-center'
            >Create Page</button>
            {showForm && <div className='fixed z-20 top-0 left-0 min-w-full min-h-[100%] bg-black bg-opacity-50 h-screen '>
              <CreatePage handleClick = {handleClick} webPageName={props.webPageName}/>
            </div>}
    </nav>
  )
}

export default NavBar