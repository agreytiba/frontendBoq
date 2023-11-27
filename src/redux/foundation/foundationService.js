import axios from 'axios';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const API_URL = API_BASE_URL + '/api/foudations/';

// Create new Foudation
const createFoudation = async (data) => {
	const response = await axios.post(API_URL, data);

	return response.data;
};

// Get all Foudations
const getFoudations = async () => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL);
	return response.data;
};
// Get single Foudation
const getFoudation = async (id) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.get(API_URL + id);

	return response.data;
};

// Delete single  Foudation
const deleteFoudation = async (id) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.delete(API_URL + id);

	return response.data;
};
// edit single  Foudation
const updateFoudation = async (id) => {
	//   const config = {
	//     headers: {
	//       Authorization: `Bearer ${token}`,
	//     },
	//   }

	const response = await axios.put(API_URL + id);

	return response.data;
};

const foundationService = {
	createFoudation,
	getFoudations,
	deleteFoudation,
	updateFoudation,
	getFoudation
};

export default foundationService;
