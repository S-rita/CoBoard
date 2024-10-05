import React from 'react';

const InfoPanel = ({ isVisible, closeInfoPanel }) => {
  return (
    <>
      {isVisible && (
        <div id="infopanel" className="fixed inset-0 z-20 flex items-end justify-end bg-black bg-opacity-50">
          <div className="bg-darkorange w-panel h-screen p-7 rounded-2xl rounded-r-none shadow-lg relative overflow-y-scroll overflow-x-hidden">
            <button
              onClick={closeInfoPanel}
              className="absolute top-0 left-0 w-12 h-12 ml-7 mt-12 text-4xl text-white font-extrabold"
            >
              &times;
            </button>
            <h1 className="text-4xl text-center mt-7 text-white font-bold">About this forum</h1>
            <div className="w-500 h-80 bg-white mt-12 rounded-2xl flex justify-center items-center">
              <p className="font-bold text-5xl">Wallpaper</p>
            </div>
            <h1 className="text-white font-bold text-3xl mt-5 ml-3">Cafeteria</h1>
            <div className="w-500 h-fit bg-lightorange mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Made by</p>
                <p className="text-lg font-semibold text-black">Sarita Manopatana</p>
              </div>
              <div className="my-4 flex justify-center">
                <div className="w-430 h-0.5 bg-darkorange"></div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Made on</p>
                <p className="text-lg font-semibold text-black">12 January 2023</p>
              </div>
              <div className="my-4 flex justify-center">
                <div className="w-430 h-0.5 bg-darkorange"></div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Last update on</p>
                <p className="text-lg font-semibold text-black">13 September 2024</p>
              </div>
              <div className="my-4 flex justify-center">
                <div className="w-430 h-0.5 bg-darkorange"></div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Access</p>
                <p className="text-lg font-semibold text-black">Public</p>
              </div>
            </div>
            <div className="w-500 h-fit bg-lightorange mt-6 rounded-2xl py-4 px-10 flex flex-col items-center">
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Contributors</p>
                <p className="text-lg font-semibold text-black">11</p>
              </div>
              <div className="my-4 flex justify-center">
                <div className="w-430 h-0.5 bg-darkorange"></div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Posts</p>
                <p className="text-lg font-semibold text-black">1</p>
              </div>
              <div className="my-4 flex justify-center">
                <div className="w-430 h-0.5 bg-darkorange"></div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Comments</p>
                <p className="text-lg font-semibold text-black">3</p>
              </div>
              <div className="my-4 flex justify-center">
                <div className="w-430 h-0.5 bg-darkorange"></div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg font-semibold text-gray1">Reactions</p>
                <p className="text-lg font-semibold text-black">6</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPanel;
