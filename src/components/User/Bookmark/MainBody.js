import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookmarkView from "./BookmarkView";
import BookmarkEdit from "./BookmarkEdit";

const MainBody = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [bookmarkedForums, setBookmarkedForums] = useState([]);
  const [filteredBookmarkedForums, setFilteredBookmarkedForums] = useState([]);
  const [searchForumTerm, setSearchForumTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { sid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user/${sid}`);
        setUserData(response.data);
        const bookmarks = response.data?.bookmarked || [];
        setBookmarkedForums(bookmarks);
        setFilteredBookmarkedForums(bookmarks);
      } catch (err) {
        setError(err.response ? err.response.data.detail : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [sid]);

  useEffect(() => {
    let sortedForums = [...bookmarkedForums];

    if (searchForumTerm) {
      sortedForums = sortedForums.filter(forum =>
        forum.forum_name?.toLowerCase().includes(searchForumTerm.toLowerCase())
      );
    }

    if (sortBy === 'Latest') {
      sortedForums.sort((a, b) => b.forum_id - a.forum_id);
    } else if (sortBy === 'Most Popular') {
      sortedForums.sort((a, b) => b.total_contributors - a.total_contributors);
    }

    setFilteredBookmarkedForums(sortedForums);
  }, [searchForumTerm, bookmarkedForums, sortBy]);

  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  const handleSortSelection = (option) => {
    setSortBy(option);
  };

  const handleEditToggle = () => {
    setIsEditing(prevState => !prevState);
  };

  return (
    <div>
      {isEditing ? (
        <BookmarkEdit
          isDropdownVisible={isDropdownVisible}
          userData={userData}
          loading={loading}
          error={error}
          sortBy={sortBy}
          forums={bookmarkedForums}
          filteredForums={filteredBookmarkedForums}
          searchForumTerm={searchForumTerm}
          toggleDropdown={toggleDropdown}
          handleSortSelection={handleSortSelection}
          navigate={navigate}
          onEditClick={handleEditToggle}
        />
      ) : (
        <BookmarkView
          isDropdownVisible={isDropdownVisible}
          userData={userData}
          loading={loading}
          error={error}
          sortBy={sortBy}
          forums={bookmarkedForums}
          filteredForums={filteredBookmarkedForums}
          searchForumTerm={searchForumTerm}
          toggleDropdown={toggleDropdown}
          handleSortSelection={handleSortSelection}
          navigate={navigate}
          onEditClick={handleEditToggle}
        />
      )}
    </div>
  );
};

export default MainBody;
