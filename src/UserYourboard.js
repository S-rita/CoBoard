import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/UserYourBoard/Header';
import Body from './components/UserYourBoard/Body';

const UserYourBoard = () => {  
  return (
    <div className="h-screen w-full overflow-y-hidden">
      <Header />
      <div className="h-full mt-2">
        <Body />
      </div>
    </div>
  );
};

export default UserYourBoard;