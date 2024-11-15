import React from 'react';

const Preview = ({ title, description, tags, allow, onClose, onJoin, previewUrl }) => {
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
                            disabled={!allow}
                            className={`w-56 h-16 rounded-md text-lg font-semibold ${
                                allow ? 'bg-green-200 text-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Join Now
                        </button> 
                    </div>
                </div>
                
                {/* App Preview in iframe */}
                <div className="w-630 h-80 bg-gray-200 flex items-center justify-center mb-4">
                    <iframe
                        src={previewUrl}
                        className="w-full h-full"
                        title="App Preview"
                        frameBorder="0"
                    />
                </div>

                <div className="text-left">
                    <h1 className="text-xl font-bold mb-1">{title}</h1>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
                
                {tags && tags.length > 0 && (
                    <div className="flex flex-row flex-wrap mt-4">
                        {tags.map(tag => (
                            <div 
                                key={tag.tag_id} 
                                className="flex flex-col bg-graygreen w-fit h-11 m-2 p-2 rounded-md items-center justify-center"
                            >
                                <p className="font-bold text-white">{tag.tag_text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Preview;
