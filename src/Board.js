import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Board/Header';
import Body from './components/Board/Body';

const Board = () => {
  const { board } = useParams();
  const [searchForumTerm, setSearchForumTerm] = useState('');
  return (
    <div>
      <Header className="z-10" setSearchForumTerm={setSearchForumTerm} />
      <Body board={board} className="z-0" searchForumTerm={searchForumTerm} />
    </div>
  );
};

export default Board;
