import React, { useState, useEffect } from 'react';
import { fetchTopics } from '../../api';

const AccessSection = ({ handleAccess = () => {}, allowed, setAllowed }) => {
  const [accessListVisible, setAccessListVisible] = useState(false);
  const [accessDropdownVisible, setAccessDropdownVisible] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState({ text: 'Select Access', icon: null, type: '' });
  const [startsWithValue, setStartsWithValue] = useState('');
  const [startsWithError, setStartsWithError] = useState('');
  const [onlyValue, setOnlyValue] = useState('');
  const [onlyError, setOnlyError] = useState('');
  const [startsWithValues, setStartsWithValues] = useState([]);
  const [onlyValues, setOnlyValues] = useState([]);

  const handleAccessSelection = (type, text, icon) => {
    handleAccess(type);
    setSelectedAccess({ text, icon, type });
    setAccessDropdownVisible(false);
    setAccessListVisible(type === 0); // Automatically show access list if Private
  };

  useEffect(() => {
    console.log("StartsWithValues:", startsWithValues, "OnlyValues:", onlyValues);
    if (startsWithValues.length == 0 && onlyValues.length == 0) {
      handleAccessSelection(1, 'Public', '/asset/public_button.svg');
    } else {
      handleAccessSelection(0, 'Private', '/asset/private_button.svg');
    } 
  }, [startsWithValues, onlyValues]);

  const handleStartsWithChange = (e) => {
    setStartsWithValue(e.target.value);
  };

  const handleOnlyChange = (e) => {
    setOnlyValue(e.target.value);
  };

  const handleStartsWithSubmit = () => {
    const intValue = parseInt(startsWithValue, 10);
    if (isNaN(intValue) || intValue < 52 || intValue > 67) {
      setStartsWithError('Please enter a number between 52 and 67');
    } else {
      setStartsWithError('');
      setAllowed([...allowed, startsWithValue]);
      setStartsWithValues([...startsWithValues, startsWithValue]);
      setStartsWithValue('');
    }
  };

  const handleOnlySubmit = () => {
    const isValid =
      onlyValue.length === 8 &&
      parseInt(onlyValue.slice(0, 2), 10) >= 52 &&
      parseInt(onlyValue.slice(0, 2), 10) <= 67 &&
      onlyValue.slice(2, 4) === '01' &&
      /^[0-9]+$/.test(onlyValue.slice(4));

    if (!isValid) {
      setOnlyError('Must follow pattern: "52-67" + "01" + four digits');
    } else {
      setOnlyError('');
      setAllowed([...allowed, onlyValue]);
      setOnlyValues([...onlyValues, onlyValue]);
      setOnlyValue('');
    }
  };

  const removeStartsWithValue = (index) => {
    const valueToRemove = startsWithValues[index];
    setStartsWithValues(startsWithValues.filter((_, i) => i !== index));
    setAllowed(allowed.filter((value) => value !== valueToRemove));
  };

  const removeOnlyValue = (index) => {
    const valueToRemove = onlyValues[index];
    setOnlyValues(onlyValues.filter((_, i) => i !== index));
    setAllowed(allowed.filter((value) => value !== valueToRemove));
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
                    onClick={() => handleAccessSelection(1, 'Public', '/asset/public_button.svg')}
                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <img src="/asset/public_button.svg" className="w-10 h-10 mr-2" alt="Public" />
                    <span className="font-semibold">Public</span>
                  </li>
                  <li
                    onClick={() => handleAccessSelection(0, 'Private', '/asset/private_button.svg')}
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
          {selectedAccess.type === 1 && (
            <p id="create-public" className="text-white font-bold text-sm text-right">
              Anyone on the internet can access,<br />make topics, and add comments
            </p>
          )}
          {selectedAccess.type === 0 && (
            <div>
              <p id="create-private" className="text-white font-bold text-sm text-right">
                Only people with access can open with the link
              </p>
              {accessListVisible && (
                <div className="mt-2 border border-gray-300 rounded-md bg-white shadow-lg w-72 z-10 h-fit">
                  <div className="w-fit h-fit rounded-2xl py-4 px-2 flex flex-col items-center">
                    <div className="mb-4 flex flex-row">
                      {startsWithValues.map((value, index) => (
                        <div key={index} className="w-fit m-1 px-4 py-2 rounded-md text-white bg-basegreen flex items-center">
                          {value}-
                          <button onClick={() => removeStartsWithValue(index)} className="ml-3 text-white font-bold">x</button>
                        </div>
                      ))}
                      {onlyValues.map((value, index) => (
                        <div key={index} className="w-fit m-1 px-4 py-2 rounded-md text-white bg-basegreen flex items-center">
                          {value}
                          <button onClick={() => removeOnlyValue(index)} className="ml-3 text-white font-bold">x</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-row justify-between w-full m-2">
                      <p className="font-semibold text-gray1 mr-4 mt-1">Starts with</p>
                      <div className="w-24 h-8 border-black border-2 rounded-md flex items-center">
                        <input
                          type="number"
                          value={startsWithValue}
                          onChange={handleStartsWithChange}
                          className="w-full h-full text-center outline-none"
                          placeholder="52-67"
                        />
                      </div>
                      <button onClick={handleStartsWithSubmit} className="ml-2 p-1 bg-blue-500 text-white rounded-md">
                        Submit
                      </button>
                    </div>
                    {startsWithError && <p className="text-redselect text-xs">{startsWithError}</p>}
                    <div className="flex flex-row justify-between w-full m-2">
                      <p className="font-semibold text-gray1 mr-4 mt-1">Only</p>
                      <div className="w-24 h-8 border-black border-2 rounded-md flex items-center">
                        <input
                          type="text"
                          value={onlyValue}
                          onChange={handleOnlyChange}
                          className="w-full h-full text-center outline-none"
                          placeholder="6601xxxx"
                        />
                      </div>
                      <button onClick={handleOnlySubmit} className="ml-2 p-1 bg-blue-500 text-white rounded-md">
                        Submit
                      </button>
                    </div>
                    {onlyError && <p className="text-redselect text-xs">{onlyError}</p>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessSection;
