'use client';
import { JsonArray } from '@prisma/client/runtime/library';
import MenuBar from 'components/MenuBar';
import UpdateComponent from 'components/UpdateComponent';
import React, { useEffect, useState } from 'react'

type PageInfo ={
  id: number;
  title: string;
  description: JsonArray;
  parentId: number
};

type Des={
  [x: string]: any;
  heading: string;
  detail: string;
  about: string;
}

const DynamicPage = ({params}:{params:{pagename:string,webPageName:string}}) => {
  const [pageInfoDetails,setPageInfoDetails] = useState<PageInfo | undefined>();
  const [description, setDescription] = useState<Des[] | undefined>([]);
  const [heading, setHeading] = useState('');
  const [detail, setDetail] = useState('');
  const [isAdding, setIsAdding]= useState(false);
  const [index, setIndex] = useState(Number);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isMenuVisivble, setIsMenuVisible] = useState(false);

  const pagename = params?.pagename;
  const webPageName = params?.webPageName;

  const toggleMenu=()=>{
    setIsMenuVisible(!isMenuVisivble);
  }

  const handleClick = ()=>{
    setIsAdding((prevIsAdding)=>!prevIsAdding);
  }
  const handleSectionClick = ()=>{
    setShowEditForm((prevshowEditForm)=>!prevshowEditForm);
  }
  const handleEdit = () => {
    console.log('Edit clicked');
    setShowEditForm((prevshowEditForm)=>!prevshowEditForm);
  };

  const handleDelete = (e) => {
    console.log('Delete clicked');
    remove();
    e.preventDefault()
  };

  const handleCreatePage = (e) => {
    console.log('Create Page clicked');
    addSubpage();
    e.preventDefault();
  };

  useEffect(()=>{
    const getPage =async()=>{

      try {
        const response = await fetch(`http://localhost:3000/${webPageName}/api/page/${pagename}`,{
          method: "GET",
          cache: 'no-cache'
        });
  
        if (!response.ok) {
          console.error(`Error fetching data. Status: ${response.status}`);
          return;
        }
  
        const pageInfo = await response.json() as PageInfo;
        setPageInfoDetails(pageInfo);
        if (Array.isArray(pageInfo.description)) {
          const desArray: Des[] = pageInfo.description.map((item) => item as Des);
          setDescription(desArray);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getPage();
  },)

  const addSubpage = async ()=>{
    try {
      await fetch(`http://localhost:3000/${webPageName}/api/page/${pagename}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title:heading,
      })
    })
    } catch (error) {
      console.error('Error adding subPage', error);
    }
  }

  const section = async ()=>{
    try {
      await fetch(`http://localhost:3000/${webPageName}/api/page/${pagename}`,{
        method: "PATCH",
        cache: "no-cache",
        headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
        heading,
        detail,
      })
      });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding section', error);
    }
  };

  const remove = async ()=>{
    try {
      await fetch(`http://localhost:3000/${webPageName}/api/page/${pagename}`,{
        method: "DELETE",
        cache: "no-cache",
        headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
        index
      })
      });
    } catch (error) {
      console.error('Error adding section', error);
    }
  };

  const firstDescription = description?.[0];
  const restOfDescription = description?.slice(1);

  return (
    <div className='w-full flex-center flex-col pb-8 px-3' >
      <h1 className='font-bold text-2xl text-center' >
       {pageInfoDetails?.title}
      </h1>
      <h1 className='font-serif text-center'>{firstDescription?.about}</h1>
      <div className='flex w-full justify-end'>
        {pageInfoDetails &&<button 
        className='flex border rounded-md bg-gray-200' 
        onClick={handleClick}
        >Add {pageInfoDetails?.title}
        </button>}
      </div>
      {showEditForm &&
      <div className='fixed z-10 top-0 left-0 min-w-[100%] min-h-[100%] bg-black bg-opacity-50 h-screen '>
         <UpdateComponent 
         pagename ={params?.pagename} 
         index = {index} 
         heading={heading} 
         detail={detail} 
         handleSectionClick={handleSectionClick} 
         webPageName={webPageName}
         />
        </div>}
      {isAdding && <div className='fixed top-0 left-0 min-w-[100%] min-h-[100%] bg-black bg-opacity-50 h-screen '>
      <form 
    className='flex flex-col p-2 w-[700px] left-[30%] top-[200px] min-h-[300px] bg-white border rounded-lg fixed'
    onSubmit={(e)=>{
       section();
      e.preventDefault();      
    }}>
      <strong>
      <input
      className='flex focus: outline-none px-2 w-[500px]'
      type='text'
      placeholder='Name'
      onChange={(e)=> setHeading(e.target.value)}
      required
      />
        </strong>
      <textarea
      className='flex focus: outline-none w-full h-[240px] pt-4 px-2 resize-none'
      placeholder='Detail'
      onChange={(e)=> setDetail(e.target.value)}
      required
      />
      <div className='flex flex-row justify-end' >
      <div
      className='flex self-end items-center cursor-pointer border ml-2 p-1 mb-1 w-[60px] h-[30px] rounded bg-gray-200'
      onClick={()=>{
        handleClick();
      }}
      >Cancel</div>
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[45px] h-[30px] rounded bg-gray-200'
      type='submit'
      >Add</button>
      </div>
      </form>
      </div>}
      <div className='flex flex-col py-3'>
      {restOfDescription?.map((item, index) => (
        <div className='flex'
        key={index}
        onClick={()=>{
          setIndex(index + 1);
          setHeading(item.heading);
          setDetail(item.detail);

        }} >
          <div className='flex flex-col justify-center pt-2 px-3' >
          <div className='flex flex-row justify-between'>
            <p><strong className='border-b border-gray-400' >{item.heading}:</strong></p> 
            <MenuBar
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCreatePage={handleCreatePage}
            />
            </div>
          <p className='flex pt-2 border-b border-gray-500'>{item.detail} </p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default DynamicPage