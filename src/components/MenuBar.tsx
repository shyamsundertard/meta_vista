import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface MenuBarProps {
  handleEdit: () => void;
  handleDelete: (e: any) => void;
  handleCreatePage: (e: any) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({
  handleEdit,
  handleDelete,
  handleCreatePage,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className='relative inline-block' onClick={(e) => e.stopPropagation()}>
      <button onClick={toggleMenu} className='flex items-center justify-end cursor-pointer'>
        <BsThreeDotsVertical />
      </button>
      {isMenuVisible && (
        <div
          onMouseLeave={toggleMenu}
          className='absolute top-8 right-0 bg-white text-nowrap border shadow-lg rounded cursor-pointer'
        >
          <div
            className='hover:bg-gray-200 px-2'
            onClick={(e) => {
              handleEdit();
              e.preventDefault();
            }}
          >
            Edit
          </div>
          <div
            className='hover:bg-gray-200 px-2'
            onClick={(e) => {
              handleDelete(e);
              e.preventDefault();
            }}
          >
            Delete
          </div>
          <div
            className='hover:bg-gray-200 px-2'
            onClick={(e) => {
              handleCreatePage(e);
              e.preventDefault();
            }}
          >
            Create Page
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
