'use client'
import { JsonArray } from '@prisma/client/runtime/library';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type WebPageInfo ={
  id: number;
  title: string;
  description: JsonArray;
  parentId: number
};

const MainSideBar = () => {
  const [webPageInfoDetails, setWebPageDetails] = useState<WebPageInfo[] | undefined>([])

  useEffect(()=>{
    const  getWebPages = async()=>{

      try {
        const res = await fetch('http://localhost:3000/api/data',{
          method:"PATCH",
          cache: 'no-cache',
          body: JSON.stringify({
            parentId:0
          })
        });
        const webPageInfo = await res.json() as WebPageInfo[];
        setWebPageDetails(webPageInfo);
      } catch (error) {
        console.error('Error fetch WebPages:', error);
      }
    }
    getWebPages()
  },)

  return (
    <div className='flex flex-col items-center ml-[1px] min-w-[250px] min-h-[700px] border-r-2 border-cyan-800 rounded-lg pt-5 '>
      {/* <strong>WebPages</strong> */}
      <div className='flex w-full'>
      {webPageInfoDetails?.map((webPage)=>(
        <Link href={`http://localhost:3000/${webPage.title}`}
          className='flex justify-center bg-white cursor-pointer items-center w-full h-[30px] border border-l-4 mb-[1px] transform transition-transform duration-400 border-gray-400 hover:bg-gray-100 hover:scale-105 hover:ml-2 hover:border-l-4 hover: rounded-r-lg'
          key={webPage.id}>
          {webPage.title}
        </Link>
      ))}
      </div>
    </div>
  )
}

export default MainSideBar