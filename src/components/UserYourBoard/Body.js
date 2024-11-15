import React from 'react';
import LeftTab from './LeftTab';
import MainBody from './MainBody';

const Body = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <LeftTab />
      <MainBody />
    </div>
  );
};

export default Body;
