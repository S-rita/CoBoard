import React, { useState } from 'react';

const YourBoardView = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="mt-6 ml-4">
      <div className="flex flex-row gap-5 ml-10 items-center">
        <div className="flex-auto text-black text-4xl font-bold ">
          Your Board
        </div>
        <div className="bg-gray-400 h-[3px] w-[900px]" />
      </div>
      <div className='ml-[1000px] flex gap-5'>
        <button className="bg-gray-300 text-gray-700 py-2 px-10 rounded-xl hover:bg-gray-400">
          Edit
        </button>
        
        {/* Dropdown button */}
        <button 
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400" 
          onClick={toggleDropdown}
        >
          Drop
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-11 z-10 ml-[100px]">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourBoardView;
