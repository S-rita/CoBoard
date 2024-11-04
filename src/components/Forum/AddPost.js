import React, { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { createPost } from '../../api'; 
import { UserContext } from '../../UserContext';

const AddPost = ({ isVisible, closeAddPost, onPostCreated, topic_id, board, forum_name }) => {
    const [postText, setPostText] = useState('');
    const [postDetail, setPostDetail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  
    const location = useLocation();
    const { user, status } = useContext(UserContext);

    const handlePublish = async () => {
        if (postText.trim() === '') {
            alert('Title cannot be empty!');
            return;
        }
        console.log("ds", status, user);

        const postData = {
            post_head: postText,
            post_body: postDetail,
            heart: 0,
            spost_creator: status === "se" ? user.sid : null,
            apost_creator: status === "a" ? user.aid : null
        };

        try {
            const createdPost = await createPost(board, forum_name, topic_id, postData);
            console.log('Created post:', createdPost);
            onPostCreated(createdPost);
      
            setPostText('');
            setPostDetail('');
      
            closeAddPost();
        } catch (error) {
            if (error.response) {
              console.error('Error creating post:', error.response.data);
            } else {
              console.error('Error creating post:', error.message);
            }
            alert('Error creating post. Please try again.');
        }
    };

    return (
        <>
            {isVisible && (
                <div id="addpost" className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-400 p-6 rounded-2xl shadow-lg relative">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={closeAddPost} className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 text-gray-600 text-xl font-bold">
                                &times;
                            </button>
                            <div className="flex items-center space-x-4">
                                <button onClick={handlePublish} className="w-28 h-10 rounded-md bg-basegreen text-white text-lg font-semibold">
                                    Publish
                                </button>
                            </div>
                        </div>                       
                        <input
                            type="text"
                            placeholder="What's your answer?"
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            className="w-full p-2 mb-4 rounded-md text-gray1 font-semibold text-xl"
                        />
                        <input
                            type="text"
                            placeholder="any detail"
                            value={postDetail}
                            onChange={(e) => setPostDetail(e.target.value)}
                            className="w-full h-48 p-2 mb-4 rounded-md text-gray1 font-semibold text-lg border-2"
                        />
                        <div className="w-full h-56 bg-white flex items-center justify-center mb-4 border-4 border-gray1 rounded-xl border-dashed">
                            <span className="text-xl font-bold text-gray-500">Add a picture</span>
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPost;
