import React from 'react';
import { Link } from 'react-router-dom';

const sidebars = [
    { label: "Profile", link: "/:user/profile" },
    { label: "Your Board", link: "/:user/yourboard" },
    { label: "File Archive", link: "/:user/yourarchive" },
    { label: "Bookmarks", link: "/:user/yourbookmark" },
];

const LeftTab = () => {
    return (
        <div className="w-64 h-full bg-white shadow-md flex">
            <div className="flex-grow flex flex-col">
                {sidebars.map((part, index) => (
                    <div key={part.label}>
                        <Link 
                            to={part.link} 
                            className="flex justify-between items-center p-6 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex-1"
                        >
                            <span className="flex-grow text-lg font-semibold text-right">{part.label}</span>
                            <span className="text-gray-600">
                                {part.label === "File Archive" && <span>(5)</span>}
                                {part.label === "Bookmarks" && <span>(9)</span>}
                            </span>
                        </Link>
                        {/* Add horizontal line separator except for the last item */}
                        {index < sidebars.length - 1 && <hr className="border-t border-gray-300 my-0" />}
                    </div>
                ))}
            </div>
            <div className="w-1 bg-green-500"></div> {/* Green vertical line */}
        </div>
    );
};

export default LeftTab;
