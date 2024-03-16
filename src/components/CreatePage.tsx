'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreatePage = (props: {handleClick:any, webPageName:string}) => {
    const [title,setTtitle] = useState('');
    const [about,setAbout] = useState('');

    const router = useRouter();

    async function addData() {
        try {
            await fetch(`http://localhost:3000/${props.webPageName}/api/data`,{
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
                    webPageName: props.webPageName
                }),
            }) ;
            props.handleClick();
            router.push(`http://localhost:3000/${props.webPageName}/Page/${title}`);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='fixed z-10 top-[200px] left-[30%] bg-white w-[600px] border rounded-xl min-h-[200px]'>
        <form 
        className='flex flex-col w-[600px] h-[200px] border rounded-xl pt-5'
        onSubmit={(e)=> {
            addData();
            e.preventDefault();
            }} >
                <div className='flex flex-col pl-6 pt-1 pb-1 h-[165px] w-full'>
                <input
                className='flex focus:outline-none w-full'
                type= "text"
                placeholder='Title of Page'
                onChange={(e)=>setTtitle(e.target.value)}
                required
                />
                <input
                className='flex focus:outline-none w-[550px] break-words'
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

export default CreatePage