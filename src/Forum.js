import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Forum/Header';
import Body from './components/Forum/Body';
import Tab from './components/Forum/Tab';

const Forum = () => {
  const { board, forum_name } = useParams();
  const [searchTopicTerm, setSearchTopicTerm] = useState('');

  return (
    <div className="flex flex-row relative">
      <div className="flex flex-col relative w-full h-fit">
        <Header board={board} forum_name={forum_name} setSearchTopicTerm={setSearchTopicTerm} /> 
        <Body 
          board={board} 
          forum_name={forum_name} 
          searchTopicTerm={searchTopicTerm}
        />
      </div>
      <div className="flex flex-col relative min-w-screen min-h-screen">
        <Tab 
          board={board} 
          forum_name={forum_name} 
        />  
      </div> 
    </div>
  );
};

export default Forum;
