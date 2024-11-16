import React from "react";
import axios from "axios";

const YourBoardEdit = ({
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
  setForums,
  setFilteredForums,
  onEditClick, // Pass the function from MainBody
}) => {
  const slugify = (forumName) => {
    return forumName
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[[]/g, "-") // Replace [ with -
      .replace(/[\]]/g, "-") // Replace ] with -
      .replace(/=/g, "-") // Replace = with -
      .replace(/;/g, "-") // Replace ; with -
      .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters except -
      .replace(/--+/g, "-") // Replace multiple - with a single -
      .trim();
  };

  const joinForum = (forumName, board) => {
    const slugifiedForumName = slugify(forumName);
    navigate(`/coboard/${board}/${slugifiedForumName}`);
  };

  const handleDeleteForum = async (forumId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this forum?"
    );
    if (confirmDelete) {
      try {
        // Make an API call to delete the forum
        await axios.delete(`http://localhost:8000/forum/${forumId}`);

        // Remove the deleted forum from state
        setForums((prevForums) =>
          prevForums.filter((forum) => forum.forum_id !== forumId)
        );
        setFilteredForums((prevFilteredForums) =>
          prevFilteredForums.filter((forum) => forum.forum_id !== forumId)
        );

        alert("Forum deleted successfully.");
      } catch (error) {
        console.error("Failed to delete forum:", error);
        alert("An error occurred while deleting the forum.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mt-6 ml-4">
        <div className="flex flex-row items-center mt-12 ml-10 gap-6">
          <div className="text-black text-4xl font-bold whitespace-nowrap">
            Delete your board
          </div>
          <div className="bg-gray-400 h-[3px] w-[824px] flex-shrink-0" />
        </div>

        <div className="ml-[1030px] flex gap-5">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-14 rounded-xl hover:bg-gray-400"
            onClick={onEditClick}
          >
            Update
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 h-auto mt-6 ml-4">
          {filteredForums.map((forum, index) =>
            forum ? (
              <div
                key={forum.forum_id || index}
                className="flex flex-col w-full h-full justify-center items-center group relative"
              >
                <div
                  className="w-80 h-56 justify-center items-center rounded-3xl overflow-hidden cursor-pointer relative"
                  style={{ backgroundColor: forum.wallpaper || "basegreen" }}
                  onClick={() => handleDeleteForum(forum.forum_id)} // Call delete function on click
                >
                  {forum.icon && (
                    <img
                      src={`data:image/jpeg;base64,${forum.icon}`}
                      alt={`${forum.forum_name || "Forum"} icon`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-6xl font-bold">X</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-2 self-start ml-14 z-10">
                  {forum.forum_name || "Unnamed Forum"}
                </h3>
              </div>
            ) : (
              <div key={index} className="text-red-500">
                Invalid forum data
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default YourBoardEdit;
