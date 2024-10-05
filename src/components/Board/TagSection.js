import React from 'react';

const TagSection = React.forwardRef((props, ref) => (
  <div ref={ref} className="p-2">
    <h1 className="text-gray1 font-bold text-xl">Tags</h1>
    <div className="w-500 h-fit bg-basegreen mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
      <h2 className="text-xl self-start m-1 font-bold text-white">Tags</h2>
      <div className="bg-white w-430 h-10 m-1 rounded-2xl"></div>
      <div className="my-4 flex justify-center">
        <div className="w-430 h-0.5 bg-darkgreen"></div>
      </div>
      <h2 className="text-xl self-start m-1 font-bold text-white">Add Tags</h2>
      <div className="bg-white w-430 h-10 m-1 rounded-2xl"></div>
    </div>
  </div>
));

export default TagSection;
