import React, { useState } from 'react';

const TagSection = React.forwardRef(({ tags, btags, setTags }, ref) => {
  const [searchText, setSearchText] = useState('');

  // Filter `btags` to exclude already selected `tags` and limit to top five for initial display
  const availableTags = btags.filter(btag => !tags.some(tag => tag.tag_id === btag.tag_id));
  const filteredTags = availableTags
    .filter(btag => btag.tag_text.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, 5);

  const handleAddTag = (tag) => {
    setTags(prevTags => [...prevTags, tag]);
  };

  const handleRemoveTag = (tagId) => {
    setTags(prevTags => prevTags.filter(tag => tag.tag_id !== tagId));
  };

  return (
    <div ref={ref} className="p-2">
      <h1 className="text-gray1 font-bold text-xl">Tags</h1>
      <div className="w-500 h-fit bg-basegreen mt-4 rounded-2xl py-4 px-10 flex flex-col items-center">
        <h2 className="text-xl self-start m-1 font-bold text-white">Tags</h2>
        <div className="bg-white w-430 min-h-10 m-1 rounded-2xl flex flex-wrap p-2">
          {tags.map(tag => (
            <button
              key={tag.tag_id}
              className="m-1 px-3 py-2 rounded-md text-white bg-basegreen"
              onClick={() => handleRemoveTag(tag.tag_id)}
            >
              {tag.tag_text}
            </button>
          ))}
        </div>
        <div className="my-4 flex justify-center">
          <div className="w-430 h-0.5 bg-darkgreen"></div>
        </div>
        <h2 className="text-xl self-start m-1 font-bold text-white">Add Tags</h2>
        <input
          type="text"
          placeholder="Search tags..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-white w-430 h-10 m-1 p-2 rounded-2xl"
        />
        <div className="bg-white w-430 min-h-10 m-1 rounded-2xl flex flex-wrap p-2">
          {filteredTags.map(tag => (
            <button
              key={tag.tag_id}
              className="m-1 px-3 py-2 rounded-md text-white bg-darkorange"
              onClick={() => handleAddTag(tag)}
            >
              {tag.tag_text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default TagSection;
