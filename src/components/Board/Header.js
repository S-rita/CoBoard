import React from 'react';

const Header = () => {
  return (
    <div className="bg-basegreen w-full h-36 drop-shadow-xl flex items-center justify-between sticky top-0">
      <div className="flex items-center">
        <div className="h-24 w-24 ml-10 flex justify-center items-center">
          <img src="/asset/CoBoard logo.svg" className="w-full h-full" alt="Logo" />
        </div>
        <p className="text-white ml-6 text-3xl font-bold">Co<br />Board</p>
      </div>
      <div className="flex items-center">
        <div className="bg-white rounded h-1/4 w-64 mr-10 drop-shadow-md pt-1 px-4 flex">
          <p className="text-gray-400 text-xl">{'\uD83D\uDD0D'} Search...</p>
        </div>
        <div className="bg-slate-400 rounded-full h-16 w-28 mr-10 flex justify-center items-center relative group">
          <div className="bg-white rounded-full h-11/12 w-11/12 flex justify-center items-center relative">
            <img src="/asset/se.png" className="h-11/12 w-11/12 object-contain" alt="SE" />
          </div>
          <div className="overlay-content absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-60 flex justify-center items-center">
            <a href="https://www.se.kmitl.ac.th/" target="_blank" rel="noopener noreferrer" className="text-white">Home Page</a>
          </div>
        </div>
        <div className="bg-white rounded-full h-16 w-16 mr-10"></div>
      </div>
    </div>
  );
};

export default Header;
