import React from 'react';

const LinkSection = React.forwardRef((props, ref) => {
  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div ref={ref} className="p-2">
      <h1 className="text-white font-bold text-xl">Link</h1>
      <div 
        className="w-500 h-fit bg-lightorange mt-4 rounded-2xl py-4 px-10 flex flex-col items-center cursor-pointer"
        onClick={handleCopy}
      >
        <div className="flex w-430 h-20 m-1 rounded-2xl items-center hover:bg-white">
          <img 
            src="/asset/link_icon.svg" 
            alt="Link" 
            className="flex flex-col w-12 h-12 ml-2" 
          />
          <p className="text-blackorange text-2xl font-semibold ml-4">
            Copy link to the clipboard
          </p>
        </div>
      </div>
    </div>
  );
});

export default LinkSection;
