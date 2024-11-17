import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import YourBoardView from "./YourBoardView";
import YourBoardEdit from "./YourBoardEdit";

const MainBody = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [forums, setForums] = useState([]);
  const [filteredForums, setFilteredForums] = useState([]);
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
        setForums(response.data?.created || []);
        setFilteredForums(response.data?.created || []);
      } catch (err) {
        setError(err.response ? err.response.data.detail : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [sid]);

  useEffect(() => {
    let sortedForums = [...forums];

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

    setFilteredForums(sortedForums);
  }, [searchForumTerm, forums, sortBy]);

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
        <YourBoardEdit
          isDropdownVisible={isDropdownVisible}
          userData={userData}
          loading={loading}
          error={error}
          sortBy={sortBy}
          forums={forums}
          filteredForums={filteredForums}
          searchForumTerm={searchForumTerm}
          toggleDropdown={toggleDropdown}
          handleSortSelection={handleSortSelection}
          navigate={navigate}
          onEditClick={handleEditToggle}
        />
      ) : (
        <YourBoardView
          isDropdownVisible={isDropdownVisible}
          userData={userData}
          loading={loading}
          error={error}
          sortBy={sortBy}
          forums={forums}
          filteredForums={filteredForums}
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
