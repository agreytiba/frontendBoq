import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/pre/';

// add new pre
const addPre = async (preData) => {
	const response = await axios.post(API_URL, preData);

	return response.data;
};

// Get all pres
const getAllPre = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single pre
const getPre = async (preId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + preId);

	return response.data;
};

// Delete single  appointment
const deletePre = async (preId) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + preId);

	return response.data;
};
// edit single pre 
const updatePre = async (id,newRate) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + id, newRate);

	return response.data;
};

const preService = {
	addPre,
	getAllPre,
	deletePre,
	updatePre,
	getPre
};

export default preService;
