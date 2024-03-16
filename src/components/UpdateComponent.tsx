import React, { useState } from 'react'

const UpdateComponent = (props: {
  handleSectionClick: any;
  pagename: string; 
  index:Number; 
  heading: string; 
  detail: string;
  webPageName:string;
}) => {
    const [heading ,setHeading]  = useState(props.heading);
    const [detail ,setDetail]  = useState(props.detail);

    const update = async ()=>{
      try {
        await fetch(`http://localhost:3000/${props.webPageName}/api/page/${props.pagename}`,{
          method: "PUT",
          headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
          heading,
          detail,
          index: props.index
        })
        });
        props.handleSectionClick();
      } catch (error) {
        console.error('Error adding section', error);
      }
    };

  return (
    <div className='fixed top-[200px] left-[30%] bg-white w-[700px] border rounded-lg min-h-[300px]'> 
      <strong>
        <input
      className='flex focus: outline-none px-2'
      type='text'
      defaultValue={props.heading}
      onChange={(e)=> setHeading(e.target.value)}
      required
      />
        </strong>
        <div className='flex-1 overflow-auto'>
      <textarea
      className='flex focus: outline-none w-full h-[240px] pt-4 px-2 resize-none'
      defaultValue={props.detail}
      autoFocus
      onChange={(e)=> setDetail(e.target.value)}
      required
      />
      </div>
      <div className='flex flex-row justify-end'>
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[70px] h-[25px] rounded bg-gray-200'
      onClick={(e)=>{
      props.handleSectionClick();
       e.preventDefault();
     }}
      >Cancel</button>
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[120px] h-[25px] rounded bg-gray-200'
      onClick={(e)=>{
        update();
       e.preventDefault();
     }}
      >Save Changes</button>
      </div>
      </div>
  )
}

export default UpdateComponent