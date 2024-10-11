import React, { useState } from 'react';

const AccessSection = ({ handleAccess = () => {} }) => {
  const [accessDropdownVisible, setAccessDropdownVisible] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState({ text: 'Select Access', icon: null, type: '' });

  const handleAccessSelection = (type, text, icon) => {
    handleAccess(type); // Call the parent handler with the selected access type
    setSelectedAccess({ text, icon, type }); // Update selected access state
    setAccessDropdownVisible(false); // Close the dropdown
  };

  return (
    <div className="p-2">
      <h1 className="text-gray1 font-bold text-xl">Access</h1>
      <div className="w-500 h-fit bg-basegreen mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
        <div className="justify-between flex w-full">
          <h2 className="text-xl self-start m-1 mt-4 font-bold text-white">Access</h2>
          <div className="relative">
            <div className="bg-white w-56 h-14 rounded-3xl flex items-center justify-between p-2 cursor-pointer" onClick={() => setAccessDropdownVisible(!accessDropdownVisible)}>
              <div className="flex items-center">
                {selectedAccess.icon && <img src={selectedAccess.icon} className="w-10 h-10 mr-2" alt={selectedAccess.text} />}
                <p className="text-black">{selectedAccess.text}</p>
              </div>
              <button className="text-3xl font-bold">v</button>
            </div>
            {accessDropdownVisible && (
              <div className="absolute right-0 mt-2 border border-gray-300 rounded-md bg-white shadow-lg w-56 z-10">
                <ul className="p-2">
                  <li
                    onClick={() => handleAccessSelection('public', 'Public', '/asset/public_button.svg')}
                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <img src="/asset/public_button.svg" className="w-10 h-10 mr-2" alt="Public" />
                    <span className="font-semibold">Public</span>
                  </li>
                  <li
                    onClick={() => handleAccessSelection('private', 'Private', '/asset/private_button.svg')}
                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <img src="/asset/private_button.svg" className="w-10 h-10 mr-2" alt="Private" />
                    <span className="font-semibold">Private</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end mt-2">
          {selectedAccess.type === 'public' && (
            <p id="create-public" className="text-white font-bold text-sm text-right">
              Anyone on the internet can access,<br />make topics, and add comments
            </p>
          )}
          {selectedAccess.type === 'private' && (
            <p id="create-private" className="text-white font-bold text-sm text-right">
              Only people with access can open with the link
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessSection;
