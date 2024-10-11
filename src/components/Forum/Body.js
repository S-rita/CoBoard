import React, { useState, useEffect } from 'react';
import CreateTopic from './CreateTopic';
import { fetchTopics } from '../../api'; 

const Body = ({ board, forum_name }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isCreateTopicVisible, setCreateTopicVisible] = useState(false);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [wallpaper, setWallpaper] = useState('#D9D9D9');  // State for wallpaper

    useEffect(() => {
        const loadTopics = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetchTopics(board, forum_name);
                if (!response || !response.topics || !Array.isArray(response.topics)) {
                    throw new Error("Invalid data format");
                }
                setTopics(response.topics);  // Set the topics
                setWallpaper(response.wallpaper);  // Set wallpaper from the response
            } catch (error) {
                console.error("Failed to load topics", error);
                setError("Failed to load topics. " + (error.message || ''));
            } finally {
                setLoading(false);
            }
        };

        loadTopics();
    }, [board, forum_name]);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const openCreateTopic = () => {
        setCreateTopicVisible(true);
    };

    const closeCreateTopic = () => {
        setCreateTopicVisible(false);
    };

    const handleCreateTopic = (newTopic) => {
        setTopics([...topics, newTopic]);
    };

    return (
        <div 
            className="w-full h-screen relative overflow-auto pl-8 pr-28 flex flex-col" 
            style={{ backgroundColor: wallpaper || 'defaultColor' }}  // Set the background color dynamically
        >
            <button
                id="sortbyForumButton"
                onClick={toggleDropdown}
                className="w-12 h-12 fixed right-0 mt-4 mr-24 z-10"
            >
                <img src="/asset/sort.svg" alt="Sort" />
            </button>

            {isDropdownVisible && (
                <div className="fixed right-0 mt-14 mr-4 border border-gray-300 rounded-md z-10 bg-white shadow-lg">
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

            {/* Loading and Error Handling */}
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className="w-full h-screen relative overflow-auto">
                    <div className="flex flex-row my-10">
                        {topics.map((topic) => (
                            <div key={topic.topic_id} className="topic-section flex flex-col">
                                <div className="topic-card w-72 h-24 bg-white rounded-2xl m-6 p-6 relative flex items-center justify-between">
                                    <h2 className="text-xl font-bold self-start h-full flex items-center justify-start">
                                        {topic.text}
                                    </h2>
                                    <div className="border-4 border-basegreen w-7 h-7 rounded-md rounded-bl-none absolute top-0 right-0 m-4 flex items-center justify-center">
                                        <button
                                            onClick={() => alert('add new comment')}
                                            className="text-basegreen text-2xl font-extrabold -mt-1"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="comments-section ml-6 mt-3">
                                    {topic.comments && topic.comments.length > 0 ? (
                                        topic.comments.map((comment, index) => (
                                            <div
                                                key={index}
                                                className="comment-card flex flex-col p-3 border rounded-lg bg-gray-100 shadow w-72 h-fit mt-2"
                                            >
                                                <h4 className="font-semibold">{comment.head}</h4>
                                                <p className="text-sm">{comment.text}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={openCreateTopic}
                className="fixed bottom-0 right-0 p-10 mr-20 z-10 w-44 h-44"
            >
                <img src="/asset/addTitle_button.svg" className="shadow-xl rounded-full" alt="Add Topic" />
            </button>

            <CreateTopic
                isVisible={isCreateTopicVisible}
                closeCreateTopic={closeCreateTopic}
                onCreateTopic={handleCreateTopic} 
                board={board}
                forum_name={forum_name}
            />
        </div>
    );
};

export default Body;
