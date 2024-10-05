import React, { useState } from 'react';

const LeftTab = ({ Name }) => {
    const [isUpperDropdownVisible, setUpperDropdownVisible] = useState(false);
    const [isLowerDropdownVisible, setLowerDropdownVisible] = useState(false);

    const toggleUpperDropdown = () => {
        setUpperDropdownVisible(!isUpperDropdownVisible);
    };

    const toggleLowerDropdown = () => {
        setLowerDropdownVisible(!isLowerDropdownVisible);
    };

    return (
        <div className="w-96 h-full flex flex-col mt-6 items-center">
            <h2 className="text-3xl text-gray1 font-bold text-center mt-4">
                Hello, {Name} <br /> Happy Thursday!
            </h2>
            <div className="bg-white rounded-full h-9 w-72 drop-shadow-md pt-1 px-4 mt-6">
                <p className="text-gray-400 text-lg">{'\uD83D\uDD0D'} Search category...</p>
            </div>
            <div className="w-full flex flex-row justify-between">
                <h3 className="text-gray1 text-2xl font-bold self-start ml-16 mt-6 flex-col">Category</h3>
                <button 
                    type="button" 
                    onClick={() => alert('clear filters')} 
                    className="mt-6 mr-12 text-blue-600 font-bold"
                >
                    clear filters
                </button>
            </div>
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-72 mt-2">
                    <div className="relative">
                        <button 
                            onClick={toggleUpperDropdown} 
                            className="w-full text-black text-left font-bold shadow-lg py-2 px-4 rounded-t-md focus:outline-none"
                        >
                            Food and Drinks
                        </button>
                        {isUpperDropdownVisible && (
                            <div className="border border-t-0 rounded-b-md">
                                <ul className="p-4">
                                    {['Restaurant', 'Cafe', 'Coffee', 'Dessert', 'Cheap'].map(item => (
                                        <li key={item} className="flex items-center whitespace-nowrap py-1">
                                            <input type="checkbox" className="mr-2" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-72 mt-2">
                    <div className="relative">
                        <button 
                            onClick={toggleLowerDropdown} 
                            className="w-full text-black text-left font-bold shadow-lg py-2 px-4 rounded-t-md focus:outline-none"
                        >
                            Job Hunting
                        </button>
                        {isLowerDropdownVisible && (
                            <div className="border border-t-0 rounded-b-md">
                                <ul className="p-4">
                                    {['Full-time Job', 'Part-time Job', 'Charitable'].map(item => (
                                        <li key={item} className="flex items-center whitespace-nowrap py-1">
                                            <input type="checkbox" className="mr-2" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftTab;
