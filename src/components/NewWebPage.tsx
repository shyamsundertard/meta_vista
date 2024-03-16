'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const NewWebPage = (props: {handleClick:any}) => {
    const [title, setTtitle] = useState('');
    const [about,setAbout] = useState('');

    const router = useRouter();

    const createNewWebPage = async ()=>{
        try {
           await fetch('http://localhost:3000/api/data',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                title,
                description:[{
                    tag:"About",
                        about
                }],
                parentId: 0
            })
           }) 
           router.push(`http://localhost:3000/${title}`);
           props.handleClick();
        } catch (error) {
            console.error('Error creating WebPage', error);
        }
    }

  return (
    <div className='fixed z-20 top-[200px] left-[30%] bg-white w-[600px] border rounded-xl min-h-[200px]'>
        <form
        onSubmit={(e)=>{
            createNewWebPage();
            e.preventDefault();
        }}
        className='flex flex-col w-[600px] h-[200px] border rounded-xl pt-5'
        >
            <div className='flex flex-col pl-6 pt-1 pb-1 h-[165px]'>
                <input
                className='flex focus:outline-none'
                type= "text"
                placeholder='Title of Page'
                onChange={(e)=>setTtitle(e.target.value)}
                required
                autoFocus
                />
                <input
                className='flex break-words focus:outline-none max-w-[200px]'
                type= "text"
                placeholder='About'
                onChange={(e)=>setAbout(e.target.value)}
                required
                />
            </div>
            <div className='flex flex-row justify-end'>
            <div 
                className='flex self-end justify-center cursor-pointer border ml-2 m-3 mb-1 w-[65px] h-[30px] rounded text-white bg-cyan-500'
                onClick={()=>
                    props.handleClick()
                }
            >Cancel</div>
            <button 
                className='flex self-end justify-center border ml-2 m-3 mb-1 w-[65px] h-[30px] rounded text-white bg-cyan-500'
                type='submit'
            >Create</button>
            </div>
        </form>
    </div>
  )
}

export default NewWebPage