import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Fetch all Forum in Board
export const fetchForums = async (board) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coboard/${board}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
    if (error.response) {
      console.error('Server responded with:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw new Error('Failed to fetch forums: ' + error.message);
  }
};

// Fetch all topic in Forum
export const fetchTopics = async (board, forum_name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coboard/${board}/${forum_name}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw new Error('Failed to fetch topics.');
  }
};

// Create new Topic
export const createTopic = async (board, forum_name, topicText) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/coboard/${board}/${forum_name}/topic`, {
          text: topicText,
      });
      return response.data;
  } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
  }
};

// Create Forum
export const createForum = async (board, forumData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/coboard/${board}/`, forumData);
    return response.data;
  } catch (error) {
    console.error('Error creating forum:', error);
    throw error;
  }
};

// Update Forum
export const updateForum = async (board, forum_name, forumData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/coboard/${board}/${forum_name}/setting`, forumData);
    return response.data;
  } catch (error) {
    console.error("Error updating forum:", error.response?.data || error.message);
    throw error;
  }
};

// Create new Post
export const createPost = async (board, forumName, topicId, postData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/coboard/${board}/${forumName}/post`,
      postData,
      {
        params: { topic_id: topicId }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Update heart
export const updateLike = async (board, forum_name, itemId, itemType) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/coboard/${board}/${forum_name}/like`, {
      item_id: itemId,
      item_type: itemType
    });
    return response.data;
  } catch (error) {
    console.error('Error updating like:', error);
    throw new Error('Failed to update like.');
  }
};

// Create new Comment
export const addComment = async (board, forum_name, postId, commentText, sid, aid) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/coboard/${board}/${forum_name}/comment`,
      {
        comment_text: commentText,
        scomment_creator: sid,
        acomment_creator: aid,
      },
      {
        params: { post_id: postId },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment.');
  }
};

// Fetch all user
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user.');
  }
};
