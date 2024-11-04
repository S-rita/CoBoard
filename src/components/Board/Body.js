import React, {useState} from 'react';
import LeftTab from './LeftTab';
import MainBody from './MainBody';

const Body = ({ board, searchForumTerm }) => {
  const [tagfiltered, setTagFiltered] = useState([]);

  return (
    <div className="w-full h-full flex flex-row">
      <LeftTab board={board} setTagFiltered={setTagFiltered} />
      <MainBody board={board} searchForumTerm={searchForumTerm} tagfiltered={tagfiltered} />
    </div>
  );
};

export default Body;
