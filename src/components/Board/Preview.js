import React from 'react';

const Preview = ({ title, description, onClose, onJoin}) => {
    return (
        <div id="preview" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
            <div className="bg-white w-fit p-6 rounded-2xl shadow-lg relative">
                <div className="flex justify-between items-center mb-6">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-200 text-gray-600 text-xl font-bold"
                    >
                        &times;
                    </button>
                    <div>
                       <button 
                            type="button" 
                            onClick={onJoin} 
                            className="w-56 h-16 rounded-md bg-green-200 text-green-700 text-lg font-semibold"
                        >
                            Join Now
                        </button> 
                    </div>
                    
                </div>
                <div className="w-630 h-80 bg-gray-200 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-gray-500">PREVIEW</span>
                </div>
                <div className="text-left">
                    <h1 className="text-xl font-bold mb-1">{title}</h1>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col bg-graygreen w-fit h-11 m-2 p-2 rounded-md items-center justify-center">
                        <p className="font-bold">Restaurant</p>
                    </div>
                    <div className="flex flex-col bg-graygreen w-fit h-11 m-2 p-2 rounded-md items-center justify-center">
                        <p className="font-bold">Food and Drinks</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
