import React from "react";

const YourBoardView = ({
  isDropdownVisible,
  userData,
  loading,
  error,
  sortBy,
  forums,
  filteredForums,
  searchForumTerm,
  toggleDropdown,
  handleSortSelection,
  navigate,
  onEditClick

}) => {
  const slugify = (forumName) => {
    return forumName
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[[]/g, '-') // Replace [ with -
      .replace(/[\]]/g, '-') // Replace ] with -
      .replace(/=/g, '-') // Replace = with -
      .replace(/;/g, '-') // Replace ; with -
      .replace(/[^a-z0-9-]/g, '') // Remove all non-alphanumeric characters except -
      .replace(/--+/g, '-') // Replace multiple - with a single -
      .trim();
  };

  const joinForum = (forumName, board) => {
    const slugifiedForumName = slugify(forumName);
    navigate(`/coboard/${board}/${slugifiedForumName}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mt-6 ml-4">
      <div className="flex flex-row items-center mt-12 ml-10 gap-6">
        <div className="text-black text-4xl font-bold whitespace-nowrap">Your Board</div>
        <div className="bg-gray-400 h-[3px] w-[940px] flex-shrink-0" />
      </div>

        <div className="ml-[1000px] flex gap-5">
          <button className="bg-gray-300 text-gray-700 py-2 px-10 rounded-xl hover:bg-gray-400"
            onClick={onEditClick} // Call the toggle function on click
          >
            Edit
          </button>
          <img
            src="/asset/sort.svg"
            alt="Sort"
            onClick={toggleDropdown}
            className="w-12 h-12 cursor-pointer"
          />
          <div
            className={`absolute bg-white border border-gray-300 rounded-md shadow-lg mt-[50px] z-10 right-[70px] transition-all duration-100 ${
              isDropdownVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <ul className="p-2">
              <li
                onClick={() => handleSortSelection('Latest')}
                className="flex items-center whitespace-nowrap py-1 cursor-pointer"
              >
                <input type="checkbox" className="mr-2" checked={sortBy === 'Latest'} readOnly />
                <span>Latest</span>
              </li>
              <li
                onClick={() => handleSortSelection('Most Popular')}
                className="flex items-center whitespace-nowrap py-1 cursor-pointer"
              >
                <input type="checkbox" className="mr-2" checked={sortBy === 'Most Popular'} readOnly />
                <span>Most Popular</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 h-auto mt-6 ml-4">
          {filteredForums.map((forum, index) =>
            forum ? (
              <div
                key={forum.forum_id || index}
                className="flex flex-col w-full h-full justify-center items-center group relative"
              >
                <div
                  className="w-80 h-56 justify-center items-center rounded-3xl overflow-hidden cursor-pointer"
                  style={{ backgroundColor: forum.wallpaper || "basegreen" }}
                  onClick={() => joinForum(forum.forum_name, forum.board)}
                >
                  {forum.icon && (
                    <img
                      src={`data:image/jpeg;base64,${forum.icon}`}
                      alt={`${forum.forum_name || 'Forum'} icon`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-bold mt-2 self-start ml-14 z-10 group-hover:text-white">
                  {forum.forum_name || 'Unnamed Forum'}
                </h3>
                <div className="overlay-content absolute w-340 h-72 opacity-0 rounded-3xl group-hover:opacity-100 bg-black bg-opacity-60 group-hover:pointer-events-none">
                  <p className="mx-10 my-10 text-white">{forum.description || 'No description available'}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="text-red-500">Invalid forum data</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default YourBoardView;
