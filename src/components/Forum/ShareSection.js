import React from 'react';

const ShareSection = React.forwardRef((props, ref) => (
    <div ref={ref} className="p-2">
      <h1 className="text-white font-bold text-xl">Share</h1>
      <div className="w-500 h-fit bg-lightorange mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
        <div className="flex w-430 h-20 m-1 rounded-2xl items-center hover:bg-white">
            <img src="/asset/email_icon.svg" alt="Link" className=" flex flex-col w-12 h-12 mt-1 ml-2" />
            <p className="text-blackorange text-3xl font-semibold ml-4">Email</p>
        </div>
        <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
        </div>
        <div className="flex w-430 h-20 m-1 rounded-2xl items-center hover:bg-white">
            <img src="/asset/facebook_icon.svg" alt="Link" className=" flex flex-col w-12 h-12 mt-1 ml-2" />
            <p className="text-blackorange text-3xl font-semibold ml-4">Facebook</p>
        </div>
        <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
        </div>
        <div className="flex w-430 h-20 m-1 rounded-2xl items-center hover:bg-white">
            <img src="/asset/twitter_icon.svg" alt="Link" className=" flex flex-col w-10 h-10 mt-1 ml-2" />
            <p className="text-blackorange text-3xl font-semibold ml-4">Twitter</p>
        </div>
      </div>
    </div>
));

export default ShareSection;