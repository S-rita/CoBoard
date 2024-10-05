import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Board/Header';
import Body from './components/Board/Body';

const Board = () => {
  const { board } = useParams();
  return (
    <div>
      <Header className="z-10" />
      <Body board={board} className="z-0"  />
    </div>
  );
};

export default Board;
