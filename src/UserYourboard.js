import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/User/Header';
import Body from './components/User/YourBoard/Body'; // Assuming MainBody is the component to be rendered in Body

const UserYourBoard = () => {
  const [searchForumTerm, setSearchForumTerm] = useState('');
  const { board } = useParams(); // Ensure this is properly set in your routing

  return (
    <div className="h-screen w-full overflow-y-hidden">
      <Header 
        setSearchForumTerm={setSearchForumTerm} 
      />
      <div className="h-full">
        <Body 
          board={board}
          searchForumTerm={searchForumTerm} 
        />
      </div>
    </div>
  );
};

export default UserYourBoard;
