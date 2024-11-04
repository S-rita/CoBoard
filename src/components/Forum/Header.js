import React, { useEffect, useState } from 'react';
import { fetchTopics } from '../../api';
import { formatDistanceToNow } from 'date-fns';

const Header = ({ board, forum_name, setSearchTopicTerm }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState(null);
    const [font, setFont] = useState(0);
    const [creator_id, setCreatorID] = useState('12345678');
    const [createdTime, setCreatedTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState('');
    const [wallpaper, setWallpaper] = useState('#006b62');
    const [isSearchable, setSearchable] = useState(false);

    const handleSearch = (event) => {
        setSearchTopicTerm(event.target.value);
    };

    useEffect(() => {
        const loadTopics = async () => {
            try {
                const response = await fetchTopics(board, forum_name);
                setTitle(response.forum_name);
                setDescription(response.description);
                setIcon(response.icon);
                setFont(response.font);
                setCreatorID(response.creator_id);
                setWallpaper(response.wallpaper);
                
                // Parse the `created_time` to a Date object
                const createdDate = new Date(response.created_time);
                setCreatedTime(createdDate);
            } catch (error) {
                console.error("Failed to load topics", error);
            }
        };
      
        loadTopics();
    }, [board, forum_name]);

    // Use effect to calculate elapsed time when `createdTime` is set
    useEffect(() => {
        if (createdTime) {
            const distance = formatDistanceToNow(createdTime);
            setElapsedTime(distance);
        }
    }, [createdTime]);

    return (
        <div 
            className="w-full h-56 shadow-2xl sticky top-0 left-0"
            style={{ backgroundColor: wallpaper || 'defaultColor' }}
        >
            <a href="/discussion" target="_self">
                <div className="flex items-center">
                    <div className="h-10 w-10 mt-6 ml-6 flex justify-center items-center">
                        <img src="/asset/CoBoard logo.svg" alt="CoBoard Logo" className="w-full h-full" />
                    </div>
                    <p className="text-white mt-6 ml-2 text-sm font-bold">
                        Co<br />Board
                    </p>
                </div>
            </a>
            <div className="flex flex-row justify-between mt-4">
                <div className="flex flex-row h-fit w-fit ml-12 mt-4">
                    <div className="flex flex-col h-20 w-20 rounded-full bg-white">
                        {icon && (
                            <img 
                                src={`data:image/jpeg;base64,${icon}`}
                                alt={`${title} icon`} 
                                className="w-full h-full object-cover rounded-full"
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center ml-6 -mt-3">
                            <h6 className="flex flex-col text-white text-lg font-bold">{creator_id}</h6>
                            <h6 className="flex flex-col text-white text-lg font-bold ml-2">+11</h6>
                            <div className="flex flex-col h-2 w-2 ml-4 bg-black rounded-full"></div>
                            <h6 className="flex flex-col text-white text-lg font-bold ml-4">{elapsedTime}</h6>
                        </div>
                        <h1 className="text-3xl font-bold text-white ml-6">{title}</h1>
                        <h4 className="text-xl font-bold text-graygreen ml-6">{description}</h4>
                    </div>
                </div>
                <div
                    className={`flex items-center h-11 ${
                        isSearchable ? 'w-48' : 'w-24'
                    } bg-white rounded-xl mr-28 -mt-4 shadow-2xl relative transition-all duration-300 ease-in-out`}
                    onClick={() => !isSearchable && setSearchable(true)}
                >
                    {isSearchable ? (
                        <div className="flex items-center w-full px-2">
                            <input
                                type="text"
                                className="flex-grow bg-transparent outline-none"
                                placeholder="Search..."
                                onChange={handleSearch}
                                autoFocus
                            />
                            <button
                                className="text-white hover:text-gray-700 focus:outline-none ml-2"
                                onClick={() => setSearchable(false)}
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <p className="text-xl px-2 py-2 cursor-pointer">
                                &#x1F50D;
                            </p>
                            <div className="absolute inset-0 rounded-xl hover:bg-black hover:bg-opacity-70"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
