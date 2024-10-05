import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Fetch all Forum in Board
export const fetchForums = async (board) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${board}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
    throw new Error('Failed to fetch forums.');
  }
};

export const fetchTopics = async (board, forum_name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${board}/${forum_name}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw new Error('Failed to fetch topics.');
  }
};

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

export const createForum = async (board, forumData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${board}/`, forumData);
    return response.data; // Return the created forum data
  } catch (error) {
    console.error('Error creating forum:', error); // Log the error
    throw error; // Handle error gracefully
  }
};

// // Fetch all users
// export const fetchUsers = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/users/`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

// // Create a new user
// export const createUser = async (user) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/users/`, user);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error;
//   }
// };

// // Fetch a specific user by ID
// export const fetchUserById = async (sid) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/users/${sid}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching user ${sid}:`, error);
//     throw error;
//   }
// };
