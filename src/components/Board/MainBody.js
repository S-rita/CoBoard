import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Preview from './Preview';
import CreateForum from './CreateForum';
import { fetchForums } from '../../api';  
import { UserContext } from '../../UserContext';

const MainBody = ({ board, searchForumTerm='', tagfiltered=[] }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isPreviewVisible, setPreviewVisible] = useState(false);
    const [isCreateForumVisible, setCreateForumVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [forums, setForums] = useState([]);
    const [board_tags, setBoardTags] = useState([]);
    const [forumtag, setForumTag] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredForums, setFilteredForums] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { status } = useContext(UserContext);
    console.log(status);

    const openCreateForum = () => {
        setCreateForumVisible(true);
    };
    
    const closeCreateForum = () => {
        setCreateForumVisible(false);
    };

    const addForum = async (newForum) => {
        if (newForum && newForum.forum_id) {
            setForums((prevForums) => [...prevForums, newForum]);
            await fetchForums(board);
        } else {
            console.error("Invalid forum structure", newForum);
        }
    };

    useEffect(() => {
        const loadForums = async () => {
            setLoading(true);
            try {
                const data = await fetchForums(board);
                if (!data || !data.forums || !Array.isArray(data.forums)) {
                    throw new Error("Invalid data format");
                }
                console.log("Fetched Forums:", data.forums);
                console.log("Fetched ForumTag:", data.forumtag);
                setForums(data.forums);
                setBoardTags(data.tags);
                setForumTag(data.forumtag);
            } catch (error) {
                console.error("Failed to load forums", error);
                setError("Failed to load forums. " + (error.message || ''));
            } finally {
                setLoading(false);
            }
        };
        
        loadForums();
    }, [board]);  

    useEffect(() => {
        if (searchForumTerm === '') {
            setFilteredForums([...forums]);
        } else {
            const filtered = forums.filter(forum => 
                forum.forum_name.toLowerCase().startsWith(searchForumTerm.toLowerCase())
            );
            setFilteredForums([...filtered]);
        }
    }, [searchForumTerm, forums]);
    
    useEffect(() => {
        if (tagfiltered.length === 0) {
            setFilteredForums([...forums]);
        } else {
            const filtered = forums.filter(forum => 
                forumtag.some(ft => 
                    ft.forum_id === forum.forum_id && tagfiltered.includes(ft.tag_id)
                )
            );
            setFilteredForums([...filtered]);
        }
    }, [tagfiltered, forums, forumtag]);    

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const openPreview = (forum) => {
        const forumTags = forumtag
            .filter(ft => ft.forum_id === forum.forum_id)
            .map(ft => board_tags.find(tag => tag.tag_id === ft.tag_id))
            .filter(tag => tag !== undefined); // Ensure only valid tags are included
    
        setTitle(forum.forum_name);
        setDescription(forum.description);
        setTags(forumTags);
        setPreviewVisible(true);
    };

    const closePreview = () => {
        setPreviewVisible(false);
    };

    const slugify = (forumName) => {
        return forumName
            .toLowerCase()
            .replace(/\s+/g, '-')          // Replace spaces with -
            .replace(/[[]/g, '-')          // Replace [ with -
            .replace(/[\]]/g, '-')         // Replace ] with -
            .replace(/;/g, '-')            // Replace ; with -
            .replace(/[^a-z0-9-]/g, '')    // Remove all non-alphanumeric characters except -
            .replace(/--+/g, '-')          // Replace multiple - with a single -
            .trim();
    };

    const joinForum = (forumName) => {
        const slugifiedForumName = slugify(forumName);
        navigate(`/coboard/${board}/${slugifiedForumName}`);   
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
            {loading && <div>Loading...</div>}

            <div className="grid grid-cols-3 gap-10 w-full h-auto mt-16">
                {status === "se" && (
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
                )} 
                {forums.length === 0 && !loading && (
                    <div className="text-center text-lg">No forums available.</div>
                )}
                {filteredForums.map((forum, index) => (
                    forum ? (
                        <div key={forum.forum_id} className="flex flex-col w-full h-full justify-center items-center group relative">
                            <div className="w-80 h-56 justify-center items-center rounded-3xl overflow-hidden"
                                style={{ backgroundColor: forum.wallpaper || 'basegreen' }}
                            >
                                <button 
                                    type="button" 
                                    onClick={() => openPreview(forum)} // Pass the entire forum object
                                    className="w-full h-full"
                                >
                                    {forum.icon && (
                                        <img 
                                            src={`data:image/jpeg;base64,${forum.icon}`}
                                            alt={`${forum.forum_name} icon`} 
                                            className="w-full h-full object-cover"
                                        />
                                    )}
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
                        <div key={index} className="text-red-500">Invalid forum data</div>
                    )
                ))}
            </div>

            {isPreviewVisible && (
                <Preview 
                    title={title} 
                    description={description}
                    tags={tags}
                    onClose={closePreview} 
                    onJoin={() => joinForum(title)} 
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