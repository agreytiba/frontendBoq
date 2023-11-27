import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/blog/';

// Create new blog post detail
const createBlogPost = async (data,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }
	const response = await axios.post(API_URL, data,config);

	return response.data;
};

// Get all  blog posts
const getBlogPosts = async (token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL,config);
	return response.data;
};
// Get single  blog post
const getBlogPost = async (postId,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.get(API_URL + postId,config);

	return response.data;
};

// Delete single   blog post
const deleteBlogPost = async (postId,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.delete(API_URL + postId,config);

	return response.data;
};
// edit single  blog post
const updateBlogPost = async (postId,token) => {
	  const config = {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  }

	const response = await axios.put(API_URL + postId,config);

	return response.data;
};

const blogService = {
	createBlogPost,
	getBlogPosts,
	deleteBlogPost,
	updateBlogPost,
	getBlogPost
};

export default blogService;
