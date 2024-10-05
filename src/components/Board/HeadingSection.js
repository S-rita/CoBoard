import React from 'react';

const HeadingSection = React.forwardRef(({ setTitle, setDescription, title, description }, ref) => {

  return (
    <div ref={ref} className="p-2">
      <h1 className="text-gray1 font-bold text-xl">Heading</h1>
      <div className="w-500 h-fit bg-basegreen mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
        <h2 className="text-xl self-start m-1 font-bold text-white">Title</h2>
        <input
          className="bg-white w-430 h-10 m-1 rounded-2xl px-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter title"
        />
        <div className="my-4 flex justify-center">
          <div className="w-430 h-0.5 bg-darkgreen"></div>
        </div>
        <h2 className="text-xl self-start m-1 font-bold text-white">Description</h2>
        <input
          className="bg-white w-430 h-10 m-1 rounded-2xl px-2"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description"
        />
        <div className="my-4 flex justify-center">
          <div className="w-430 h-0.5 bg-darkgreen"></div>
        </div>
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-5 font-bold text-white">Icon</h2>
          <div className="flex flex-row items-center space-x-2">
            <div className="bg-graybg w-16 h-16 rounded-full mr-4"></div>
            <button className="text-7xl font-bold text-white -mt-2">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeadingSection;
