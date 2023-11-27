import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL =  API_BASE_URL + '/api/savedpres/';

// add new saved pre
const setSavedPre = async (mapId) => {
	const response = await axios.post(API_URL,mapId);

	return response.data;
};

// Get all  saved pre
const getAllSavedPre = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single saved pre
const getSavedPre = async (id) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + id);

	return response.data;
};

// Delete single  saved pre
const deleteSavedPre = async (id) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + id);

	return response.data;
};
// edit single pre 
const updateSavedPre = async (id,quantity,materialId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + id, quantity,materialId);

	return response.data;
};

const preService = {
	setSavedPre,
	getAllSavedPre,
	deleteSavedPre,
	updateSavedPre,
	getSavedPre
};

export default preService;
