'use client'
import { JsonArray } from '@prisma/client/runtime/library';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type PageInfo ={
  id: number;
  title: string;
  description: JsonArray;
  parentId: number
};

const SideBar = (props: {webPageName:string}) => {
  const [pageInfoDetails, setPageDetails] = useState<PageInfo[] | undefined>([])

  const webPageName = props.webPageName;

  useEffect(()=>{
    const  getWebPages = async()=>{

      try {
        const res = await fetch(`http://localhost:3000/${webPageName}/api/data`,{
          method:"PATCH",
          cache: 'no-cache',
        });
        const webPageInfo = await res.json() as PageInfo[];
        setPageDetails(webPageInfo);
      } catch (error) {
        console.error('Error fetch WebPages:', error);
      }
    }
    getWebPages()
  },)

  return (
    <div className='flex flex-col items-center ml-[1px] min-w-[250px] min-h-[700px] border-r-2 border-cyan-800 rounded-lg pt-5 '>
      {/* <strong>Pages</strong> */}
      <div className='flex flex-col w-full'>
      {pageInfoDetails?.map((page)=>(
        <Link href={`http://localhost:3000/${webPageName}/Page/${page.title}`}
          className='flex justify-center bg-white cursor-pointer items-center w-full h-[30px] border border-l-4 mb-[1px] transform transition-transform duration-400 border-gray-400 hover:bg-gray-100 hover:scale-105 hover:ml-2 hover:border-l-4 rounded-r-lg'
          key={page.id}>
          {page.title}
          </Link>
      ))}
      </div>
    </div>
  )
}

export default SideBar