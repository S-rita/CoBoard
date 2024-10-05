import React, { useState } from 'react';

const AppearanceSection = ({ handleSortBy }) => {
  const [selectedFont, setSelectedFont] = useState('');
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState({ text: 'Select Sort', icon: null });
  const [selectedColor, setSelectedColor] = useState('#D9D9D9'); // State for selected color

  const handleFontSelection = (font) => {
    setSelectedFont(font);
  };

  const handleSortSelection = (type, text, icon) => {
    handleSortBy(type);
    setSelectedSort({ text, icon });
    setSortDropdownVisible(false);
  };

  return (
    <div className="p-2">
      <h1 className="text-gray1 font-bold text-xl">Appearance</h1>
      <div className="w-500 h-fit bg-basegreen mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
        
        {/* Wallpaper Section with Color Input */}
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-11 font-bold text-white">Wallpaper</h2>
          <div className="flex flex-row items-center space-x-2">
            <input 
              type="color" 
              className="w-44 h-28 rounded-xl mr-4 border-0 cursor-pointer" 
              defaultValue={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)} // Update color state on change
              style={{ 
                backgroundColor: selectedColor,
                appearance: 'none', // Remove default styling
                outline: 'none', // Remove focus outline
                border: 'none', // Remove border
                boxShadow: 'none', // Remove any shadow
              }} 
            />
          </div>
        </div>

        <div className="my-4 flex justify-center">
          <div className="w-430 h-0.5 bg-darkgreen"></div>
        </div>

        {/* Font Selection Section */}
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-4 font-bold text-white">Font</h2>
          <div className="flex flex-row items-center space-x-4">
            <button 
              className={`text-lg font-bold w-20 h-14 rounded-xl ${selectedFont === 'Font1' ? 'bg-white text-basegreen' : 'bg-graygreen text-gray1'}`} 
              onClick={() => handleFontSelection('Font1')}
            >
              Font1
            </button>
            <button 
              className={`text-lg font-bold w-20 h-14 rounded-xl ${selectedFont === 'Font2' ? 'bg-white text-basegreen' : 'bg-graygreen text-gray1'}`} 
              onClick={() => handleFontSelection('Font2')}
            >
              Font2
            </button>
            <button 
              className={`text-lg font-bold w-20 h-14 rounded-xl ${selectedFont === 'Font3' ? 'bg-white text-basegreen' : 'bg-graygreen text-gray1'}`} 
              onClick={() => handleFontSelection('Font3')}
            >
              Font3
            </button>
          </div>
        </div>

        <div className="my-4 flex justify-center">
          <div className="w-430 h-0.5 bg-darkgreen"></div>
        </div>

        {/* Sort by Section */}
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-4 font-bold text-white">Sort by</h2>
          <div className="relative">
            <div className="bg-white w-56 h-14 rounded-3xl flex items-center justify-between p-2 cursor-pointer" onClick={() => setSortDropdownVisible(!sortDropdownVisible)}>
              <div className="flex items-center">
                {selectedSort.icon && <img src={selectedSort.icon} className="w-10 h-10 mr-2" alt={selectedSort.text} />}
                <p className="text-black">{selectedSort.text}</p>
              </div>
              <button className="text-3xl font-bold">v</button>
            </div>
            {sortDropdownVisible && (
              <div className="absolute right-0 mt-2 border border-gray-300 rounded-md bg-white shadow-lg w-56 z-10">
                <ul className="p-2">
                  <li 
                    onClick={() => handleSortSelection('latest', 'Latest', '/asset/lastest_icon.svg')} 
                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <img src="/asset/lastest_icon.svg" className="w-10 h-10 mr-2" alt="Latest" />
                    <span className="font-semibold">Latest</span>
                  </li>
                  <li 
                    onClick={() => handleSortSelection('likes', 'Likes', '/asset/heart_icon.svg')} 
                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <img src="/asset/heart_icon.svg" className="w-10 h-10 mr-2" alt="Likes" />
                    <span className="font-semibold">Likes</span>
                  </li>
                  <li 
                    onClick={() => handleSortSelection('comments', 'Comments', '/asset/comment_icon.svg')} 
                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  >
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
