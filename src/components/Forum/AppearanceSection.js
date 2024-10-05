import React, { useState } from 'react';

const AppearanceSection = ({ handleSortBy }) => {
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);

  return (
    <div className="p-2">
      <h1 className="text-white font-bold text-xl">Appearance</h1>
      <div className="w-500 h-fit bg-lightorange mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-11 font-bold text-blackorange">Wallpaper</h2>
          <div className="flex flex-row items-center space-x-2">
            <div className="bg-graybg w-44 h-28 rounded-xl mr-4"></div>
            <button className="text-7xl font-bold text-white -mt-2">{'>'}</button>
          </div>
        </div>
        <div className="my-4 flex justify-center">
          <div className="w-430 h-0.5 bg-darkorange"></div>
        </div>
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-4 font-bold text-blackorange">Font</h2>
          <div className="flex flex-row items-center space-x-4">
            <button className="text-lg font-bold text-blackorange w-20 h-14 bg-graybg rounded-xl">Font1</button>
            <button className="text-lg font-bold text-blackorange w-20 h-14 bg-graybg rounded-xl">Font2</button>
            <button className="text-lg font-bold text-blackorange w-20 h-14 bg-graybg rounded-xl">Font3</button>
          </div>
        </div>
        <div className="my-4 flex justify-center">
          <div className="w-430 h-0.5 bg-darkorange"></div>
        </div>
        {/* Sort by Section */}
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-4 font-bold text-blackorange">Sort by</h2>
          <div className="relative">
            <div className="bg-white w-56 h-14 rounded-3xl flex items-center justify-between p-2 cursor-pointer" onClick={() => setSortDropdownVisible(!sortDropdownVisible)}>
              <p className="text-black">Select Sort</p>
              <button className="text-3xl font-bold">v</button>
            </div>
            {sortDropdownVisible && (
              <div className="absolute right-0 mt-2 border border-gray-300 rounded-md bg-white shadow-lg w-56 z-10">
                <ul className="p-2">
                  <li onClick={() => handleSortBy('latest')} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                    <img src="/asset/lastest_icon.svg" className="w-10 h-10 mr-2" alt="Latest" />
                    <span className="font-semibold">Latest</span>
                  </li>
                  <li onClick={() => handleSortBy('likes')} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                    <img src="/asset/heart_icon.svg" className="w-10 h-10 mr-2" alt="Likes" />
                    <span className="font-semibold">Likes</span>
                  </li>
                  <li onClick={() => handleSortBy('comments')} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
                    <img src="/asset/comment_icon.svg" className="w-10 h-10 mr-2" alt="Comments" />
                    <span className="font-semibold">Comments</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSection;
