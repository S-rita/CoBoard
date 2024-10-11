import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Forum/Header';
import Body from './components/Forum/Body';
import Tab from './components/Forum/Tab';

const Forum = () => {
  // Destructure both scope and forum_name from the URL
  const { board, forum_name } = useParams();

  return (
    <div className="flex flex-row relative">
      <div className="flex flex-col relative w-full h-fit">
        <Header board={board} forum_name={forum_name}/> 
        {/* Pass both scope and forum_name to the Body component */}
        <Body board={board} forum_name={forum_name} />
      </div>
      <div className="flex flex-col relative min-w-screen min-h-screen">
        <Tab board={board} forum_name={forum_name} />  
      </div> 
    </div>
  );
};

export default Forum;
