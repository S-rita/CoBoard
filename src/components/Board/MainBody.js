import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Preview from './Preview';
import CreateForum from './CreateForum';
import { fetchForums } from '../../api';  

const MainBody = ({ board }) => {
    console.log("Current Board:", board);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isPreviewVisible, setPreviewVisible] = useState(false);
    const [isCreateForumVisible, setCreateForumVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLink, setSelectedLink] = useState('');
    const [selectedForumName, setSelectedForumName] = useState(null); 
    const [forums, setForums] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const navigate = useNavigate();

    const openCreateForum = () => {
        setCreateForumVisible(true);
    };
    
    const closeCreateForum = () => {
        setCreateForumVisible(false);
    };

    const addForum = async (newForum) => {
        if (newForum && newForum.forum_id) {
            // Update the local state immediately
            setForums((prevForums) => [...prevForums, newForum]);
            
            // Optionally, you can refetch forums if needed
            await fetchForums(board); // Ensure loadForums is accessible
        } else {
            console.error("Invalid forum structure", newForum);
        }
    };

    useEffect(() => {
        const loadForums = async () => {
            setLoading(true);
            try {
                const data = await fetchForums(board);
                if (!data || !Array.isArray(data)) {
                    throw new Error("Invalid data format");
                }
                console.log("Fetched Forums:", data); // Log fetched data
                setForums(data);
            } catch (error) {
                console.error("Failed to load forums", error);
                setError("Failed to load forums. " + (error.message || ''));
            } finally {
                setLoading(false);
            }
        };
        
        loadForums();
    }, [board]);  

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const openPreview = (category, link, forumName) => {
        setSelectedCategory(category);
        setSelectedLink(link);
        setSelectedForumName(forumName);
        setPreviewVisible(true);
    };

    const closePreview = () => {
        setPreviewVisible(false);
    };

    const slugify = (text) => {
        return text.toLowerCase().replace(/\s+/g, '-');  
    };

    const joinForum = (forumName) => {
        const slugifiedForumName = slugify(forumName);
        navigate(`/${board}/${slugifiedForumName}`);  
    };

    return (
        <div className="w-fit h-full flex flex-col border-graygreen border-l-4 pl-14 mt-6">
            <div className="w-full flex flex-row justify-between items-center">
                <h1 className="text-5xl text-basegreen font-bold mt-6 ml-10">Forum</h1>
                <div className="relative mr-10">
                    <button 
                        id="sortbyButton" 
                        onClick={toggleDropdown} 
                        className="w-12 h-12"
                    >
                        <img src="/asset/sort.svg" alt="Sort" />
                    </button>
                    {isDropdownVisible && (
                        <div className="absolute right-0 border border-gray-300 rounded-md z-10 bg-white shadow-lg">
                            <ul className="p-2">
                                <li className="flex items-center whitespace-nowrap py-1">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Latest</span>
                                </li>
                                <li className="flex items-center whitespace-nowrap py-1">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Most Popular</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}  
            {loading && <div>Loading...</div>} {/* Display loading message */}

            <div className="grid grid-cols-3 gap-10 w-full h-auto mt-16">
                <div className="flex flex-col w-full h-full justify-center items-center relative">
                    <div className="w-80 h-56 border-4 border-lightgreen border-dashed justify-center items-center rounded-3xl -mt-8">
                        <button 
                            type="button" 
                            onClick={openCreateForum}
                            className="w-full h-full text-9xl text-lightgreen"
                        >
                            +
                        </button>
                    </div>        
                </div>
                {forums.length === 0 && !loading && (
                    <div className="text-center text-lg">No forums available.</div>
                )}
                {forums.map((forum, index) => (
                    forum ? ( // Check if forum is defined
                        <div key={forum.forum_id} className="flex flex-col w-full h-full justify-center items-center group relative">
                            <div className="w-80 h-56 bg-slate-600 justify-center items-center rounded-3xl">
                                <button 
                                    type="button" 
                                    onClick={() => openPreview(forum.forum_name, forum.link, forum.forum_name)}
                                    className="w-full h-full"
                                >
                                    {forum.forum_name}
                                </button>
                            </div>
                            <h3 className="text-2xl font-bold mt-2 self-start ml-14 z-10 group-hover:text-white">
                                {forum.forum_name}
                            </h3>
                            <div className="overlay-content absolute w-340 h-72 opacity-0 rounded-3xl group-hover:opacity-100 bg-black bg-opacity-60 group-hover:pointer-events-none">
                                <p className="mx-10 my-10 text-white">{forum.description}</p>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="text-red-500">Invalid forum data</div> // Optional error handling
                    )
                ))}
            </div>

            {isPreviewVisible && (
                <Preview 
                    category={selectedCategory} 
                    onClose={closePreview} 
                    onJoin={() => joinForum(selectedForumName)} 
                />
            )}
            <CreateForum 
                isVisible={isCreateForumVisible} 
                closeCreateForum={closeCreateForum} 
                board={board} 
                onForumCreated={addForum} 
            />
        </div>
    );
};

export default MainBody;
