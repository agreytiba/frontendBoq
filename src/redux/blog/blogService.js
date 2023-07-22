import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blog/';

// Create new blog post detail
const createBlogPost = async (data) => {
	const response = await axios.post(API_URL, data);

	return response.data;
};

// Get all  blog posts
const getBlogPosts = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single  blog post
const getBlogPost = async (postId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + postId);

	return response.data;
};

// Delete single   blog post
const deleteBlogPost = async (postId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + postId);

	return response.data;
};
// edit single  blog post
const updateBlogPost = async (postId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + postId);

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
