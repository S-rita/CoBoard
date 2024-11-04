import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTopic from './CreateTopic';
import AddPost from './AddPost';
import { fetchTopics, updateLike, addComment } from '../../api'; 
import { UserContext } from '../../UserContext';

const Body = ({ board, forum_name, searchTopicTerm=''}) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isCreateTopicVisible, setCreateTopicVisible] = useState(false);
    const [isAddPostVisible, setAddPostVisible] = useState(false);
    const [forumData, setForumData] = useState(null);
    const [topic_id, setTopicID] = useState(null);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedPosts, setExpandedPosts] = useState({});
    const [newComments, setNewComments] = useState({});
    const [sortOption, setSortOption] = useState('');
    const navigate = useNavigate();
    const [creator_id, setCreatorID] = useState('12345678');
    const [default_sort, setDefaultSort] = useState(0);
    const { user, status } = useContext(UserContext);
    const id = status === "se" ? user.sid : user.aid;

    useEffect(() => {
        const loadTopics = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetchTopics(board, forum_name);
                console.log("API Response:", response);
                
                if (!response || typeof response !== 'object') {
                    throw new Error("Invalid response from server");
                }
                
                setForumData(response);
                setFilteredTopics(response.topics || []);
                setCreatorID(response.creator_id);
            } catch (error) {
                console.error("Failed to load topics", error);
                setError("Failed to load topics. " + (error.message || ''));
            } finally {
                setLoading(false);
            }
        };

        loadTopics();
    }, [board, forum_name]);

    useEffect(() => {
        if (forumData && forumData.topics) {
            let filtered = forumData.topics.filter(topic => 
                topic.text.toLowerCase().includes(searchTopicTerm.toLowerCase())
            );

            // Sort based on the selected option
            if (sortOption === 'latest') {
                filtered.sort((a, b) => b.topic_id - a.topic_id);
            } else if (sortOption === 'popular') {
                filtered.sort((a, b) => (b.posts?.length || 0) - (a.posts?.length || 0));
            }

            setFilteredTopics(filtered);
        }
    }, [searchTopicTerm, forumData, sortOption]);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        setDropdownVisible(false);
    };

    const openCreateTopic = () => {
        setCreateTopicVisible(true);
        navigate(`/coboard/${board}/${forum_name}/topic`);
    };

    const closeCreateTopic = () => {
        setCreateTopicVisible(false);
        navigate(`/coboard/${board}/${forum_name}`);
    };

    const handleCreateTopic = (newTopic) => {
        setForumData(prevData => ({
            ...prevData,
            topics: [...(prevData.topics || []), newTopic]
        }));
    };

    const openAddPost = (topic_id) => {
        setAddPostVisible(true);
        setTopicID(topic_id);
        navigate(`/coboard/${board}/${forum_name}/post`);
    };

    const closeAddPost = () => {
        setAddPostVisible(false);
        navigate(`/coboard/${board}/${forum_name}`);
    };

    const handleCreatePost = (newPost) => {
        setForumData(prevData => {
            const updatedTopics = prevData.topics.map(topic => {
                if (topic.topic_id === topic_id) {
                    return {
                        ...topic,
                        posts: [...(topic.posts || []), newPost]
                    };
                }
                return topic;
            });
            return { ...prevData, topics: updatedTopics };
        });
    };

    const toggleComments = (postId) => {
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
        if (!newComments[postId]) {
            setNewComments(prev => ({ ...prev, [postId]: '' }));
        }
    };

    const handleCommentChange = (postId, value) => {
        setNewComments(prev => ({ ...prev, [postId]: value }));
    };

    const submitComment = async (postId) => {
        if (newComments[postId].trim()) {
            try {
                const s = status === "se" ? user.sid : null;
                const a = status === "a" ? user.aid : null;
                const newComment = await addComment(board, forum_name, postId, newComments[postId], s, a);
                setForumData(prevData => {
                    const updatedTopics = prevData.topics.map(topic => ({
                        ...topic,
                        posts: topic.posts.map(post => 
                            post.post_id === postId
                                ? { ...post, comments: [...post.comments, newComment] }
                                : post
                        )
                    }));
                    return { ...prevData, topics: updatedTopics };
                });
                setNewComments(prev => ({ ...prev, [postId]: '' }));
            } catch (error) {
                console.error("Failed to add comment", error);
            }
        }
    };

    const updateLiked = async (itemId, itemType) => {
        try {
            const updatedItem = await updateLike(board, forum_name, itemId, itemType);
            setForumData(prevData => {
                const updatedTopics = prevData.topics.map(topic => ({
                    ...topic,
                    posts: topic.posts.map(post => {
                        if (itemType === 'post' && post.post_id === itemId) {
                            return { ...post, heart: updatedItem.likes };
                        }
                        return {
                            ...post,
                            comments: post.comments.map(comment => 
                                itemType === 'comment' && comment.comment_id === itemId
                                    ? { ...comment, comment_heart: updatedItem.likes }
                                    : comment
                            )
                        };
                    })
                }));
                return { ...prevData, topics: updatedTopics };
            });
        } catch (error) {
            console.error("Failed to update like", error);
        }
    };

    return (
        <div className="w-full h-screen relative overflow-auto pl-8 pr-28 flex flex-col bg-graybg">
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
                            <input 
                                type="radio" 
                                name="sortOption" 
                                className="mr-2" 
                                checked={sortOption === 'latest'} 
                                onChange={() => handleSortChange('latest')}
                            />
                            <span>Latest</span>
                        </li>
                        <li className="flex items-center whitespace-nowrap py-1">
                            <input 
                                type="radio" 
                                name="sortOption" 
                                className="mr-2" 
                                checked={sortOption === 'popular'} 
                                onChange={() => handleSortChange('popular')}
                            />
                            <span>Most Popular</span>
                        </li>
                    </ul>
                </div>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="w-full h-screen relative overflow-auto">
                    <div className="flex flex-row my-10">
                        {filteredTopics.map((topic) => (
                            <div key={topic.topic_id} className="topic-section flex flex-col">
                                <div className="topic-card w-72 h-24 bg-white rounded-2xl m-6 p-6 relative flex items-center justify-between">
                                    <h2 className="text-xl font-bold self-start h-full flex items-center justify-start">
                                        {topic.text}
                                    </h2>
                                    <div className="border-4 border-basegreen w-7 h-7 rounded-md rounded-bl-none absolute top-0 right-0 m-4 flex items-center justify-center">
                                        <button
                                            onClick={() => openAddPost(topic.topic_id)}
                                            className="text-basegreen text-2xl font-extrabold -mt-1"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="post-section ml-6 mt-3">
                                    {topic.posts && topic.posts.length > 0 ? (
                                        topic.posts.map((post) => (
                                            <div key={post.post_id} className="mb-4">
                                                <div
                                                    className="post-card flex flex-col p-3 border rounded-lg bg-gray-100 shadow w-72 h-fit mt-2 cursor-pointer"
                                                >
                                                    <h4 className="font-semibold">{post.post_head}</h4>
                                                    <p className="text-sm">{post.post_body}</p>
                                                    <div className="flex">
                                                        <p className="flex-col m-1">{post.heart}</p>
                                                        <button
                                                            className="flex-col w-5 h-5 m-1 mt-2"
                                                            onClick={() => updateLiked(post.post_id, 'post')}
                                                        >
                                                            <img src="/asset/heart_icon.svg" className="w-full h-full" alt="Like post" />
                                                        </button>
                                                        <p className="flex-col m-1">{post.comments.length}</p>
                                                        <button
                                                            className="flex-col w-5 h-5 m-1 mt-2"
                                                            onClick={() => toggleComments(post.post_id)}
                                                        >
                                                            <img src="/asset/comment_icon.svg" className="w-full h-full" alt="Comment post" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {expandedPosts[post.post_id] && (
                                                    <div className="comments-section ml-4 mt-2">
                                                        {post.comments.map((comment, index) => (
                                                            <div
                                                                key={index}
                                                                className="comment-card flex flex-col p-3 border rounded-lg bg-white shadow w-64 h-fit mt-2"
                                                            >
                                                                <p className="text-sm">{comment.comment_text}</p>
                                                                <div className="flex">
                                                                    <p className="flex-col m-1">{comment.comment_heart}</p>
                                                                    <button
                                                                        className="flex-col w-5 h-5 m-1 mt-2"
                                                                        onClick={() => updateLiked(comment.comment_id, 'comment')}
                                                                    >
                                                                        <img src="/asset/heart_icon.svg" className="w-full h-full" alt="Like comment" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="new-comment-input mt-2">
                                                            <input
                                                                type="text"
                                                                value={newComments[post.post_id] || ''}
                                                                onChange={(e) => handleCommentChange(post.post_id, e.target.value)}
                                                                placeholder="Add a comment..."
                                                                className="w-full p-2 border rounded"
                                                            />
                                                            <button
                                                                onClick={() => submitComment(post.post_id)}
                                                                className="mt-2 bg-basegreen text-white p-2 rounded"
                                                            >
                                                                Submit Comment
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No posts yet for this topic.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {creator_id === id && (
                <button
                    type="button"
                    onClick={openCreateTopic}
                    className="fixed bottom-0 right-0 p-10 mr-20 z-10 w-44 h-44"
                >
                    <img src="/asset/addTitle_button.svg" className="shadow-xl rounded-full" alt="Add Topic" />
                </button>
            )}
            

            <CreateTopic
                isVisible={isCreateTopicVisible}
                closeCreateTopic={closeCreateTopic}
                onCreateTopic={handleCreateTopic} 
                board={board}
                forum_name={forum_name}
            />
            <AddPost
                isVisible={isAddPostVisible}
                closeAddPost={closeAddPost}
                onPostCreated={handleCreatePost}
                topic_id={topic_id}
                board={board}
                forum_name={forum_name}
            />
        </div>
    );
};

export default Body;