import React, { useEffect, useState } from 'react';
import { fetchTopics } from '../../api';

const InfoPanel = ({ isVisible, closeInfoPanel, board, forum_name }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);
  const [wallpaper, setWallpaper] = useState('#006b62');
  const [font, setFont] = useState(0);
  const [sortby, setSortBy] = useState(0);
  const [access, setAccess] = useState(0);
  const [creator_id, setCreatorID] = useState('12345678');
  const [image, setImage] = useState('');
  const [topic, setTopic] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalReactions, setTotalReactions] = useState(0);
  const [totalContributors, setContributor] = useState(0); 

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await fetchTopics(board, forum_name);
        setTitle(response.forum_name);
        setDescription(response.description);
        setIcon(response.icon);
        setWallpaper(response.wallpaper);
        setFont(response.font);
        setSortBy(response.sortby);
        setCreatorID(response.creator_id);
        setTopic(response.topics);
  
        let postsCount = 0;
        let commentsCount = 0;
        let reactionsCount = 0;
        const contributorsSet = new Set();
  
        response.topics.forEach(topic => {
          postsCount += topic.posts.length;
          
          topic.posts.forEach(post => {
            // Add the post creator to the contributors set
            contributorsSet.add(post.s_creator || post.a_creator);
  
            commentsCount += post.comments.length;
            reactionsCount += post.heart;
  
            post.comments.forEach(comment => {
              // Add the comment creator to the contributors set
              contributorsSet.add(comment.comment_creator);
              reactionsCount += comment.comment_heart;
            });
          });
        });
  
        setTotalPosts(postsCount);
        setTotalComments(commentsCount);
        setTotalReactions(reactionsCount);
        setContributor(contributorsSet.size); // Total unique contributors
  
      } catch (error) {
        console.error("Failed to load topics", error);
      }
    };
  
    loadTopics();
  }, [board, forum_name]);
  

  useEffect(() => {
    if (icon) {
        setImage(`data:image/jpeg;base64,${icon}`);
    }
  }, [icon]);

  if (!isVisible) return null;

  return (
    <div id="infopanel" className="fixed inset-0 z-20 flex items-end justify-end bg-black bg-opacity-50">
      <div className="bg-darkorange w-panel h-screen p-7 rounded-2xl rounded-r-none shadow-lg relative overflow-y-scroll overflow-x-hidden">
        <button
          onClick={closeInfoPanel}
          className="absolute top-0 left-0 w-12 h-12 ml-7 mt-12 text-4xl text-white font-extrabold"
        >
          &times;
        </button>
        <h1 className="text-4xl text-center mt-7 text-white font-bold">About this forum</h1>
        <div className="w-500 h-80 bg-white mt-12 rounded-2xl flex justify-center items-center">
          {icon && (
            <img 
              src={`data:image/jpeg;base64,${icon}`}
              alt={`${title} icon`} 
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>
        <h1 className="text-white font-bold text-3xl mt-5 ml-3">{title}</h1>
        <div className="w-500 h-fit bg-lightorange mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Made by</p>
            <p className="text-lg font-semibold text-black">{creator_id}</p>
          </div>
          <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Made on</p>
            <p className="text-lg font-semibold text-black">12 January 2023</p>
          </div>
          <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Last update on</p>
            <p className="text-lg font-semibold text-black">13 September 2024</p>
          </div>
          <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Access</p>
            <p className="text-lg font-semibold text-black">Public</p>
          </div>
        </div>
        <div className="w-500 h-fit bg-lightorange mt-6 rounded-2xl py-4 px-10 flex flex-col items-center">
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Contributors</p>
            <p className="text-lg font-semibold text-black">{totalContributors}</p>
          </div>
          <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Topics</p>
            <p className="text-lg font-semibold text-black">{topic.length}</p>
          </div>
          <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Posts</p>
            <p className="text-lg font-semibold text-black">{totalPosts}</p>
          </div>
          <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Comments</p>
            <p className="text-lg font-semibold text-black">{totalComments}</p>
          </div>
          <div className="my-4 flex justify-center">
            <div className="w-430 h-0.5 bg-darkorange"></div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-lg font-semibold text-gray1">Reactions</p>
            <p className="text-lg font-semibold text-black">{totalReactions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
