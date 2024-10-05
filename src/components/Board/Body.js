import React from 'react';
import LeftTab from './LeftTab';
import MainBody from './MainBody';

const Body = ({ board }) => {
  return (
    <div className="w-full h-full flex flex-row">
      <LeftTab />
      <MainBody board={board} />
    </div>
  );
};

export default Body;
