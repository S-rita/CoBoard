import React from 'react';

const HeadingSection = React.forwardRef((props, ref) => (
  <div ref={ref} className="p-2">
    <h1 className="text-white font-bold text-xl">Heading</h1>
    <div className="w-500 h-fit bg-lightorange mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
      <h2 className="text-xl self-start m-1 font-bold text-blackorange">Title</h2>
      <div className="bg-white w-430 h-10 m-1 rounded-2xl"></div>
      <div className="my-4 flex justify-center">
        <div className="w-430 h-0.5 bg-darkorange"></div>
      </div>
      <h2 className="text-xl self-start m-1 font-bold text-blackorange">Description</h2>
      <div className="bg-white w-430 h-10 m-1 rounded-2xl"></div>
      <div className="my-4 flex justify-center">
        <div className="w-430 h-0.5 bg-darkorange"></div>
      </div>
      <div className="justify-between flex w-full">
        <h2 className="text-xl self-start m-1 mt-5 font-bold text-blackorange">Icon</h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="bg-graybg w-16 h-16 rounded-full mr-4"></div>
          <button className="text-7xl font-bold text-white -mt-2">{'>'}</button>
        </div>
      </div>
    </div>
  </div>
));

export default HeadingSection;
