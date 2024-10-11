import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Fetch all Forum in Board
export const fetchForums = async (board) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${board}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw new Error('Failed to fetch forums: ' + error.message);
  }
};

// Fetch all topic in Forum
export const fetchTopics = async (board, forum_name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${board}/${forum_name}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw new Error('Failed to fetch topics.');
  }
};

// Create new Topic
export const createTopic = async (board, forum_name, topicText) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/${board}/${forum_name}/`, {
          text: topicText,
      });
      return response.data; // This will be the new topic returned by the server
  } catch (error) {
      console.error("Error creating topic:", error);
      throw error; // Rethrow the error to handle it in your component
  }
};

// Create Forum
export const createForum = async (board, forumData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${board}/`, forumData);
    return response.data; // Return the created forum data
  } catch (error) {
    console.error('Error creating forum:', error); // Log the error
    throw error; // Handle error gracefully
  }
};

// Update Forum
export const updateForum = async (board, forum_name, forumData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${board}/${forum_name}/`, forumData);
    return response.data;
  } catch (error) {
    console.error("Error updating forum:", error.response?.data || error.message);
    throw error;
  }
};
