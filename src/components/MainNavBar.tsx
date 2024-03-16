'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import NewWebPage from './NewWebPage';

const MainNavBar = () => {
    const [showForm ,setShowFrom] = useState(false);
    
    const handleClick=()=>{
        setShowFrom(prev=> !prev);
    }

  return (
    <nav className='flex items-center border-b-2 border-cyan-800 rounded-b-lg h-[50px] w-full bg-gray-200 '>
        <Link href="/" >
        <div className='flex gap-1 px-7'>
            Logo
        <span className='italic font-serif'>metaVista</span>
        </div>
        </Link>
        <button 
        onClick={()=> setShowFrom(true)}>Create WebPage</button>
        {showForm && 
            <div className='fixed top-0 left-0 min-w-full min-h-[100%] bg-black bg-opacity-50 h-screen '>
              <NewWebPage handleClick = {handleClick}/>
            </div>}
    </nav>
  )
}

export default MainNavBar