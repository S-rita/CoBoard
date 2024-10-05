import React from 'react';

const ExportSection = React.forwardRef((props, ref) => (
    <div ref={ref} className="p-2">
      <h1 className="text-white font-bold text-xl">Export</h1>
      <div className="w-500 h-fit bg-lightorange mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
        <div className="flex w-430 h-20 m-1 rounded-2xl items-center hover:bg-white">
            <img src="/asset/picture_icon.svg" alt="Link" className=" flex flex-col w-12 h-12 mt-1 ml-2" />
            <p className="text-blackorange text-3xl font-semibold ml-4">export as image</p>
        </div>
        <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
        </div>
        <div className="flex w-430 h-20 m-1 rounded-2xl items-center hover:bg-white">
            <img src="/asset/pdf_icon.svg" alt="Link" className=" flex flex-col w-12 h-12 mt-1 ml-2" />
            <p className="text-blackorange text-3xl font-semibold ml-4">export as PDF</p>
        </div>
      </div>
    </div>
));

export default ExportSection;